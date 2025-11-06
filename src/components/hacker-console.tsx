/**
 * HackerConsole Component
 * 
 * Main cyberpunk hacker terminal UI component.
 * Renders the futuristic hacking console with screen, controls, and branding.
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, LogOut, Wallet, Trophy, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/lib/wallet';

interface HackerConsoleProps {
  children: ReactNode;
  controls: ReactNode;
  isConnected?: boolean;
  address?: string;
  isConnecting?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenGuide?: () => void;
}

export function HackerConsole({ children, controls, isConnected = false, address = '', isConnecting = false, onConnect, onDisconnect, onOpenLeaderboard, onOpenGuide }: HackerConsoleProps) {
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
                  <span>Neural Network v1.0</span>
                </div>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex items-center gap-3">
              {/* X/Twitter Link */}
              <motion.a
                href="https://x.com/cyberminerAPE"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1 rounded border border-neon-cyan/50 bg-terminal-bg/30 hover:bg-neon-cyan/10 transition-colors group"
                title="Follow on X/Twitter"
              >
                <svg className="w-3 h-3 text-neon-cyan group-hover:text-neon-cyan transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>

              
              {/* RANKS Button */}
              {onOpenLeaderboard && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenLeaderboard}
                  className="flex items-center gap-1.5 px-3 py-1 rounded border border-neon-green/50 bg-terminal-bg/30 hover:bg-neon-green/10 transition-colors"
                  title="Leaderboard"
                >
                  <Trophy className="w-3 h-3 text-neon-green" />
                </motion.button>
              )}

              {/* GUIDE Button */}
              {onOpenGuide && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenGuide}
                  className="flex items-center gap-1.5 px-3 py-1 rounded border border-neon-pink/50 bg-terminal-bg/30 hover:bg-neon-pink/10 transition-colors"
                  title="Game Guide"
                >
                  <HelpCircle className="w-3 h-3 text-neon-pink" />
                </motion.button>
              )}
              
              {isConnected && address ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1 rounded border border-neon-cyan/50 bg-cyber-panel/50">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 10px hsl(180 100% 50%)' }} />
                    <span className="text-xs text-neon-cyan font-mono">{formatAddress(address)}</span>
                  </div>
                  
                  {onDisconnect && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onDisconnect}
                      className="flex items-center gap-1 px-2 py-1 rounded border border-neon-pink/50 bg-cyber-panel/50 hover:bg-neon-pink/20 transition-colors"
                      title="Disconnect Wallet"
                    >
                      <LogOut className="w-3 h-3 text-neon-pink" />
                    </motion.button>
                  )}
                </>
              ) : (
                onConnect && (
                  <Button
                    onClick={onConnect}
                    disabled={isConnecting}
                    size="sm"
                    className="cyber-button bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan text-xs uppercase tracking-wider font-cyber px-4 py-1 h-auto"
                    style={{ boxShadow: '0 0 15px hsl(180 100% 50% / 0.3)' }}
                  >
                    <Wallet className="w-3 h-3 mr-1.5" />
                    {isConnecting ? 'LINKING...' : 'CONNECT'}
                  </Button>
                )
              )}
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
