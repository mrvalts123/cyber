/**
 * useLeaderboard Hook
 * 
 * Custom React hook for managing global leaderboard data.
 * Tracks all players' stats in localStorage and provides sorted leaderboard.
 */

import { useState, useEffect, useCallback } from 'react';
import { type LeaderboardEntry } from '@/components/leaderboard';

const LEADERBOARD_STORAGE_KEY = 'mineboy_leaderboard';
const STATS_KEY_PREFIX = 'mineboy_stats_';

/**
 * Get all player stats from localStorage and compile leaderboard
 */
function getAllPlayerStats(): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = [];
  
  try {
    // Iterate through all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith(STATS_KEY_PREFIX)) {
        const address = key.replace(STATS_KEY_PREFIX, '');
        const data = localStorage.getItem(key);
        
        if (data) {
          try {
            const stats = JSON.parse(data);
            
            // Only include players with season points > 0
            if (stats.seasonPoints > 0) {
              entries.push({
                address: address,
                seasonPoints: stats.seasonPoints || 0,
                minecart: stats.minecart || 0,
                multiplier: stats.multiplier || 1.0,
                lastUpdated: stats.lastUpdated || Date.now(),
              });
            }
          } catch (e) {
            console.error('[LEADERBOARD] Failed to parse stats for', address, e);
          }
        }
      }
    }
  } catch (error) {
    console.error('[LEADERBOARD] Failed to load player stats:', error);
  }
  
  return entries;
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load leaderboard data from localStorage
   */
  const loadLeaderboard = useCallback(() => {
    setIsLoading(true);
    
    try {
      const playerStats = getAllPlayerStats();
      setEntries(playerStats);
      console.log('[LEADERBOARD] Loaded', playerStats.length, 'players');
    } catch (error) {
      console.error('[LEADERBOARD] Failed to load:', error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh leaderboard (call this after mining/claiming)
   */
  const refreshLeaderboard = useCallback(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  /**
   * Load leaderboard on mount
   */
  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  /**
   * Listen for storage changes (from other tabs or after saving stats)
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith(STATS_KEY_PREFIX)) {
        console.log('[LEADERBOARD] Detected stats update, refreshing...');
        refreshLeaderboard();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshLeaderboard]);

  return {
    entries,
    isLoading,
    refreshLeaderboard,
  };
}
