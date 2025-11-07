/**
 * MiningHistory Component
 * 
 * Retro-styled panel displaying the last 10 mining results.
 * Shows timestamp, reward amount, and rarity with color-coded styling.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Sparkles, TrendingUp } from 'lucide-react';
import { RARITY_CONFIGS, type RarityTier } from '@/lib/rarity';

export interface MiningHistoryEntry {
  id: string;
  timestamp: number;
  reward: number;
  rarity: RarityTier;
  duration: number;
}

interface MiningHistoryProps {
  entries: MiningHistoryEntry[];
}

/**
 * Format timestamp as relative time
 */
function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}

export function MiningHistory({ entries }: MiningHistoryProps) {
  // Show last 10 entries, most recent first
  const displayEntries = entries.slice(-10).reverse();

  if (displayEntries.length === 0) {
    return (
      <div className="bg-cyber-panel/70 backdrop-blur-sm rounded-lg p-4 border border-neon-cyan/40">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-neon-cyan" />
          <h3 className="text-sm text-neon-cyan uppercase tracking-widest font-cyber">Mining History</h3>
        </div>
        <div className="text-center py-6 text-terminal-dim text-xs">
          No mining history yet. Complete your first mine!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cyber-panel/70 backdrop-blur-sm rounded-lg p-4 border border-neon-cyan/40 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-neon-cyan" />
            <h3 className="text-sm text-neon-cyan uppercase tracking-widest font-cyber">Mining History</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-terminal-text">
            <TrendingUp className="w-3 h-3" />
            <span>{displayEntries.length} records</span>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {displayEntries.map((entry, index) => {
              const rarityConfig = RARITY_CONFIGS[entry.rarity];
              
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-cyber-darker/60 rounded border border-white/10 p-3 hover:border-neon-cyan/30 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Rarity & Reward */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl filter drop-shadow-lg"
                      >
                        {rarityConfig.icon}
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-sm font-bold font-cyber tracking-wider"
                            style={{ 
                              color: rarityConfig.color,
                              textShadow: `0 0 8px ${rarityConfig.glowColor}`
                            }}
                          >
                            +{entry.reward} $DATA
                          </span>
                          <span 
                            className="text-xs uppercase tracking-wider px-1.5 py-0.5 rounded border"
                            style={{ 
                              color: rarityConfig.color,
                              borderColor: rarityConfig.color,
                              backgroundColor: `${rarityConfig.color}15`
                            }}
                          >
                            {rarityConfig.name}
                          </span>
                        </div>
                        <div className="text-xs text-terminal-dim mt-0.5 font-mono">
                          Duration: {entry.duration}s
                        </div>
                      </div>
                    </div>

                    {/* Right: Timestamp */}
                    <div className="text-xs text-terminal-dim font-mono">
                      {formatRelativeTime(entry.timestamp)}
                    </div>
                  </div>

                  {/* Rarity Indicator Bar */}
                  <div className="mt-2 h-1 rounded-full overflow-hidden bg-cyber-darker">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rarityConfig.multiplier * 20}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: rarityConfig.color,
                        boxShadow: `0 0 8px ${rarityConfig.glowColor}`
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer Stats */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-terminal-text">
            <Sparkles className="w-3 h-3 text-neon-cyan" />
            <span>Total: {displayEntries.reduce((sum, e) => sum + e.reward, 0)} $DATA</span>
          </div>
          <div className="text-terminal-dim font-mono">
            Showing last {displayEntries.length} mines
          </div>
        </div>
      </div>
    </div>
  );
}
