/**
 * NFT Utilities
 * 
 * Utilities for interacting with the ApeChain NFT contract.
 * Fetches user's NFTs and provides cartridge selection functionality.
 * 
 * Implementation Strategy:
 * Uses ApeChain Explorer API to directly fetch tokens owned by a specific address.
 * This bypasses the need for eth_call balanceOf which is returning empty results.
 */

import { isMetaMaskInstalled } from './wallet';

// ApeChain NFT Contract Address
// TODO: Set this to your new NFT contract address when ready
export const NFT_CONTRACT_ADDRESS = ''; // Empty until new NFT contract is deployed

export interface NFTCartridge {
  tokenId: string;
  name: string;
  image?: string;
  description?: string;
}

/**
 * Keccak256 hash of function signatures for manual encoding
 */
const FUNCTION_SIGNATURES = {
  tokenURI: '0xc87b56dd',            // tokenURI(uint256)
};

/**
 * Encode function call for eth_call
 */
function encodeFunctionCall(functionName: keyof typeof FUNCTION_SIGNATURES, params: string[]): string {
  const signature = FUNCTION_SIGNATURES[functionName];
  
  // For tokenURI(uint256)
  if (functionName === 'tokenURI' && params.length === 1) {
    const tokenId = BigInt(params[0]).toString(16).padStart(64, '0');
    return signature + tokenId;
  }

  throw new Error(`Invalid parameters for ${functionName}`);
}

/**
 * Make an eth_call to the contract
 */
async function ethCall(data: string): Promise<string> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  try {
    const result = await window.ethereum!.request({
      method: 'eth_call',
      params: [
        {
          to: NFT_CONTRACT_ADDRESS,
          data,
        },
        'latest',
      ],
    }) as string;

    return result;
  } catch (error) {
    console.error('[NFT] eth_call error:', error);
    throw error;
  }
}

/**
 * Get token URI metadata
 */
export async function getTokenURI(tokenId: string): Promise<string> {
  try {
    const data = encodeFunctionCall('tokenURI', [tokenId]);
    const result = await ethCall(data);
    
    // Decode the hex string - it's ABI-encoded string
    // First 32 bytes are offset, next 32 bytes are length, then the actual string
    const hex = result.replace('0x', '');
    
    if (hex.length < 128) {
      console.warn(`[NFT] Token ${tokenId} returned short response, might not exist`);
      return '';
    }

    // Get the length of the string (bytes 64-128)
    const lengthHex = hex.slice(64, 128);
    const length = parseInt(lengthHex, 16) * 2; // multiply by 2 for hex chars
    
    // Get the actual string data (starts at byte 128)
    const dataHex = hex.slice(128, 128 + length);
    
    // Convert hex to string
    let uri = '';
    for (let i = 0; i < dataHex.length; i += 2) {
      const byte = parseInt(dataHex.substr(i, 2), 16);
      if (byte !== 0) uri += String.fromCharCode(byte);
    }
    
    return uri.trim();
  } catch (error) {
    console.warn(`[NFT] Token ${tokenId} URI fetch failed:`, error);
    return '';
  }
}

/**
 * Fetch metadata from IPFS or HTTP URL
 */
async function fetchMetadata(uri: string): Promise<{ name?: string; image?: string; description?: string }> {
  try {
    // Handle data URIs (base64 encoded JSON)
    if (uri.startsWith('data:application/json;base64,')) {
      const base64Data = uri.replace('data:application/json;base64,', '');
      const jsonString = atob(base64Data);
      const metadata = JSON.parse(jsonString);
      return metadata;
    }

    // Convert IPFS URI to HTTP gateway
    let url = uri;
    if (uri.startsWith('ipfs://')) {
      url = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }

    const response = await fetch(url, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    if (!response.ok) {
      console.warn(`[NFT] Metadata fetch failed: ${response.status}`);
      return {};
    }
    
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.warn('[NFT] Metadata parsing failed:', error);
    return {};
  }
}

/**
 * Fetch user's tokens directly from ApeChain explorer API
 * Uses the address-specific token inventory endpoint
 */
async function getUserTokensFromExplorer(address: string): Promise<string[]> {
  try {
    console.log('[NFT] Fetching NFTs directly from explorer for address:', address);
    
    const tokenIds: string[] = [];
    let nextPageParams: string | null = null;
    let pageCount = 0;
    const maxPages = 10; // Limit pages for safety
    
    do {
      pageCount++;
      
      // Use the address-specific token endpoint
      let explorerUrl = `https://apechain.calderaexplorer.xyz/api/v2/addresses/${address}/tokens`;
      
      if (nextPageParams) {
        explorerUrl += `?${nextPageParams}`;
      }
      
      console.log(`[NFT] Fetching page ${pageCount}...`);
      
      const response = await fetch(explorerUrl, {
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(15000)
      });
      
      if (!response.ok) {
        console.warn(`[NFT] Explorer API returned status: ${response.status}`);
        break;
      }
      
      const data = await response.json();
      
      // Find our contract in the token list
      if (data.items && Array.isArray(data.items)) {
        for (const item of data.items) {
          // Check if this is our NFT contract
          if (item.token && item.token.address && 
              item.token.address.toLowerCase() === NFT_CONTRACT_ADDRESS.toLowerCase()) {
            
            // This item represents NFTs from our contract
            console.log('[NFT] Found our contract in token list:', item);
            
            // The value field might contain the count
            if (item.value) {
              console.log(`[NFT] User owns ${item.value} NFTs from this contract`);
            }
            
            // Now we need to fetch the specific token IDs
            // Try to get token instance IDs via a separate call
            if (item.token.type === 'ERC-721') {
              console.log('[NFT] Detected ERC-721 token, fetching token instances...');
              const instanceIds = await getTokenInstancesForHolder(address);
              return instanceIds;
            }
          }
        }
      }
      
      // Check for next page
      nextPageParams = data.next_page_params;
      
      // Small delay to avoid rate limiting
      if (nextPageParams) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
    } while (nextPageParams && pageCount < maxPages);
    
    console.log(`[NFT] Found ${tokenIds.length} token IDs via explorer`);
    return tokenIds;
  } catch (error) {
    console.error('[NFT] Explorer token fetch failed:', error);
    return [];
  }
}

/**
 * Get specific NFT token instances for a holder
 * Uses the NFT instances endpoint filtered by holder
 */
async function getTokenInstancesForHolder(address: string): Promise<string[]> {
  try {
    console.log('[NFT] Fetching token instances for holder...');
    
    const tokenIds: string[] = [];
    let nextPageParams: string | null = null;
    let pageCount = 0;
    const maxPages = 20; // Support multiple pages
    
    do {
      pageCount++;
      
      // Use holder_address_hash query parameter
      let explorerUrl = `https://apechain.calderaexplorer.xyz/api/v2/tokens/${NFT_CONTRACT_ADDRESS}/instances`;
      
      // Add holder filter
      const params = new URLSearchParams();
      params.append('holder_address_hash', address);
      
      if (nextPageParams) {
        // Merge with existing params
        const nextParams = new URLSearchParams(nextPageParams);
        nextParams.forEach((value, key) => params.append(key, value));
      }
      
      explorerUrl += `?${params.toString()}`;
      
      console.log(`[NFT] Fetching instances page ${pageCount}...`);
      
      const response = await fetch(explorerUrl, {
        headers: {
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(15000)
      });
      
      if (!response.ok) {
        console.warn(`[NFT] Explorer instances API returned status: ${response.status}`);
        const text = await response.text();
        console.warn('[NFT] Response:', text);
        break;
      }
      
      const data = await response.json();
      
      // Extract token IDs
      if (data.items && Array.isArray(data.items)) {
        for (const item of data.items) {
          if (item.id) {
            tokenIds.push(item.id);
          }
        }
        console.log(`[NFT] Page ${pageCount}: found ${data.items.length} tokens (total: ${tokenIds.length})`);
      }
      
      // Check for next page
      nextPageParams = data.next_page_params;
      
      // Small delay
      if (nextPageParams) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
    } while (nextPageParams && pageCount < maxPages);
    
    console.log(`[NFT] ✓ Found ${tokenIds.length} token instances for holder`);
    return tokenIds;
  } catch (error) {
    console.error('[NFT] Token instances fetch failed:', error);
    return [];
  }
}

/**
 * Get all NFTs owned by an address
 * Uses ApeChain explorer API exclusively
 */
export async function getUserNFTs(address: string): Promise<NFTCartridge[]> {
  try {
    console.log('[NFT] ========================================');
    console.log('[NFT] Starting NFT fetch for:', address);
    console.log('[NFT] Contract:', NFT_CONTRACT_ADDRESS);
    console.log('[NFT] ========================================');
    
    // Fetch user's token IDs directly from explorer
    const tokenIds = await getUserTokensFromExplorer(address);
    
    if (tokenIds.length === 0) {
      console.error('[NFT] ⚠️  No tokens found for this address');
      console.error('[NFT] Either you don\'t own any NFTs or the API is not working');
      return [];
    }

    console.log(`[NFT] ✓ Found ${tokenIds.length} tokens owned by this address`);

    // Fetch metadata for found tokens
    console.log(`[NFT] Fetching metadata for ${tokenIds.length} tokens...`);
    const cartridges: NFTCartridge[] = [];
    
    // Limit to 5 ICE breakers max per wallet
    const limitedTokenIds = tokenIds.slice(0, 5);
    
    for (let i = 0; i < limitedTokenIds.length; i++) {
      const tokenId = limitedTokenIds[i];
      console.log(`[NFT] Loading token ${i + 1}/${limitedTokenIds.length}: #${tokenId}`);
      
      try {
        const uri = await getTokenURI(tokenId);
        console.log(`[NFT]   Token URI: ${uri}`);
        
        const metadata = uri ? await fetchMetadata(uri) : {};
        console.log(`[NFT]   Metadata:`, metadata);
        
        // Convert IPFS image URL to HTTP gateway
        let image = metadata.image;
        if (image) {
          if (image.startsWith('ipfs://')) {
            image = image.replace('ipfs://', 'https://ipfs.io/ipfs/');
          }
          console.log(`[NFT]   Image URL: ${image}`);
        } else {
          console.warn(`[NFT]   No image found in metadata`);
        }

        cartridges.push({
          tokenId,
          name: metadata.name || `Pick #${tokenId}`,
          image,
          description: metadata.description,
        });
        
        console.log(`[NFT]   ✓ Loaded: ${metadata.name || `Pick #${tokenId}`}${image ? ' (with image)' : ' (no image)'}`);
      } catch (error) {
        console.warn(`[NFT]   ✗ Failed to load metadata for token ${tokenId}:`, error);
        cartridges.push({
          tokenId,
          name: `Pick #${tokenId}`,
        });
      }
      
      // Add delay every 3 tokens to avoid rate limiting
      if (i % 3 === 2) {
        await new Promise(resolve => setTimeout(resolve, 150));
      }
    }

    console.log('[NFT] ========================================');
    console.log(`[NFT] ✓ Successfully loaded ${cartridges.length} cartridges`);
    console.log('[NFT] ========================================');
    return cartridges;
  } catch (error) {
    console.error('[NFT] ========================================');
    console.error('[NFT] Critical error getting user NFTs:', error);
    console.error('[NFT] ========================================');
    return [];
  }
}

/**
 * Check if user owns any cartridge NFTs
 * Simplified check that uses explorer
 */
export async function hasCartridgeNFT(address: string): Promise<boolean> {
  try {
    const tokens = await getUserTokensFromExplorer(address);
    return tokens.length > 0;
  } catch (error) {
    console.error('[NFT] Error checking cartridge ownership:', error);
    return false;
  }
}

/**
 * Legacy balance function - kept for compatibility but deprecated
 */
export async function getNFTBalance(address: string): Promise<number> {
  console.warn('[NFT] getNFTBalance is deprecated - eth_call balanceOf is not working');
  console.warn('[NFT] Use getUserNFTs() or hasCartridgeNFT() instead');
  return 0;
}
