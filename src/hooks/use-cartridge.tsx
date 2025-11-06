/**
 * useCartridge Hook
 * 
 * Custom React hook for managing NFT cartridge selection and loading.
 * Handles fetching user's NFTs from the ApeChain contract.
 */

import { useState, useEffect, useCallback } from 'react';
import { getUserNFTs, hasCartridgeNFT, type NFTCartridge } from '@/lib/nft';
import { toast } from 'sonner';

interface UseCartridgeOptions {
  address: string;
  isConnected: boolean;
}

export function useCartridge({ address, isConnected }: UseCartridgeOptions) {
  const [cartridges, setCartridges] = useState<NFTCartridge[]>([]);
  const [loadedCartridge, setLoadedCartridge] = useState<NFTCartridge | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNFTs, setHasNFTs] = useState(false);

  /**
   * Fetch user's NFT cartridges from the contract
   */
  const fetchCartridges = useCallback(async () => {
    if (!isConnected || !address) {
      setCartridges([]);
      setHasNFTs(false);
      return;
    }

    setIsLoading(true);
    
    // Show scanning message for large collections
    const scanToast = toast.loading('🔍 Scanning collection... This may take a moment for large collections');

    try {
      // Check if user has any NFTs first
      const ownsNFT = await hasCartridgeNFT(address);
      setHasNFTs(ownsNFT);

      if (!ownsNFT) {
        setCartridges([]);
        toast.dismiss(scanToast);
        toast.info('No ICE breakers found in your wallet');
        return;
      }

      // Fetch all NFTs (limited to 5 max for display)
      const nfts = await getUserNFTs(address);
      
      // Enforce 5 ICE breaker limit per wallet for gameplay
      const limitedNfts = nfts.slice(0, 5);
      setCartridges(limitedNfts);

      toast.dismiss(scanToast);
      
      if (limitedNfts.length > 0) {
        toast.success(`✅ Found ${limitedNfts.length} ICE breaker${limitedNfts.length > 1 ? 's' : ''}!`);
        
        if (nfts.length > 5) {
          toast.info(`You own ${nfts.length} tokens! Showing first 5 for gameplay`);
        }
      }
    } catch (error) {
      console.error('Error fetching ICE breakers:', error);
      toast.dismiss(scanToast);
      toast.error('Failed to load ICE breakers');
      setCartridges([]);
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected]);

  /**
   * Load a cartridge into the MineBoy
   */
  const loadCartridge = useCallback((cartridge: NFTCartridge) => {
    setLoadedCartridge(cartridge);
    toast.success(`ICE breaker loaded: ${cartridge.name}`);
  }, []);

  /**
   * Eject the currently loaded ICE breaker
   */
  const ejectCartridge = useCallback(() => {
    if (loadedCartridge) {
      toast.info(`ICE breaker ejected: ${loadedCartridge.name}`);
      setLoadedCartridge(null);
    }
  }, [loadedCartridge]);

  /**
   * Check if a cartridge is loaded
   */
  const isCartridgeLoaded = loadedCartridge !== null;

  /**
   * Fetch cartridges when wallet connects
   */
  useEffect(() => {
    if (isConnected && address) {
      fetchCartridges();
    } else {
      setCartridges([]);
      setLoadedCartridge(null);
      setHasNFTs(false);
    }
  }, [isConnected, address, fetchCartridges]);

  return {
    cartridges,
    loadedCartridge,
    isLoading,
    hasNFTs,
    isCartridgeLoaded,
    loadCartridge,
    ejectCartridge,
    fetchCartridges,
  };
}
