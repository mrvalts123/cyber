/**
 * useMining Hook
 * 
 * Custom React hook for managing mining simulation.
 * Handles mining state, hash rate calculation, reward accumulation, and claiming.
 * Mining has a random duration (5-60 seconds), then prompts user to send 0.01 APE to claim.
 * 
 * Stats (minecart and season points) are persisted to localStorage per wallet address.
 * Pending rewards also persist across page refreshes to prevent loss during network switches.
 * 
 * Real APE transaction is performed to: 0xfdc5be2e08f7c69120e85ec8da22c05791d8561e
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { type NFTCartridge } from '@/lib/nft';
import { getChainId, switchToApeChain, APECHAIN_CONFIG } from '@/lib/wallet';
import { calculateRarity, calculateReward, type RarityTier } from '@/lib/rarity';
import { executeMint } from '@/lib/minting';

interface MiningStats {
  minecart: number;
  multiplier: number;
  seasonPoints: number;
  hashRate: number;
}

interface MiningLog {
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface UseMiningOptions {
  isConnected: boolean;
  address: string;
  loadedCartridge: NFTCartridge | null;
}

// Recipient address for claim transactions
const CLAIM_RECIPIENT_ADDRESS = '0xfdc5be2e08f7c69120e85ec8da22c05791d8561e';
const CLAIM_FEE_WEI = '0x2386F26FC10000'; // 0.01 APE in hex (10000000000000000 wei)

// LocalStorage key prefixes
const STORAGE_KEY_PREFIX = 'mineboy_stats_';
const PENDING_REWARD_KEY_PREFIX = 'mineboy_pending_';

/**
 * Save stats to localStorage for specific wallet address
 */
function saveStatsToStorage(address: string, stats: { minecart: number; seasonPoints: number; multiplier: number }) {
  if (!address) return;
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify({
      minecart: stats.minecart,
      seasonPoints: stats.seasonPoints,
      multiplier: stats.multiplier,
      lastUpdated: Date.now(),
    }));
    console.log('[STORAGE] Stats saved for', address.slice(0, 6), '...', stats);
  } catch (error) {
    console.error('[STORAGE] Failed to save stats:', error);
  }
}

/**
 * Load stats from localStorage for specific wallet address
 */
function loadStatsFromStorage(address: string): { minecart: number; seasonPoints: number; multiplier: number } | null {
  if (!address) return null;
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      console.log('[STORAGE] No saved stats found for', address.slice(0, 6));
      return null;
    }
    
    const data = JSON.parse(stored);
    console.log('[STORAGE] Stats loaded for', address.slice(0, 6), '...', data);
    
    return {
      minecart: data.minecart || 0,
      seasonPoints: data.seasonPoints || 0,
      multiplier: data.multiplier || 1.0,
    };
  } catch (error) {
    console.error('[STORAGE] Failed to load stats:', error);
    return null;
  }
}

/**
 * Save pending reward to localStorage (survives page refresh during claim process)
 */
function savePendingReward(address: string, reward: number) {
  if (!address) return;
  
  try {
    const key = `${PENDING_REWARD_KEY_PREFIX}${address.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify({
      amount: reward,
      timestamp: Date.now(),
    }));
    console.log('[STORAGE] Pending reward saved:', reward);
  } catch (error) {
    console.error('[STORAGE] Failed to save pending reward:', error);
  }
}

/**
 * Load pending reward from localStorage
 */
function loadPendingReward(address: string): number | null {
  if (!address) return null;
  
  try {
    const key = `${PENDING_REWARD_KEY_PREFIX}${address.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) return null;
    
    const data = JSON.parse(stored);
    
    // Only restore pending reward if it's less than 5 minutes old (prevent stale rewards)
    const fiveMinutes = 5 * 60 * 1000;
    if (Date.now() - data.timestamp > fiveMinutes) {
      console.log('[STORAGE] Pending reward expired, clearing...');
      clearPendingReward(address);
      return null;
    }
    
    console.log('[STORAGE] Pending reward loaded:', data.amount);
    return data.amount;
  } catch (error) {
    console.error('[STORAGE] Failed to load pending reward:', error);
    return null;
  }
}

/**
 * Clear pending reward from localStorage
 */
function clearPendingReward(address: string) {
  if (!address) return;
  
  try {
    const key = `${PENDING_REWARD_KEY_PREFIX}${address.toLowerCase()}`;
    localStorage.removeItem(key);
    console.log('[STORAGE] Pending reward cleared');
  } catch (error) {
    console.error('[STORAGE] Failed to clear pending reward:', error);
  }
}

export function useMining({ isConnected, address, loadedCartridge }: UseMiningOptions) {
  const [isMining, setIsMining] = useState(false);
  const [isReadyToClaim, setIsReadyToClaim] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [pendingReward, setPendingReward] = useState(0);
  const [pendingRarity, setPendingRarity] = useState<RarityTier | null>(null);
  const [miningProgress, setMiningProgress] = useState(0);
  const [miningDuration, setMiningDuration] = useState(0);
  
  const [stats, setStats] = useState<MiningStats>({
    minecart: 0,
    multiplier: 1.0,
    seasonPoints: 0,
    hashRate: 0,
  });
  
  const [logs, setLogs] = useState<MiningLog[]>([
    { timestamp: Date.now(), message: 'System initialized...', type: 'info' },
    { timestamp: Date.now(), message: 'Connected to ApeChain mainnet', type: 'success' },
    { timestamp: Date.now(), message: 'Waiting for connection...', type: 'info' },
  ]);
  
  const miningTimeoutRef = useRef<number | null>(null);
  const hashRateIntervalRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  /**
   * Add log message to console
   */
  const addLog = useCallback((message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs((prev) => [
      ...prev.slice(-20), // Keep last 20 logs
      { timestamp: Date.now(), message, type },
    ]);
  }, []);

  /**
   * Generate random hash rate (simulation)
   */
  const generateHashRate = useCallback(() => {
    return Math.floor(Math.random() * 50) + 50; // 50-100 H/s
  }, []);

  /**
   * Start mining with random duration
   */
  const startMining = useCallback(() => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!loadedCartridge) {
      toast.error('Please insert an ICE Breaker to start mining');
      addLog('Error: No ICE Breaker loaded', 'error');
      return;
    }

    if (isMining) return;

    // Generate random mining duration between 5-60 seconds
    const duration = Math.floor(Math.random() * (60 - 5 + 1)) + 5;
    setMiningDuration(duration);
    setMiningProgress(0);
    startTimeRef.current = Date.now();

    // Calculate rarity and reward
    const rarity = calculateRarity();
    const baseReward = Math.floor(duration / 5) + Math.floor(Math.random() * 3) + 1;
    const finalReward = calculateReward(baseReward, rarity);
    
    setPendingReward(finalReward);
    setPendingRarity(rarity);

    setIsMining(true);
    setIsReadyToClaim(false);
    
    addLog('Mining started...', 'success');
    addLog(`Loading ICE Breaker: ${loadedCartridge.name}`, 'info');
    addLog(`ICE Breaker Token ID: #${loadedCartridge.tokenId}`, 'info');
    addLog(`Expected mining time: ${duration} seconds`, 'info');
    addLog(`Analyzing data streams...`, 'info');
    
    toast.success(`Mining started! Duration: ${duration}s`);

    // Update hash rate every second
    hashRateIntervalRef.current = window.setInterval(() => {
      setStats((prev) => ({
        ...prev,
        hashRate: generateHashRate(),
      }));
    }, 1000);

    // Update progress every 100ms
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / (duration * 1000)) * 100, 100);
      setMiningProgress(progress);

      // Add progress logs
      if (progress >= 25 && progress < 26) {
        addLog('25% complete - Processing blocks...', 'info');
      } else if (progress >= 50 && progress < 51) {
        addLog('50% complete - Hash verification ongoing...', 'info');
      } else if (progress >= 75 && progress < 76) {
        addLog('75% complete - Almost there...', 'success');
      }
    }, 100);

    // Complete mining after duration
    miningTimeoutRef.current = window.setTimeout(() => {
      setIsMining(false);
      setIsReadyToClaim(true);
      setMiningProgress(100);
      
      // Save pending reward to localStorage (persist across page refresh)
      savePendingReward(address, finalReward);
      
      // Stop hash rate updates
      if (hashRateIntervalRef.current) {
        clearInterval(hashRateIntervalRef.current);
        hashRateIntervalRef.current = null;
      }
      
      // Stop progress updates
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
      setStats((prev) => ({ ...prev, hashRate: 0 }));
      
      addLog('Mining complete! Ready to claim reward', 'success');
      addLog(`Data Rarity: ${rarity.toUpperCase()}`, 'success');
      addLog(`Click CLAIM to receive ${finalReward} $DATA`, 'info');
      
      toast.success('Mining complete! Click CLAIM to collect your reward', {
        duration: 5000,
      });
    }, duration * 1000);
  }, [isConnected, loadedCartridge, isMining, address, addLog, generateHashRate]);

  /**
   * Stop mining (cancel)
   */
  const stopMining = useCallback(() => {
    if (!isMining && !isReadyToClaim) return;

    setIsMining(false);
    setIsReadyToClaim(false);
    setMiningProgress(0);
    setPendingReward(0);
    setPendingRarity(null);
    
    // Clear pending reward from localStorage
    clearPendingReward(address);
    
    addLog('Mining cancelled', 'info');
    toast.info('Mining cancelled');

    if (miningTimeoutRef.current) {
      clearTimeout(miningTimeoutRef.current);
      miningTimeoutRef.current = null;
    }

    if (hashRateIntervalRef.current) {
      clearInterval(hashRateIntervalRef.current);
      hashRateIntervalRef.current = null;
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    setStats((prev) => ({ ...prev, hashRate: 0 }));
  }, [isMining, isReadyToClaim, address, addLog]);

  /**
   * Claim reward by sending 0.01 APE to recipient address
   * This sends a real mainnet transaction on ApeChain
   */
  const claimReward = useCallback(async () => {
    if (!isReadyToClaim || isClaiming) return;

    setIsClaiming(true);
    addLog('Initiating claim transaction...', 'info');
    addLog('Fee: 0.01 APE', 'info');

    try {
      // Verify we're on ApeChain
      const currentChainId = await getChainId();
      const expectedChainId = APECHAIN_CONFIG.chainId;
      
      // Normalize both chain IDs for comparison (lowercase, trim whitespace)
      const normalizedCurrent = currentChainId.toLowerCase().trim();
      const normalizedExpected = expectedChainId.toLowerCase().trim();
      
      console.log('[CLAIM] Current Chain ID:', currentChainId);
      console.log('[CLAIM] Expected Chain ID:', expectedChainId);
      console.log('[CLAIM] Normalized Current:', normalizedCurrent);
      console.log('[CLAIM] Normalized Expected:', normalizedExpected);
      console.log('[CLAIM] Match:', normalizedCurrent === normalizedExpected);
      
      if (normalizedCurrent !== normalizedExpected) {
        addLog(`Wrong network detected: ${currentChainId}`, 'error');
        addLog(`Expected: ${expectedChainId} (ApeChain mainnet)`, 'error');
        addLog('Attempting to switch network...', 'info');
        
        toast.info('Switching to ApeChain mainnet...', { duration: 3000 });
        
        // Automatically attempt to switch to ApeChain
        try {
          await switchToApeChain();
          addLog('✓ Switched to ApeChain mainnet', 'success');
          toast.success('Switched to ApeChain! Please try claiming again.');
          
          // After successful switch, let user click claim again
          setIsClaiming(false);
          return;
        } catch (switchError) {
          addLog('Failed to switch network', 'error');
          throw new Error('Please manually switch to ApeChain mainnet in MetaMask');
        }
      }

      addLog('Network check passed ✓', 'success');

      if (!window.ethereum) {
        throw new Error('MetaMask not found');
      }

      // Get user's address
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[];
      
      const fromAddress = accounts[0];
      addLog(`From: ${fromAddress.slice(0, 6)}...${fromAddress.slice(-4)}`, 'info');

      // Check balance
      addLog('Checking wallet balance...', 'info');
      const balanceHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [fromAddress, 'latest'],
      }) as string;
      
      const balanceWei = BigInt(balanceHex);
      const balanceApe = Number(balanceWei) / 1e18;
      addLog(`Current balance: ${balanceApe.toFixed(4)} APE`, 'info');

      // Check if user has enough balance (0.01 APE + some gas)
      const requiredBalance = BigInt(CLAIM_FEE_WEI) + BigInt('100000000000000'); // 0.01 + 0.0001 for gas
      if (balanceWei < requiredBalance) {
        throw new Error(`Insufficient balance. Need at least 0.0101 APE`);
      }
      addLog('Balance check passed ✓', 'success');

      // Estimate gas for the transaction
      addLog('Estimating gas...', 'info');
      const gasEstimate = await window.ethereum.request({
        method: 'eth_estimateGas',
        params: [{
          from: fromAddress,
          to: CLAIM_RECIPIENT_ADDRESS,
          value: CLAIM_FEE_WEI,
        }],
      }) as string;
      
      addLog(`Gas estimate: ${gasEstimate}`, 'info');

      // Get current gas price
      const gasPriceHex = await window.ethereum.request({
        method: 'eth_gasPrice',
      }) as string;
      
      addLog(`Gas price: ${gasPriceHex}`, 'info');

      // Build transaction parameters
      const txParams = {
        from: fromAddress,
        to: CLAIM_RECIPIENT_ADDRESS,
        value: CLAIM_FEE_WEI,
        gas: gasEstimate,
        gasPrice: gasPriceHex,
      };

      addLog('Please confirm transaction in MetaMask...', 'info');
      addLog(`Sending 0.01 APE to ${CLAIM_RECIPIENT_ADDRESS.slice(0, 6)}...${CLAIM_RECIPIENT_ADDRESS.slice(-4)}`, 'info');

      // Send transaction
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      }) as string;

      addLog(`Transaction sent: ${txHash.slice(0, 10)}...`, 'success');
      addLog('Waiting for confirmation...', 'info');

      // Wait for transaction receipt
      let receipt = null;
      let attempts = 0;
      const maxAttempts = 60; // Wait up to 60 seconds

      while (!receipt && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          receipt = await window.ethereum.request({
            method: 'eth_getTransactionReceipt',
            params: [txHash],
          });
        } catch (e) {
          // Receipt not available yet
        }
        
        attempts++;
      }

      if (!receipt) {
        throw new Error('Transaction timeout - check your wallet for status');
      }

      // Check if transaction was successful
      const receiptData = receipt as { status: string };
      if (receiptData.status === '0x0') {
        throw new Error('Transaction failed - reverted');
      }

      // Add reward to stats
      const newStats = {
        minecart: stats.minecart + pendingReward,
        seasonPoints: stats.seasonPoints + (pendingReward * 10),
        multiplier: Math.min(stats.multiplier + 0.1, 3.0),
      };

      setStats((prev) => ({
        ...prev,
        ...newStats,
      }));

      // Save updated stats to localStorage
      saveStatsToStorage(address, newStats);
      
      // Clear pending reward from localStorage after successful claim
      clearPendingReward(address);

      setIsReadyToClaim(false);
      setPendingReward(0);
      setPendingRarity(null);
      setMiningProgress(0);

      addLog('✓ Transaction confirmed!', 'success');
      addLog(`✓ Reward claimed: ${pendingReward} $DATA!`, 'success');
      addLog('✓ Stats saved to your account', 'success');
      addLog('Reward added to your balance', 'success');
      
      toast.success(`Successfully claimed ${pendingReward} $DATA!`, {
        duration: 4000,
      });
    } catch (error) {
      console.error('Claim error:', error);
      
      let errorMessage = 'Failed to claim reward';
      
      if (error instanceof Error) {
        if (error.message.includes('User rejected') || error.message.includes('User denied')) {
          errorMessage = 'Transaction cancelled by user';
          addLog('Transaction cancelled', 'info');
        } else if (error.message.includes('network') || error.message.includes('switch')) {
          errorMessage = error.message;
          addLog(`Error: ${error.message}`, 'error');
        } else if (error.message.includes('Insufficient')) {
          errorMessage = error.message;
          addLog(`Error: ${error.message}`, 'error');
        } else {
          errorMessage = error.message;
          addLog(`Error: ${error.message}`, 'error');
        }
      } else {
        addLog('Unknown error occurred', 'error');
      }
      
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setIsClaiming(false);
    }
  }, [isReadyToClaim, isClaiming, pendingReward, address, stats, addLog]);

  /**
   * Mint NFT directly - fetches mint price and displays it to user
   * Direct on-chain minting from token ID 0
   */
  const mintNFT = useCallback(async () => {
    if (!loadedCartridge) {
      toast.error('Please insert an ICE Breaker first');
      return;
    }

    // Show initial toast
    const loadingToast = toast.loading('Fetching mint price...');

    try {
      addLog('Checking mint price from contract...', 'info');
      
      // Import the getMintPrice function
      const { getMintPrice } = await import('@/lib/minting');
      
      // Get mint price from contract
      const mintPriceWei = await getMintPrice();
      const mintPriceBigInt = BigInt(mintPriceWei);
      const mintPriceApe = Number(mintPriceBigInt) / 1e18;
      
      // Display mint price to user
      if (mintPriceBigInt > 0) {
        addLog(`Mint price: ${mintPriceApe.toFixed(6)} APE per NFT`, 'info');
        toast.loading(`Mint price: ${mintPriceApe.toFixed(6)} APE`, { id: loadingToast });
      } else {
        addLog('Free mint detected!', 'success');
        toast.loading('Free mint!', { id: loadingToast });
      }
      
      addLog('Initiating NFT mint transaction...', 'info');
      
      // Execute the mint transaction
      const mintedTokenIds = await executeMint(
        1, // Quantity: 1 NFT
        0, // No cost in $DATA (only contract price in APE)
        (message) => {
          addLog(message, 'info');
          toast.loading(message, { id: loadingToast });
        }
      );

      addLog(`✓ NFT minted successfully! Token ID: ${mintedTokenIds[0]}`, 'success');
      
      toast.success(`NFT minted! Token ID: ${mintedTokenIds[0]}`, { 
        id: loadingToast,
        duration: 5000 
      });
    } catch (error) {
      console.error('Mint error:', error);
      
      let errorMessage = 'Failed to mint NFT';
      
      if (error instanceof Error) {
        if (error.message.includes('User rejected') || error.message.includes('cancelled')) {
          errorMessage = 'Minting cancelled by user';
          addLog('Mint cancelled', 'info');
        } else {
          errorMessage = error.message;
          addLog(`Error: ${error.message}`, 'error');
        }
      }
      
      toast.error(errorMessage, { id: loadingToast, duration: 5000 });
    }
  }, [loadedCartridge, address, addLog]);

  /**
   * Load stats and pending reward from localStorage when wallet connects
   */
  useEffect(() => {
    if (isConnected && address) {
      // Load saved stats
      const savedStats = loadStatsFromStorage(address);
      
      if (savedStats) {
        setStats((prev) => ({
          ...prev,
          minecart: savedStats.minecart,
          seasonPoints: savedStats.seasonPoints,
          multiplier: savedStats.multiplier,
        }));
        
        addLog('✓ Account stats loaded', 'success');
        addLog(`$DATA: ${savedStats.minecart}`, 'info');
        addLog(`Season Credits: ${savedStats.seasonPoints}`, 'info');
        addLog(`Multiplier: ${savedStats.multiplier.toFixed(1)}x`, 'info');
        
        toast.success('Welcome back! Your stats have been loaded.', {
          duration: 3000,
        });
      } else {
        addLog('Starting fresh with new account', 'info');
      }
      
      // Load pending reward if exists (e.g., after page refresh during claim process)
      const savedPendingReward = loadPendingReward(address);
      
      if (savedPendingReward !== null && savedPendingReward > 0) {
        setPendingReward(savedPendingReward);
        setIsReadyToClaim(true);
        setMiningProgress(100);
        
        addLog('✓ Unclaimed reward restored!', 'success');
        addLog(`You have ${savedPendingReward} $DATA ready to claim`, 'info');
        
        toast.info(`You have ${savedPendingReward} $DATA ready to claim!`, {
          duration: 5000,
        });
      }
    }
  }, [isConnected, address, addLog]);

  /**
   * Update logs when connection status changes
   */
  useEffect(() => {
    if (isConnected) {
      addLog('Wallet connected successfully', 'success');
      addLog('Connected to ApeChain Network', 'success');
      
      if (loadedCartridge) {
        addLog(`ICE Breaker loaded: ${loadedCartridge.name}`, 'success');
        addLog('Ready to mine', 'info');
      } else {
        addLog('Waiting for ICE Breaker load...', 'info');
      }
    } else {
      if (isMining) {
        stopMining();
      }
      
      // Reset stats when disconnecting (but don't clear localStorage)
      setStats({
        minecart: 0,
        multiplier: 1.0,
        seasonPoints: 0,
        hashRate: 0,
      });
      
      // Reset pending reward state (but localStorage will persist)
      setPendingReward(0);
      setIsReadyToClaim(false);
      
      addLog('Wallet disconnected', 'info');
      addLog('Waiting for connection...', 'info');
    }
  }, [isConnected, address, isMining, stopMining, addLog, loadedCartridge]);

  /**
   * Update logs when cartridge changes
   */
  useEffect(() => {
    if (loadedCartridge && isConnected) {
      addLog(`ICE Breaker loaded: ${loadedCartridge.name}`, 'success');
      addLog(`Token ID: #${loadedCartridge.tokenId}`, 'info');
      addLog('Ready to mine', 'info');
    } else if (!loadedCartridge && isConnected) {
      if (isMining) {
        stopMining();
      }
      addLog('ICE Breaker ejected', 'info');
      addLog('Waiting for ICE Breaker load...', 'info');
    }
  }, [loadedCartridge, isConnected, isMining, stopMining, addLog]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (miningTimeoutRef.current) {
        clearTimeout(miningTimeoutRef.current);
      }
      if (hashRateIntervalRef.current) {
        clearInterval(hashRateIntervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return {
    isMining,
    isReadyToClaim,
    isClaiming,
    pendingReward,
    pendingRarity,
    miningProgress,
    miningDuration,
    stats,
    logs,
    startMining,
    stopMining,
    claimReward,
    mintNFT,
  };
}
