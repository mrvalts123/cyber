/**
 * ClaimDialog Component
 * 
 * Cyberpunk modal dialog for claiming data mining rewards.
 * Displays pending $DATA amount with rarity tier and initiates 0.01 APE anonymizer fee transaction.
 * Features stunning rarity reveal animations and color-coded tiers.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Zap, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRarityConfig, type RarityTier } from '@/lib/rarity';

interface ClaimDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pendingReward: number;
  pendingRarity: RarityTier | null;
  isClaiming: boolean;
  onClaim: () => void;
}

export function ClaimDialog({
  isOpen,
  onClose,
  pendingReward,
  pendingRarity,
  isClaiming,
  onClaim,
}: ClaimDialogProps) {
  const rarityConfig = pendingRarity ? getRarityConfig(pendingRarity) : null;

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
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="cyber-panel border-2 rounded-lg p-8 max-w-md w-full relative shadow-2xl overflow-hidden"
              style={{ 
                borderColor: rarityConfig?.color || 'hsl(180 100% 50%)',
                boxShadow: `0 0 60px ${rarityConfig?.glowColor || 'hsl(180 100% 50% / 0.4)'}, inset 0 0 40px rgba(0, 0, 0, 0.5)` 
              }}
            >
              {/* Animated Grid Background */}
              <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
              
              {/* Matrix Rain Effect for Rare+ Drops */}
              {rarityConfig && ['rare', 'epic', 'legendary', 'mythic'].includes(rarityConfig.tier) && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 15 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xs font-mono opacity-30"
                      style={{
                        left: `${(i * 7) % 100}%`,
                        color: rarityConfig.color,
                      }}
                      animate={{
                        y: ['0%', '100%'],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'linear',
                      }}
                    >
                      {Array.from({ length: 8 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Holographic Corner Accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 opacity-50" style={{ borderColor: rarityConfig?.color || 'hsl(180 100% 50%)' }} />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 opacity-50" style={{ borderColor: rarityConfig?.color || 'hsl(180 100% 50%)' }} />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 opacity-50" style={{ borderColor: rarityConfig?.color || 'hsl(180 100% 50%)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 opacity-50" style={{ borderColor: rarityConfig?.color || 'hsl(180 100% 50%)' }} />

              {/* Close Button */}
              <button
                onClick={onClose}
                disabled={isClaiming}
                className="absolute top-4 right-4 z-20 text-terminal-dim hover:text-neon-pink transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full border-4 flex items-center justify-center bg-opacity-10"
                    style={{ 
                      borderColor: rarityConfig?.color || 'hsl(180 100% 50%)',
                      backgroundColor: rarityConfig?.color || 'hsl(180 100% 50%)',
                      boxShadow: `0 0 30px ${rarityConfig?.glowColor || 'hsl(180 100% 50% / 0.6)'}, inset 0 0 20px ${rarityConfig?.glowColor || 'hsl(180 100% 50% / 0.2)'}` 
                    }}
                  >
                    <Database className="w-10 h-10" style={{ color: rarityConfig?.color || 'hsl(180 100% 50%)' }} />
                  </motion.div>
                  <h2 className="text-3xl font-bold neon-text mb-3 font-cyber tracking-wider" style={{ color: rarityConfig?.color || 'hsl(180 100% 50%)' }}>
                    DATA EXTRACTED
                  </h2>
                  <p className="text-terminal-text text-sm uppercase tracking-[0.15em] font-cyber">
                    Decryption Complete
                  </p>
                </div>

                {/* Rarity Reveal */}
                {rarityConfig && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
                    className="mb-6 relative"
                  >
                    <div 
                      className="rounded-lg p-4 border-2 relative overflow-hidden"
                      style={{ 
                        borderColor: rarityConfig.color,
                        backgroundColor: `${rarityConfig.color}15`,
                        boxShadow: `0 0 30px ${rarityConfig.glowColor}, inset 0 0 20px ${rarityConfig.glowColor}`
                      }}
                    >
                      {/* Sparkle Effects for Epic+ */}
                      {['epic', 'legendary', 'mythic'].includes(rarityConfig.tier) && (
                        <>
                          {Array.from({ length: 6 }, (_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                top: `${20 + (i * 15)}%`,
                                left: `${10 + (i * 15)}%`,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360],
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                              }}
                            >
                              <Sparkles className="w-4 h-4" style={{ color: rarityConfig.color }} />
                            </motion.div>
                          ))}
                        </>
                      )}

                      <div className="relative z-10 text-center">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-6xl mb-2"
                        >
                          {rarityConfig.icon}
                        </motion.div>
                        <motion.div
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-3xl font-bold uppercase tracking-wider font-cyber"
                          style={{ 
                            color: rarityConfig.color,
                            textShadow: `0 0 20px ${rarityConfig.glowColor}, 0 0 40px ${rarityConfig.glowColor}`
                          }}
                        >
                          {rarityConfig.name}
                        </motion.div>
                        <div className="text-xs text-terminal-text/70 uppercase tracking-widest mt-2 font-cyber">
                          Rarity: {Math.round(rarityConfig.dropRate * 100) / 100}% Drop Rate
                        </div>
                        <div className="text-sm text-terminal-text uppercase tracking-wider mt-1 font-cyber">
                          {rarityConfig.multiplier}x Multiplier
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Reward Display */}
                <div 
                  className="rounded-lg p-6 mb-6 border-2 relative overflow-hidden"
                  style={{ 
                    backgroundColor: 'hsl(180 50% 5% / 0.7)',
                    borderColor: rarityConfig?.color || 'hsl(150 100% 60% / 0.5)',
                    boxShadow: `0 0 25px ${rarityConfig?.glowColor || 'hsl(150 100% 60% / 0.3)'}, inset 0 0 15px rgba(0, 0, 0, 0.5)` 
                  }}
                >
                  {/* Animated Scanline */}
                  <motion.div
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent"
                    style={{ 
                      backgroundImage: `linear-gradient(to bottom, transparent, ${rarityConfig?.color || 'hsl(150 100% 60%)'}20, transparent)` 
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" style={{ color: rarityConfig?.color || 'hsl(150 100% 60%)' }} />
                        <span className="terminal-text text-sm uppercase tracking-[0.15em] font-cyber">
                          Recovered Data
                        </span>
                      </div>
                      <ShieldCheck className="w-5 h-5" style={{ color: rarityConfig?.color || 'hsl(150 100% 60%)' }} />
                    </div>
                    
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-6xl font-bold stat-glow mb-2 font-cyber tracking-wider"
                        style={{ 
                          color: rarityConfig?.color || 'hsl(150 100% 60%)',
                          textShadow: `0 0 20px ${rarityConfig?.glowColor || 'hsl(150 100% 60% / 0.6)'}, 0 0 40px ${rarityConfig?.glowColor || 'hsl(150 100% 60% / 0.4)'}`
                        }}
                      >
                        {pendingReward}
                      </motion.div>
                      <div className="text-terminal-text text-sm uppercase tracking-[0.2em] font-cyber">
                        $DATA Units
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fee Info */}
                <div className="bg-cyber-panel/50 rounded-lg p-4 mb-6 border border-neon-purple/30">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-terminal-text uppercase tracking-wider font-cyber">
                      Anonymizer Fee
                    </span>
                    <span className="text-neon-purple font-bold font-cyber tracking-wider">
                      0.01 APE
                    </span>
                  </div>
                  <div className="text-xs text-terminal-dim font-mono">
                    Required to secure extracted data on ApeChain network
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={onClose}
                    disabled={isClaiming}
                    variant="outline"
                    className="flex-1 bg-cyber-panel hover:bg-cyber-panel/80 text-terminal-text border-cyber-border uppercase tracking-wider font-cyber"
                  >
                    Abort
                  </Button>
                  <Button
                    onClick={onClaim}
                    disabled={isClaiming}
                    className="flex-1 font-bold uppercase tracking-wider font-cyber border-2"
                    style={{ 
                      backgroundColor: rarityConfig?.color || 'hsl(180 100% 50%)',
                      borderColor: rarityConfig?.color || 'hsl(180 100% 50%)',
                      color: 'hsl(240 15% 6%)',
                      boxShadow: `0 0 25px ${rarityConfig?.glowColor || 'hsl(180 100% 50% / 0.5)'}` 
                    }}
                  >
                    {isClaiming ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4 mr-2" />
                        Claim $DATA
                      </>
                    )}
                  </Button>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-terminal-dim font-mono">
                    Ensure your wallet has sufficient APE balance
                  </p>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-2 text-[10px] uppercase tracking-[0.2em] font-cyber"
                    style={{ color: rarityConfig?.color || 'hsl(180 100% 50%)' }}
                  >
                    Neural Link Active
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
