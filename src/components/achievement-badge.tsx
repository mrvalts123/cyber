/**
 * AchievementBadge Component
 * 
 * Animated achievement notification badge that pops up when unlocking achievements.
 * Features satisfying animations, particle effects, and rarity-based styling.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, X } from 'lucide-react';
import { type Achievement, getAchievementRarityColor } from '@/lib/achievements';
import { Button } from '@/components/ui/button';

interface AchievementBadgeProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementBadge({ achievement, onClose }: AchievementBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!achievement) return null;

  const rarityColor = getAchievementRarityColor(achievement.rarity);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="fixed top-6 right-6 z-50 w-96 max-w-[90vw]"
        >
          <div
            className="relative bg-cyber-panel border-2 rounded-lg p-5 shadow-2xl overflow-hidden"
            style={{ 
              borderColor: rarityColor,
              boxShadow: `0 0 30px ${rarityColor}80, inset 0 0 20px rgba(0, 0, 0, 0.5)`
            }}
          >
            {/* Animated Background Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-lg blur-xl"
              style={{ backgroundColor: `${rarityColor}20` }}
            />

            {/* Particle Effects */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: rarityColor }}
                initial={{
                  x: '50%',
                  y: '50%',
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 200}%`,
                  y: `${50 + (Math.random() - 0.5) * 200}%`,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Trophy className="w-5 h-5" style={{ color: rarityColor }} />
                  </motion.div>
                  <span 
                    className="text-sm uppercase tracking-widest font-cyber font-bold"
                    style={{ color: rarityColor }}
                  >
                    Achievement Unlocked!
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Achievement Icon & Name */}
              <div className="flex items-center gap-4 mb-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="text-5xl filter drop-shadow-lg"
                >
                  {achievement.icon}
                </motion.div>
                <div className="flex-1">
                  <h3 
                    className="text-xl font-bold mb-1 font-cyber"
                    style={{ 
                      color: rarityColor,
                      textShadow: `0 0 10px ${rarityColor}80`
                    }}
                  >
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Rarity & Reward */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" style={{ color: rarityColor }} />
                  <span 
                    className="text-xs uppercase tracking-wider font-bold"
                    style={{ color: rarityColor }}
                  >
                    {achievement.rarity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/60 uppercase">Reward:</span>
                  <span className="text-neon-cyan font-bold font-cyber">+{achievement.reward} $DATA</span>
                </div>
              </div>
            </div>

            {/* Shine Effect */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: '200%', opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
