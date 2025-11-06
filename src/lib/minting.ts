/**
 * NFT Minting Utilities
 * 
 * Direct minting functionality for the NFT contract.
 * Allows users to mint NFTs starting from token ID 0 using their connected wallet.
 * 
 * Contract Address: 0x8867D52Aa849Ebc4aB487e542AE3F99FB29321a4
 * Network: ApeChain (33139)
 */

import { isMetaMaskInstalled } from './wallet';

// Minting contract address (deployed via Remix)
// CyberMinerNFT on ApeChain mainnet
export const MINT_CONTRACT_ADDRESS = '0x8867D52Aa849Ebc4aB487e542AE3F99FB29321a4';
console.log('[MINTING] Target Contract Address:', MINT_CONTRACT_ADDRESS);

/**
 * Function signatures for minting
 * 
 * Common mint function signatures:
 * - mint() with no params: 0x1249c58b ⭐ TRY THIS FIRST (simplest)
 * - mint(uint256 quantity): 0xa0712d68
 * - mint(address to, uint256 quantity): 0x40c10f19 (admin only?)
 * - publicMint(uint256 quantity): 0x2db11544
 * - safeMint(address to): 0x40d097c3
 */

/**
 * List of all mint functions to try (in order of most likely to work)
 */
const MINT_STRATEGIES = [
  {
    name: 'mint()',
    signature: '0x1249c58b',
    encode: () => '0x1249c58b',
    description: 'Simple parameterless mint - most common for public mints'
  },
  {
    name: 'publicMint()',
    signature: '0x26092b83',
    encode: () => '0x26092b83',
    description: 'Alternative parameterless public mint'
  },
  {
    name: 'mint(uint256)',
    signature: '0xa0712d68',
    encode: (quantity: number = 1) => {
      const quantityHex = BigInt(quantity).toString(16).padStart(64, '0');
      return '0xa0712d68' + quantityHex;
    },
    description: 'Mint with quantity parameter'
  },
  {
    name: 'publicMint(uint256)',
    signature: '0x2db11544',
    encode: (quantity: number = 1) => {
      const quantityHex = BigInt(quantity).toString(16).padStart(64, '0');
      return '0x2db11544' + quantityHex;
    },
    description: 'Public mint with quantity'
  },
  {
    name: 'mint(address,uint256)',
    signature: '0x40c10f19',
    encode: (quantity: number = 1, toAddress?: string) => {
      if (!toAddress) return null;
      const addressParam = toAddress.toLowerCase().replace('0x', '').padStart(64, '0');
      const quantityHex = BigInt(quantity).toString(16).padStart(64, '0');
      return '0x40c10f19' + addressParam + quantityHex;
    },
    description: 'Mint to address with quantity (may be admin-only)'
  }
];

/**
 * Get the mint price from the contract
 * Tries multiple common price function signatures
 */
export async function getMintPrice(): Promise<string> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  // Common price function signatures to try
  const priceFunctions = [
    { name: 'PRICE()', sig: '0x8b7afe2e' },      // PRICE() - uppercase
    { name: 'price()', sig: '0xa035b1fe' },      // price() - lowercase
    { name: 'mintPrice()', sig: '0x6817c76c' },  // mintPrice()
    { name: 'cost()', sig: '0x13faede6' },       // cost()
    { name: 'getPrice()', sig: '0x98d5fdca' },   // getPrice()
  ];

  console.log('[MINT] Attempting to fetch mint price from contract...');

  // Try each function signature
  for (const func of priceFunctions) {
    try {
      console.log(`[MINT] Trying ${func.name}...`);
      
      const result = await window.ethereum!.request({
        method: 'eth_call',
        params: [
          {
            to: MINT_CONTRACT_ADDRESS,
            data: func.sig,
          },
          'latest',
        ],
      }) as string;

      console.log(`[MINT] ${func.name} result:`, result);
      
      // Check if we got a valid non-zero response
      if (result && result !== '0x' && result !== '0x0') {
        const priceWei = BigInt(result);
        const priceApe = Number(priceWei) / 1e18;
        console.log(`[MINT] ✓ Found price using ${func.name}:`, priceApe, 'APE');
        return result;
      }
    } catch (error) {
      console.log(`[MINT] ${func.name} failed, trying next...`);
      // Continue to next function
    }
  }

  // If all failed, assume free mint
  console.warn('[MINT] Could not fetch price from contract, assuming FREE MINT');
  return '0x0';
}

/**
 * Get total supply (total minted so far)
 */
export async function getTotalSupply(): Promise<number> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  try {
    // Function signature for totalSupply()
    const totalSupplySignature = '0x18160ddd'; // totalSupply()
    
    const result = await window.ethereum!.request({
      method: 'eth_call',
      params: [
        {
          to: MINT_CONTRACT_ADDRESS,
          data: totalSupplySignature,
        },
        'latest',
      ],
    }) as string;

    // Handle empty or invalid response
    if (!result || result === '0x' || result === '0x0') {
      console.log('[MINT] Total supply is 0 or unavailable');
      return 0;
    }

    const supply = parseInt(result, 16);
    console.log('[MINT] Total supply:', supply);
    return isNaN(supply) ? 0 : supply;
  } catch (error) {
    console.warn('[MINT] Could not fetch total supply:', error);
    return 0;
  }
}

/**
 * Check how many NFTs a wallet owns from this contract
 */
export async function getWalletNFTBalance(walletAddress: string): Promise<number> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  try {
    // balanceOf(address) - 0x70a08231
    const balanceOfSignature = '0x70a08231';
    
    // Encode the address parameter (pad to 32 bytes)
    const addressParam = walletAddress.toLowerCase().replace('0x', '').padStart(64, '0');
    const data = balanceOfSignature + addressParam;
    
    console.log('[MINT] Checking NFT balance for:', walletAddress);
    console.log('[MINT] Call data:', data);
    
    const result = await window.ethereum!.request({
      method: 'eth_call',
      params: [
        {
          to: MINT_CONTRACT_ADDRESS,
          data: data,
        },
        'latest',
      ],
    }) as string;

    if (!result || result === '0x' || result === '0x0') {
      console.log('[MINT] Balance: 0 NFTs');
      return 0;
    }

    const balance = parseInt(result, 16);
    console.log('[MINT] ✓ Balance:', balance, 'NFTs');
    return isNaN(balance) ? 0 : balance;
  } catch (error) {
    console.error('[MINT] Could not fetch balance:', error);
    return 0;
  }
}

/**
 * Try minting with a specific strategy
 */
async function tryMintStrategy(
  strategy: typeof MINT_STRATEGIES[0],
  fromAddress: string,
  totalPrice: bigint,
  quantity: number
): Promise<string | null> {
  try {
    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] Trying strategy:', strategy.name);
    console.log('[MINT] Description:', strategy.description);
    
    // Encode the transaction data
    let txData: string | null;
    if (strategy.name.includes('address')) {
      txData = strategy.encode(quantity, fromAddress);
    } else {
      txData = strategy.encode(quantity);
    }
    
    if (!txData) {
      console.log('[MINT] ✗ Strategy requires parameters not available');
      return null;
    }
    
    console.log('[MINT] Transaction data:', txData);
    console.log('[MINT] Value:', '0x' + totalPrice.toString(16), '(' + (Number(totalPrice) / 1e18) + ' APE)');
    
    // First, try to estimate gas to see if the function call would work
    console.log('[MINT] Testing with gas estimation...');
    
    try {
      const gasEstimate = await window.ethereum!.request({
        method: 'eth_estimateGas',
        params: [{
          from: fromAddress,
          to: MINT_CONTRACT_ADDRESS,
          data: txData,
          value: '0x' + totalPrice.toString(16),
        }],
      }) as string;
      
      console.log('[MINT] ✓ Gas estimate successful:', parseInt(gasEstimate, 16));
      console.log('[MINT] ✓ This function signature works!');
      
      // If gas estimation succeeded, this is the right function
      return txData;
      
    } catch (estimateError) {
      console.log('[MINT] ✗ Gas estimation failed for this strategy');
      
      // Check if it's a specific error that tells us something
      if (estimateError && typeof estimateError === 'object' && 'message' in estimateError) {
        const errorMsg = (estimateError as { message: string }).message;
        console.log('[MINT] Error:', errorMsg);
        
        // If it's a revert, this function exists but has requirements not met
        if (errorMsg.includes('execution reverted')) {
          console.log('[MINT] ℹ️ Function exists but requirements not met');
        }
      }
      
      return null;
    }
  } catch (error) {
    console.log('[MINT] ✗ Strategy failed:', error);
    return null;
  }
}

/**
 * Mint NFT directly from the contract
 * Tries multiple mint function signatures
 * 
 * @param quantity - Number of NFTs to mint (default 1)
 * @param costPerToken - Cost per token in $DATA (default 10)
 * @returns Transaction hash
 */
export async function mintNFT(quantity: number = 1, costPerToken: number = 10): Promise<string> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  try {
    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] 🚀 STARTING INTELLIGENT MINT PROCESS');
    console.log('[MINT] Target Contract:', MINT_CONTRACT_ADDRESS);
    console.log('[MINT] Quantity:', quantity);
    console.log('[MINT] Cost in $DATA:', quantity * costPerToken);
    console.log('[MINT] ═══════════════════════════════════════');

    // Get user's address
    const accounts = await window.ethereum!.request({
      method: 'eth_requestAccounts',
    }) as string[];
    
    const fromAddress = accounts[0];
    console.log('[MINT] From address:', fromAddress);

    // Get mint price from contract (in wei)
    let totalPrice: bigint;
    
    try {
      const mintPriceWei = await getMintPrice();
      console.log('[MINT] ═══════════════════════════════════════');
      console.log('[MINT] PRICING INFORMATION:');
      console.log('[MINT] Mint price per token (wei):', mintPriceWei);
      
      // Safely convert to BigInt
      if (!mintPriceWei || mintPriceWei === '0x' || mintPriceWei === '0x0') {
        totalPrice = BigInt(0);
        console.log('[MINT] 🎉 FREE MINT DETECTED!');
        console.log('[MINT] Mint Price: FREE (0 APE)');
      } else {
        const mintPricePerToken = BigInt(mintPriceWei);
        totalPrice = mintPricePerToken * BigInt(quantity);
        console.log('[MINT] Mint Price per NFT:', (Number(mintPricePerToken) / 1e18).toFixed(6), 'APE');
        console.log('[MINT] Quantity:', quantity);
        console.log('[MINT] Total Mint Cost:', (Number(totalPrice) / 1e18).toFixed(6), 'APE');
      }
      console.log('[MINT] ═══════════════════════════════════════');
    } catch (error) {
      console.warn('[MINT] Could not fetch mint price, assuming free mint:', error);
      totalPrice = BigInt(0);
    }

    // ⭐ TRY EACH MINT STRATEGY UNTIL ONE WORKS
    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] 🔍 AUTO-DETECTING CORRECT MINT FUNCTION');
    console.log('[MINT] Will try', MINT_STRATEGIES.length, 'different strategies...');
    console.log('[MINT] ═══════════════════════════════════════');
    
    let successfulStrategy: typeof MINT_STRATEGIES[0] | null = null;
    let txData: string | null = null;
    
    for (const strategy of MINT_STRATEGIES) {
      const result = await tryMintStrategy(strategy, fromAddress, totalPrice, quantity);
      if (result) {
        successfulStrategy = strategy;
        txData = result;
        break;
      }
    }
    
    if (!successfulStrategy || !txData) {
      console.error('[MINT] ═══════════════════════════════════════');
      console.error('[MINT] ❌ ALL MINT STRATEGIES FAILED');
      console.error('[MINT] Possible reasons:');
      console.error('[MINT]   1. Minting is not active on this contract');
      console.error('[MINT]   2. You need to be whitelisted');
      console.error('[MINT]   3. Insufficient funds (you need at least mint price + gas)');
      console.error('[MINT]   4. Contract has reached max supply');
      console.error('[MINT]   5. Per-wallet mint limit reached');
      console.error('[MINT] ═══════════════════════════════════════');
      console.error('[MINT] Please check your contract on Remix and verify:');
      console.error('[MINT]   - Which function should be called for public minting?');
      console.error('[MINT]   - Is minting currently enabled?');
      console.error('[MINT]   - Are there any access restrictions?');
      console.error('[MINT] ═══════════════════════════════════════');
      
      throw new Error('Unable to find working mint function. Please check contract settings.');
    }

    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] ✓ FOUND WORKING MINT FUNCTION!');
    console.log('[MINT] Function:', successfulStrategy.name);
    console.log('[MINT] Description:', successfulStrategy.description);
    console.log('[MINT] ═══════════════════════════════════════');

    // Estimate gas one more time for accurate pricing
    const gasEstimate = await window.ethereum!.request({
      method: 'eth_estimateGas',
      params: [{
        from: fromAddress,
        to: MINT_CONTRACT_ADDRESS,
        data: txData,
        value: '0x' + totalPrice.toString(16),
      }],
    }) as string;

    // Get current gas price
    const gasPriceHex = await window.ethereum!.request({
      method: 'eth_gasPrice',
    }) as string;
    
    console.log('[MINT] Gas estimate:', parseInt(gasEstimate, 16));
    console.log('[MINT] Gas price:', gasPriceHex);

    // Build transaction
    const txParams = {
      from: fromAddress,
      to: MINT_CONTRACT_ADDRESS,
      data: txData,
      value: '0x' + totalPrice.toString(16),
      gas: gasEstimate,
      gasPrice: gasPriceHex,
    };

    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] TRANSACTION SUMMARY:');
    console.log('[MINT] Function:', successfulStrategy.name);
    console.log('[MINT] Mint Price:', (Number(totalPrice) / 1e18).toFixed(6), 'APE');
    const gasPrice = BigInt(gasPriceHex);
    const gasLimit = BigInt(gasEstimate);
    const gasCost = gasPrice * gasLimit;
    console.log('[MINT] Est. Gas Cost:', (Number(gasCost) / 1e18).toFixed(6), 'APE');
    const totalCost = totalPrice + gasCost;
    console.log('[MINT] TOTAL COST:', (Number(totalCost) / 1e18).toFixed(6), 'APE');
    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] 🔐 Requesting MetaMask confirmation...');

    // Send transaction
    const txHash = await window.ethereum!.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    }) as string;

    console.log('[MINT] ✓ Transaction sent:', txHash);
    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] TRANSACTION SUBMITTED:');
    console.log('[MINT] TX Hash:', txHash);
    console.log('[MINT] View on Explorer:');
    console.log('[MINT] https://apechain.calderaexplorer.xyz/tx/' + txHash);
    console.log('[MINT] ═══════════════════════════════════════');
    
    return txHash;
  } catch (error) {
    console.error('[MINT] ═══════════════════════════════════════');
    console.error('[MINT] MINT FAILED - ERROR DETAILS:');
    console.error('[MINT] Error:', error);
    console.error('[MINT] ═══════════════════════════════════════');
    
    if (error instanceof Error) {
      if (error.message.includes('User rejected') || error.message.includes('User denied')) {
        throw new Error('Transaction cancelled by user');
      }
      
      throw new Error(`Minting failed: ${error.message}`);
    }
    
    throw new Error('Failed to mint NFT');
  }
}

/**
 * Wait for transaction confirmation and return success status
 */
export async function waitForMintTransaction(txHash: string, maxWaitTime: number = 60000): Promise<boolean> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask not installed');
  }

  console.log('[MINT] ═══════════════════════════════════════');
  console.log('[MINT] WAITING FOR CONFIRMATION...');
  console.log('[MINT] Transaction:', txHash);
  console.log('[MINT] Max wait time:', maxWaitTime / 1000, 'seconds');
  console.log('[MINT] ═══════════════════════════════════════');
  
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTime) {
    try {
      const receipt = await window.ethereum!.request({
        method: 'eth_getTransactionReceipt',
        params: [txHash],
      }) as {
        status: string;
        blockNumber: string;
        gasUsed: string;
        logs: Array<{ topics: string[]; data: string }>;
      } | null;

      if (receipt) {
        console.log('[MINT] ═══════════════════════════════════════');
        console.log('[MINT] TRANSACTION RECEIPT:');
        console.log('[MINT] Status:', receipt.status === '0x1' ? '✓ SUCCESS' : '✗ FAILED');
        console.log('[MINT] Block:', parseInt(receipt.blockNumber, 16));
        console.log('[MINT] Gas used:', parseInt(receipt.gasUsed, 16));
        console.log('[MINT] Logs count:', receipt.logs ? receipt.logs.length : 0);
        
        // Check logs for Transfer event (indicates NFT was minted)
        if (receipt.logs && receipt.logs.length > 0) {
          console.log('[MINT] ═══════════════════════════════════════');
          console.log('[MINT] TRANSACTION LOGS:');
          receipt.logs.forEach((log, index) => {
            console.log(`[MINT] Log ${index}:`, {
              topics: log.topics,
              data: log.data
            });
            
            // ERC721 Transfer event signature
            const TRANSFER_EVENT = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
            
            if (log.topics[0] === TRANSFER_EVENT) {
              console.log('[MINT] ✓ Transfer event detected!');
              
              // Topics: [event signature, from, to, tokenId]
              if (log.topics.length >= 4) {
                const tokenId = parseInt(log.topics[3], 16);
                console.log('[MINT] ✓ NFT Token ID:', tokenId);
              }
            }
          });
          console.log('[MINT] ═══════════════════════════════════════');
        }
        
        const success = receipt.status === '0x1';
        
        if (!success) {
          console.error('[MINT] ❌ TRANSACTION FAILED - Contract reverted');
        }
        
        console.log('[MINT] ═══════════════════════════════════════');
        return success;
      }
    } catch (e) {
      // Receipt not available yet
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.error('[MINT] ❌ Transaction confirmation timeout');
  throw new Error('Transaction confirmation timeout');
}

/**
 * Complete minting flow with user feedback
 * Returns the new token ID(s) minted
 */
export async function executeMint(
  quantity: number = 1,
  costPerToken: number = 10,
  onProgress?: (message: string) => void
): Promise<number[]> {
  try {
    onProgress?.('🔍 Auto-detecting mint function...');
    
    // Get user's address
    const accounts = await window.ethereum!.request({
      method: 'eth_requestAccounts',
    }) as string[];
    const userAddress = accounts[0];
    
    // Check balance BEFORE minting
    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] PRE-MINT CHECK:');
    const balanceBefore = await getWalletNFTBalance(userAddress);
    console.log('[MINT] Your NFT balance BEFORE mint:', balanceBefore);
    console.log('[MINT] ═══════════════════════════════════════');
    
    // Get current total supply to know which token IDs will be minted
    const currentSupply = await getTotalSupply();
    console.log('[MINT] Current supply before mint:', currentSupply);
    
    onProgress?.('📝 Preparing transaction...');
    const txHash = await mintNFT(quantity, costPerToken);
    
    onProgress?.('⏳ Waiting for confirmation...');
    const success = await waitForMintTransaction(txHash);
    
    if (!success) {
      throw new Error('Mint transaction failed - check explorer for details');
    }
    
    // Check balance AFTER minting
    console.log('[MINT] ═══════════════════════════════════════');
    console.log('[MINT] POST-MINT CHECK:');
    
    // Wait a bit for blockchain state to update
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const balanceAfter = await getWalletNFTBalance(userAddress);
    console.log('[MINT] Your NFT balance AFTER mint:', balanceAfter);
    console.log('[MINT] Balance change:', balanceAfter - balanceBefore);
    
    if (balanceAfter === balanceBefore) {
      console.error('[MINT] ⚠️ WARNING: Your NFT balance did not increase!');
      throw new Error('NFT was not received - check transaction on explorer');
    }
    
    console.log('[MINT] ✓ NFT balance increased by', balanceAfter - balanceBefore);
    console.log('[MINT] ═══════════════════════════════════════');
    
    // Calculate minted token IDs (assuming sequential minting from 0)
    const mintedTokenIds: number[] = [];
    for (let i = 0; i < quantity; i++) {
      mintedTokenIds.push(currentSupply + i);
    }
    
    onProgress?.(`✓ Successfully minted token(s): ${mintedTokenIds.join(', ')}`);
    console.log('[MINT] ✓ Minted token IDs:', mintedTokenIds);
    
    return mintedTokenIds;
  } catch (error) {
    console.error('[MINT] Execute mint failed:', error);
    throw error;
  }
}
