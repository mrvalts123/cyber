/**
 * ChallengeDisplay Component
 * 
 * Displays daily challenges with progress tracking.
 * Shows completion status and available rewards.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Target, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type DailyChallengeState, getTimeUntilRefresh, formatTimeRemaining } from '@/lib/challenges';

interface ChallengeDisplayProps {
  isOpen: boolean;
  onClose: () => void;
  challengeState: DailyChallengeState;
}

export function ChallengeDisplay({ isOpen, onClose, challengeState }: ChallengeDisplayProps) {
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(0);

  // Update refresh timer
  useEffect(() => {
    if (!isOpen) return;

    const updateTimer = () => {
      setTimeUntilRefresh(getTimeUntilRefresh(challengeState));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [challengeState, isOpen]);

  const completedCount = challengeState.challenges.filter(c => c.completed).length;
  const totalReward = challengeState.challenges
    .filter(c => c.completed)
    .reduce((sum, c) => sum + c.reward, 0);

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

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Border */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px hsl(45 100% 55% / 0.3)',
                    '0 0 40px hsl(45 100% 55% / 0.6)',
                    '0 0 20px hsl(45 100% 55% / 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
              />

              <div className="relative bg-cyber-panel border-2 border-neon-orange rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-cyber-darker to-cyber-panel border-b border-neon-orange/30 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy className="w-6 h-6 text-neon-orange" />
                        <h2 className="text-2xl font-bold text-neon-orange uppercase tracking-wider font-cyber">
                          Daily Breach Targets
                        </h2>
                      </div>
                      <p className="text-sm text-terminal-text/70 font-cyber">
                        Complete challenges for bonus $DATA rewards
                      </p>
                    </div>
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      size="icon"
                      className="text-terminal-dim hover:text-neon-orange hover:bg-neon-orange/10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Stats Bar */}
                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-neon-cyan" />
                      <span className="text-sm text-terminal-text font-cyber">
                        Completed: <span className="text-neon-cyan font-bold">{completedCount}/3</span>
                      </span>
                    </div>
                    {totalReward > 0 && (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-neon-green" />
                        <span className="text-sm text-terminal-text font-cyber">
                          Earned: <span className="text-neon-green font-bold">+{totalReward} $DATA</span>
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Challenges List */}
                <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto scrollbar-thin">
                  {challengeState.challenges.map((challenge, index) => {
                    const progress = Math.min((challenge.progress / challenge.target) * 100, 100);
                    const isComplete = challenge.completed;

                    return (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative bg-cyber-darker/50 border rounded-lg p-4 ${
                          isComplete 
                            ? 'border-neon-green shadow-neon-green/20' 
                            : 'border-cyber-border/50'
                        }`}
                      >
                        {/* Completion Badge */}
                        {isComplete && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute -top-2 -right-2 bg-neon-green rounded-full p-1.5 shadow-neon-green"
                          >
                            <CheckCircle className="w-4 h-4 text-cyber-dark" />
                          </motion.div>
                        )}

                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold mb-1 font-cyber ${
                              isComplete ? 'text-neon-green' : 'text-neon-cyan'
                            }`}>
                              {challenge.name}
                            </h3>
                            <p className="text-sm text-terminal-text/70">
                              {challenge.description}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-xs text-terminal-dim uppercase tracking-wider mb-1 font-cyber">
                              Reward
                            </div>
                            <div className="text-lg font-bold text-neon-orange font-cyber">
                              +{challenge.reward} $DATA
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-terminal-text/70 font-cyber">
                              Progress
                            </span>
                            <span className={`font-bold font-cyber ${
                              isComplete ? 'text-neon-green' : 'text-neon-cyan'
                            }`}>
                              {challenge.progress} / {challenge.target}
                            </span>
                          </div>
                          <div className="h-2 bg-cyber-darker rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                isComplete ? 'bg-neon-green' : 'bg-neon-cyan'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.5, ease: 'easeOut' }}
                              style={{
                                boxShadow: isComplete 
                                  ? '0 0 10px hsl(150 100% 60%)' 
                                  : '0 0 10px hsl(180 100% 50%)'
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="bg-cyber-darker/50 border-t border-cyber-border/30 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-terminal-text/70">
                      <Clock className="w-4 h-4" />
                      <span className="font-cyber">
                        Refreshes in: <span className="text-neon-cyan font-bold">
                          {formatTimeRemaining(timeUntilRefresh)}
                        </span>
                      </span>
                    </div>
                    <span className="text-xs text-terminal-dim uppercase tracking-wider font-cyber">
                      New challenges daily
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
