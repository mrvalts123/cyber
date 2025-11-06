/**
 * useWallet Hook
 * 
 * Custom React hook for managing Web3 wallet connections.
 * Handles MetaMask connection, ApeChain network switching, and account management.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  connectWallet,
  switchToApeChain,
  getChainId,
  isMetaMaskInstalled,
  onAccountsChanged,
  onChainChanged,
  removeListeners,
  APECHAIN_CONFIG,
} from '@/lib/wallet';
import { toast } from 'sonner';

export function useWallet() {
  const [address, setAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  /**
   * Check if connected to ApeChain
   */
  const checkNetwork = useCallback(async () => {
    const chainId = await getChainId();
    const correct = chainId === APECHAIN_CONFIG.chainId;
    setIsCorrectNetwork(correct);
    return correct;
  }, []);

  /**
   * Connect wallet and switch to ApeChain
   */
  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      toast.error('Please install MetaMask to continue');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    
    try {
      // Connect wallet
      const walletAddress = await connectWallet();
      setAddress(walletAddress);
      setIsConnected(true);
      toast.success('Wallet connected!');

      // Switch to ApeChain
      await switchToApeChain();
      await checkNetwork();
      toast.success('Switched to ApeChain network');
    } catch (error) {
      console.error('Connection error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to connect wallet');
      }
    } finally {
      setIsConnecting(false);
    }
  }, [checkNetwork]);

  /**
   * Disconnect wallet
   */
  const disconnect = useCallback(() => {
    setAddress('');
    setIsConnected(false);
    setIsCorrectNetwork(false);
    toast.info('Wallet disconnected');
  }, []);

  /**
   * Handle account changes
   */
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else if (accounts[0] !== address) {
        setAddress(accounts[0]);
        toast.info('Account changed');
      }
    };

    const handleChainChanged = () => {
      // Reload page on chain change for simplicity
      window.location.reload();
    };

    onAccountsChanged(handleAccountsChanged);
    onChainChanged(handleChainChanged);

    return () => {
      removeListeners();
    };
  }, [address, disconnect]);

  /**
   * Check if already connected on mount
   */
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled() && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_accounts' 
          }) as string[];
          
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            await checkNetwork();
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();
  }, [checkNetwork]);

  return {
    address,
    isConnected,
    isCorrectNetwork,
    isConnecting,
    connect,
    disconnect,
    switchNetwork: switchToApeChain,
  };
}
