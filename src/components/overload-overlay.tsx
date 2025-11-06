/**
 * OverloadOverlay Component
 * 
 * Full-screen overlay that displays during System Overload events.
 * Shows dramatic visual effects and event information.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, Skull } from 'lucide-react';
import { type OverloadEvent } from '@/lib/overload';

interface OverloadOverlayProps {
  event: OverloadEvent | null;
}

export function OverloadOverlay({ event }: OverloadOverlayProps) {
  if (!event || !event.active) return null;

  const getIcon = () => {
    switch (event.type) {
      case 'surge':
        return Zap;
      case 'crash':
        return Skull;
      case 'chaos':
        return AlertTriangle;
      default:
        return AlertTriangle;
    }
  };

  const Icon = getIcon();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 pointer-events-none"
      >
        {/* Border Pulse Effect */}
        <motion.div
          animate={{
            boxShadow: [
              `inset 0 0 0px ${event.color}`,
              `inset 0 0 40px ${event.color}`,
              `inset 0 0 0px ${event.color}`,
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0"
        />

        {/* Corner Indicators */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => {
          const positions = {
            'top-left': 'top-4 left-4',
            'top-right': 'top-4 right-4',
            'bottom-left': 'bottom-4 left-4',
            'bottom-right': 'bottom-4 right-4',
          };

          return (
            <motion.div
              key={corner}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              className={`absolute w-16 h-16 ${positions[corner as keyof typeof positions]}`}
            >
              <div
                className="w-full h-full border-4 rounded-lg"
                style={{ 
                  borderColor: event.color,
                  boxShadow: `0 0 20px ${event.color}`,
                }}
              />
            </motion.div>
          );
        })}

        {/* Center Warning */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
            }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="relative"
          >
            {/* Glow Background */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ backgroundColor: event.color }}
            />

            {/* Icon Container */}
            <motion.div
              animate={{
                rotate: event.type === 'chaos' ? [0, 5, -5, 0] : 0,
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="relative bg-cyber-panel/90 backdrop-blur-md border-4 rounded-2xl p-8"
              style={{ 
                borderColor: event.color,
                boxShadow: `0 0 40px ${event.color}/0.6`,
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: event.type === 'chaos' ? [0, 180, 360] : 0,
                }}
                transition={{ 
                  scale: { duration: 1, repeat: Infinity },
                  rotate: { duration: 2, repeat: Infinity, ease: 'linear' }
                }}
              >
                <Icon 
                  className="w-20 h-20"
                  style={{ color: event.color }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Top Banner */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="absolute top-0 inset-x-0 bg-gradient-to-b from-cyber-dark via-cyber-dark/95 to-transparent pt-8 pb-12"
        >
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-center"
            >
              <div 
                className="text-xs uppercase tracking-[0.3em] mb-2 font-cyber"
                style={{ color: event.color }}
              >
                ⚠ System Alert ⚠
              </div>
              <h2 
                className="text-4xl font-bold uppercase tracking-wider mb-2 font-cyber"
                style={{ 
                  color: event.color,
                  textShadow: `0 0 20px ${event.color}`,
                }}
              >
                {event.name}
              </h2>
              <p className="text-sm text-terminal-text/80 font-cyber">
                {event.description}
              </p>
              <div className="mt-3 flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-neon-green" />
                  <span className="text-neon-green font-bold font-cyber">
                    Reward: {event.multiplier.toFixed(1)}x
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-neon-pink" />
                  <span className="text-neon-pink font-bold font-cyber">
                    Risk: {(event.failureChance * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scan Lines Effect */}
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${event.color}22 2px,
              ${event.color}22 4px
            )`
          }}
        />

        {/* Glitch Overlay */}
        {event.type === 'chaos' && (
          <motion.div
            animate={{
              opacity: [0, 0.3, 0, 0.2, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
            className="absolute inset-0 bg-neon-cyan/20 mix-blend-screen"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
