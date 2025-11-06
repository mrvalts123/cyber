/**
 * ComboDisplay Component
 * 
 * Shows current combo streak and multiplier with animated effects.
 * Displays countdown timer until combo expires.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, Crown } from 'lucide-react';
import { type ComboState, getComboName, getComboColor, getComboTimeRemaining, isComboActive } from '@/lib/combo';

interface ComboDisplayProps {
  comboState: ComboState;
}

export function ComboDisplay({ comboState }: ComboDisplayProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const isActive = isComboActive(comboState) && comboState.level > 0;

  // Update countdown timer
  useEffect(() => {
    if (!isActive) {
      setTimeRemaining(0);
      return;
    }

    const updateTimer = () => {
      setTimeRemaining(getComboTimeRemaining(comboState));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [comboState, isActive]);

  if (!isActive) return null;

  const comboColor = getComboColor(comboState.level);
  const comboName = getComboName(comboState.level);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
        }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        className="relative"
      >
        {/* Glow Effect */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px ${comboColor}/0.3`,
              `0 0 40px ${comboColor}/0.6`,
              `0 0 20px ${comboColor}/0.3`,
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-lg blur-xl"
          style={{ backgroundColor: comboColor, opacity: 0.2 }}
        />

        <div className="relative bg-cyber-panel/90 backdrop-blur-md border-2 rounded-lg p-4 overflow-hidden"
          style={{ borderColor: comboColor }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4">
            {/* Combo Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              {comboState.level >= 4 ? (
                <Crown className="w-8 h-8" style={{ color: comboColor }} />
              ) : comboState.level >= 2 ? (
                <Flame className="w-8 h-8" style={{ color: comboColor }} />
              ) : (
                <Zap className="w-8 h-8" style={{ color: comboColor }} />
              )}
            </motion.div>

            {/* Combo Info */}
            <div className="flex-1">
              <motion.div
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xs uppercase tracking-widest font-cyber"
                style={{ color: comboColor }}
              >
                {comboName}
              </motion.div>
              
              <div className="flex items-baseline gap-2 mt-1">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
                  className="text-2xl font-bold font-cyber"
                  style={{ color: comboColor }}
                >
                  {comboState.multiplier.toFixed(1)}x
                </motion.span>
                <span className="text-sm text-terminal-text/60 font-cyber">
                  STREAK {comboState.streak}
                </span>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="text-xs text-terminal-dim uppercase tracking-wider mb-1 font-cyber">
                EXPIRES IN
              </div>
              <motion.div
                animate={{
                  color: timeRemaining < 30 ? ['hsl(0 100% 50%)', 'hsl(330 100% 60%)', 'hsl(0 100% 50%)'] : comboColor
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-lg font-bold font-mono"
              >
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-1 bg-cyber-darker rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ 
                backgroundColor: comboColor,
                width: `${(timeRemaining / 120) * 100}%`,
              }}
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
