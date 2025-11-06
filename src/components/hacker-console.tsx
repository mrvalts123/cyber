/**
 * HackerConsole Component
 * 
 * Main cyberpunk hacker terminal UI component.
 * Renders the futuristic hacking console with screen, controls, and branding.
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Shield } from 'lucide-react';

interface HackerConsoleProps {
  children: ReactNode;
  controls: ReactNode;
}

export function HackerConsole({ children, controls }: HackerConsoleProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Main Cyber Panel */}
      <div className="cyber-panel rounded-lg p-6 shadow-2xl relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        
        {/* Top Branding Bar */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full border-2 border-neon-cyan flex items-center justify-center"
                style={{ boxShadow: '0 0 20px hsl(180 100% 50% / 0.5)' }}
              >
                <Terminal className="w-5 h-5 text-neon-cyan" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-neon-cyan neon-text font-cyber tracking-wider">
                  CYBER MINER
                </h1>
                <div className="text-xs text-terminal-text uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  <span>Neural Network v3.0</span>
                </div>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1 px-3 py-1 rounded border border-neon-green/50 bg-terminal-bg/30"
              >
                <Shield className="w-3 h-3 text-neon-green" />
                <span className="text-xs text-neon-green uppercase tracking-wider">Secure</span>
              </motion.div>
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 10px hsl(180 100% 50%)' }} />
            </div>
          </div>
        </div>

        {/* Main Screen Container */}
        <div className="relative z-10 bg-cyber-darker rounded-lg p-4 mb-6 shadow-cyber-inset border border-cyber-border/50">
          <div className="cyber-screen rounded-lg p-6 min-h-[450px] relative overflow-hidden scanline">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-pink" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-pink" />
            
            {children}
          </div>
        </div>

        {/* Control Section */}
        <div className="relative z-10">
          {controls}
        </div>

        {/* Bottom Status Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-cyber-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-terminal-dim text-xs uppercase tracking-wider">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-neon-cyan"
                style={{ boxShadow: '0 0 8px hsl(180 100% 50%)' }}
              />
              <span>System Active</span>
            </div>
            <div className="text-terminal-dim text-xs uppercase tracking-widest">
              ApeChain Network
            </div>
          </div>
        </div>

        {/* Holographic Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-neon-cyan/5 to-transparent rotate-45" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-neon-pink/5 to-transparent rotate-45" />
        </div>
      </div>

      {/* Decorative Top Label */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-terminal-dim text-xs uppercase tracking-[0.3em] flex items-center gap-2">
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan" />
        <span>Web3 Neural Interface</span>
        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-neon-cyan" />
      </div>
    </motion.div>
  );
}
