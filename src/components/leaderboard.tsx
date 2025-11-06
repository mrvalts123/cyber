/**
 * Leaderboard Component
 * 
 * Modern, quality leaderboard modal displaying top players by season points.
 * Shows rank, wallet address, season points, and minecart count.
 * Highlights the current user's position.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal, Award, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/lib/wallet';

export interface LeaderboardEntry {
  address: string;
  seasonPoints: number;
  minecart: number;
  multiplier: number;
  lastUpdated: number;
}

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  currentAddress: string;
}

export function Leaderboard({
  isOpen,
  onClose,
  entries,
  currentAddress,
}: LeaderboardProps) {
  // Sort entries by season points (descending)
  const sortedEntries = [...entries].sort((a, b) => b.seasonPoints - a.seasonPoints);
  
  // Get current user's rank
  const currentUserRank = sortedEntries.findIndex(
    entry => entry.address.toLowerCase() === currentAddress.toLowerCase()
  ) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <Trophy className="w-4 h-4 text-white/40" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-300';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-white/60';
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return 'bg-neon-cyan/10 border-neon-cyan/50';
    }
    switch (rank) {
      case 1:
        return 'bg-yellow-400/5 border-yellow-400/30';
      case 2:
        return 'bg-gray-300/5 border-gray-300/30';
      case 3:
        return 'bg-amber-600/5 border-amber-600/30';
      default:
        return 'bg-gameboy-button/30 border-white/10';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-gameboy-dark border-2 border-neon-purple/50 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden pointer-events-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-neon-purple" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white neon-text">
                        Leaderboard
                      </h2>
                      <p className="text-xs text-white/60 mt-0.5">
                        Top MineBoy Players
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Current User Stats */}
                {currentUserRank > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-neon-cyan font-bold text-lg">
                          #{currentUserRank}
                        </div>
                        <div>
                          <div className="text-xs text-white/50 uppercase tracking-wider">
                            Your Rank
                          </div>
                          <div className="text-sm text-neon-cyan font-bold">
                            {sortedEntries[currentUserRank - 1]?.seasonPoints.toLocaleString()} pts
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/50 uppercase tracking-wider">
                          $DATA
                        </div>
                        <div className="text-sm text-white font-bold">
                          {sortedEntries[currentUserRank - 1]?.minecart.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Leaderboard List */}
              <div className="overflow-y-auto max-h-[calc(80vh-200px)] p-4">
                {sortedEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/40 text-sm">
                      No players yet. Start mining to be the first!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sortedEntries.map((entry, index) => {
                      const rank = index + 1;
                      const isCurrentUser = entry.address.toLowerCase() === currentAddress.toLowerCase();

                      return (
                        <motion.div
                          key={entry.address}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`border rounded-lg p-4 transition-all hover:scale-[1.02] ${
                            getRankBg(rank, isCurrentUser)
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {/* Rank */}
                            <div className="flex-shrink-0 w-12 flex flex-col items-center">
                              {getRankIcon(rank)}
                              <span className={`text-lg font-bold mt-1 ${getRankColor(rank)}`}>
                                #{rank}
                              </span>
                            </div>

                            {/* Address */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`font-mono text-sm ${
                                  isCurrentUser ? 'text-neon-cyan font-bold' : 'text-white'
                                }`}>
                                  {formatAddress(entry.address)}
                                </span>
                                {isCurrentUser && (
                                  <span className="px-2 py-0.5 bg-neon-cyan/20 text-neon-cyan text-[10px] rounded-full uppercase tracking-wider">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                                <span>{entry.multiplier.toFixed(1)}x multiplier</span>
                                <span>•</span>
                                <span>
                                  {new Date(entry.lastUpdated).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-6 text-right">
                              {/* Season Points */}
                              <div>
                                <div className="flex items-center justify-end gap-1 text-yellow-400">
                                  <Trophy className="w-3 h-3" />
                                  <span className="text-xs uppercase tracking-wider">
                                    Points
                                  </span>
                                </div>
                                <div className="text-lg font-bold text-white mt-0.5">
                                  {entry.seasonPoints.toLocaleString()}
                                </div>
                              </div>

                              {/* Minecarts */}
                              <div>
                                <div className="flex items-center justify-end gap-1 text-neon-cyan">
                                  <Zap className="w-3 h-3" />
                                  <span className="text-xs uppercase tracking-wider">
                                    Carts
                                  </span>
                                </div>
                                <div className="text-lg font-bold text-white mt-0.5">
                                  {entry.minecart.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-4 bg-gameboy-button/20">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{sortedEntries.length} players competing</span>
                  <span>Updated in real-time</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
