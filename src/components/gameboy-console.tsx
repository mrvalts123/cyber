/**
 * GameBoyConsole Component
 * 
 * Main GameBoy device UI component.
 * Renders the retro gaming console with screen, controls, and branding.
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GameBoyConsoleProps {
  children: ReactNode;
  controls: ReactNode;
}

export function GameBoyConsole({ children, controls }: GameBoyConsoleProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Main GameBoy Body */}
      <div className="gameboy-body rounded-3xl p-6 pb-8 shadow-2xl">
        {/* Top Branding */}
        <div className="text-center mb-4">
          <div className="text-xs text-white/60 uppercase tracking-widest mb-1">
            Powered by Web3
          </div>
          <h1 className="text-2xl font-bold text-white neon-text">
            MineBoy™
          </h1>
          <div className="text-xs text-white/60 mt-1">it Mines $</div>
        </div>

        {/* Screen Container */}
        <div className="bg-gameboy-button rounded-2xl p-4 mb-6 shadow-inner">
          <div className="gameboy-screen rounded-xl p-6 min-h-[400px] relative overflow-hidden scanline">
            {children}
          </div>
        </div>

        {/* Control Section */}
        <div className="mt-6">
          {controls}
        </div>

        {/* Bottom Branding */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-white/40">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider">MINEBOY</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-white/20 text-sm uppercase tracking-widest">
        Web3 Edition
      </div>
    </motion.div>
  );
}
