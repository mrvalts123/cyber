/**
 * Web3 Wallet Utilities
 * 
 * This module provides utility functions for interacting with MetaMask wallet
 * and managing Web3 connections to the ApeChain network.
 */

// ApeChain Network Configuration
export const APECHAIN_CONFIG = {
  chainId: '0x8173', // 33139 in hex
  chainName: 'ApeChain',
  nativeCurrency: {
    name: 'ApeCoin',
    symbol: 'APE',
    decimals: 18,
  },
  rpcUrls: ['https://apechain.calderachain.xyz/http'],
  blockExplorerUrls: ['https://apechain.calderaexplorer.xyz'],
};

/**
 * Check if MetaMask is installed in the browser
 */
export function isMetaMaskInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(window.ethereum?.isMetaMask);
}

/**
 * Connect to MetaMask wallet
 * Returns the connected wallet address
 */
export async function connectWallet(): Promise<string> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    }) as string[];
    
    if (accounts && Array.isArray(accounts) && accounts.length > 0) {
      return accounts[0];
    }
    
    throw new Error('No accounts found');
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
}

/**
 * Switch to ApeChain network
 * Adds the network if it doesn't exist
 */
export async function switchToApeChain(): Promise<void> {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed');
  }

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: APECHAIN_CONFIG.chainId }],
    });
  } catch (switchError: unknown) {
    // This error code indicates that the chain has not been added to MetaMask
    if ((switchError as { code?: number }).code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [APECHAIN_CONFIG],
        });
      } catch (addError) {
        console.error('Error adding ApeChain network:', addError);
        throw addError;
      }
    } else {
      console.error('Error switching to ApeChain:', switchError);
      throw switchError;
    }
  }
}

/**
 * Get current chain ID
 */
export async function getChainId(): Promise<string> {
  if (!isMetaMaskInstalled()) return '';
  
  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return chainId as string;
  } catch (error) {
    console.error('Error getting chain ID:', error);
    return '';
  }
}

/**
 * Format wallet address for display (0x1234...5678)
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Listen to account changes
 */
export function onAccountsChanged(callback: (accounts: string[]) => void): void {
  if (!isMetaMaskInstalled()) return;
  
  window.ethereum.on('accountsChanged', (...args: unknown[]) => {
    callback(args[0] as string[]);
  });
}

/**
 * Listen to chain changes
 */
export function onChainChanged(callback: (chainId: string) => void): void {
  if (!isMetaMaskInstalled()) return;
  
  window.ethereum.on('chainChanged', (...args: unknown[]) => {
    callback(args[0] as string);
  });
}

/**
 * Remove event listeners
 */
export function removeListeners(): void {
  if (!isMetaMaskInstalled()) return;
  
  window.ethereum.removeAllListeners('accountsChanged');
  window.ethereum.removeAllListeners('chainChanged');
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeAllListeners: (event: string) => void;
    };
  }
}
