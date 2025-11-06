/**
 * ControlPad Component
 * 
 * Ultra-premium HD control interface with professional-grade design.
 * Features a realistic cartridge slot and industrial start/stop button in a unified layout.
 * Designed by 20+ year veteran designer standards.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Power, Trophy, HelpCircle, AlertCircle, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@/lib/wallet';
import { type NFTCartridge } from '@/lib/nft';

interface ControlPadProps {
  isConnected: boolean;
  isConnecting: boolean;
  address: string;
  isMining: boolean;
  loadedCartridge: NFTCartridge | null;
  isCorrectNetwork?: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onToggleMining: () => void;
  onOpenCartridgeSelector: () => void;
  onOpenLeaderboard: () => void;
  onOpenGuide: () => void;
  onSwitchNetwork?: () => void;
}

export function ControlPad({
  isConnected,
  isConnecting,
  address,
  isMining,
  loadedCartridge,
  isCorrectNetwork = true,
  onConnect,
  onDisconnect,
  onToggleMining,
  onOpenCartridgeSelector,
  onOpenLeaderboard,
  onOpenGuide,
  onSwitchNetwork,
}: ControlPadProps) {
  return (
    <div className="space-y-6">
      {/* Wrong Network Warning - Sleek Alert */}
      <AnimatePresence>
        {isConnected && !isCorrectNetwork && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative rounded-2xl p-4 bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50 border-2 border-red-500/50"
            style={{
              boxShadow: '0 0 30px hsl(0 100% 50% / 0.2), inset 0 1px 20px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-red-400 uppercase tracking-wide">Wrong Network</div>
                  <div className="text-xs text-red-300/70 mt-0.5">Switch to ApeChain to continue</div>
                </div>
              </div>
              {onSwitchNetwork && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSwitchNetwork}
                  className="px-4 py-2 rounded-lg bg-red-500/30 hover:bg-red-500/40 text-red-300 text-sm font-bold uppercase tracking-wide transition-all"
                >
                  Switch
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTROL UNIT - Professional HD Design */}
      <div 
        className="relative p-8 rounded-3xl bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-panel"
        style={{
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.8),
            0 0 80px rgba(0, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.03),
            inset 0 -1px 20px rgba(0, 0, 0, 0.9)
          `
        }}
      >
        {/* Top Status Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-2 h-2 rounded-full ${loadedCartridge ? 'bg-neon-cyan' : 'bg-cyber-border'}`}
                style={{
                  boxShadow: loadedCartridge ? '0 0 10px hsl(180 100% 50%)' : 'none'
                }}
              />
              <span className="text-[10px] text-terminal-dim/60 uppercase tracking-[0.2em] font-mono">
                {loadedCartridge ? 'SYSTEM READY' : 'STANDBY MODE'}
              </span>
            </div>
          </div>
          <div className="text-[9px] text-terminal-dim/40 uppercase tracking-[0.25em] font-mono">
            NEURAL INTERFACE v2.0
          </div>
        </div>

        {/* PRIMARY CONTROL ROW - Insert Slot + Start Button */}
        <div className="grid grid-cols-[1.5fr,1fr] gap-6">
          
          {/* NFT CARTRIDGE SLOT - Premium DVD-Style Slot */}
          <button
            onClick={onOpenCartridgeSelector}
            disabled={!isConnected}
            className="relative group disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div 
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                loadedCartridge 
                  ? 'bg-gradient-to-br from-cyan-950/40 via-cyan-900/20 to-cyan-950/40' 
                  : 'bg-gradient-to-br from-gray-950/60 via-gray-900/40 to-gray-950/60 group-hover:from-purple-950/30 group-hover:via-purple-900/20 group-hover:to-purple-950/30'
              }`}
              style={{
                boxShadow: loadedCartridge 
                  ? `
                      0 0 40px hsl(180 100% 50% / 0.2),
                      0 10px 30px rgba(0, 0, 0, 0.7),
                      inset 0 2px 20px rgba(0, 0, 0, 0.9),
                      inset 0 -2px 15px hsl(180 100% 50% / 0.15)
                    `
                  : `
                      0 8px 25px rgba(0, 0, 0, 0.7),
                      inset 0 2px 20px rgba(0, 0, 0, 0.9),
                      inset 0 -2px 8px rgba(255, 255, 255, 0.02)
                    `
              }}
            >
              {/* Slot Opening - DVD/Cartridge Style */}
              <div className="p-6">
                {/* Slot Guide - Horizontal Opening */}
                <div 
                  className="relative h-20 rounded-lg overflow-hidden"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.9))',
                    boxShadow: `
                      inset 0 6px 20px rgba(0, 0, 0, 1),
                      inset 0 -3px 15px rgba(0, 0, 0, 0.8),
                      ${loadedCartridge ? 'inset 0 0 40px hsl(180 100% 50% / 0.2)' : ''}
                    `
                  }}
                >
                  {/* Top Guide Rail */}
                  <div className="absolute top-2 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyber-border/40 to-transparent" />
                  
                  {/* Bottom Guide Rail */}
                  <div className="absolute bottom-2 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyber-border/40 to-transparent" />
                  
                  {/* Cartridge Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {loadedCartridge ? (
                      /* Loaded Cartridge Display */
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-4 px-6"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 20px hsl(180 100% 50% / 0.5)',
                              '0 0 30px hsl(180 100% 50% / 0.7)',
                              '0 0 20px hsl(180 100% 50% / 0.5)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-3 rounded-lg bg-neon-cyan/20 border-2 border-neon-cyan"
                        >
                          <Shield className="w-6 h-6 text-neon-cyan" />
                        </motion.div>
                        <div className="text-left">
                          <div className="text-xs text-neon-cyan uppercase tracking-wider font-bold mb-1">
                            ✓ NFT LOADED
                          </div>
                          <div className="text-sm text-white font-bold tracking-wide">
                            {loadedCartridge.name}
                          </div>
                          <div className="text-xs text-neon-cyan/70 font-mono mt-0.5">
                            TOKEN #{loadedCartridge.tokenId}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Empty Slot */
                      <div className="flex items-center gap-3 text-terminal-dim/60 group-hover:text-purple-400/80 transition-colors">
                        <motion.div
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          className="text-2xl"
                        >
                          ▶
                        </motion.div>
                        <div className="text-left">
                          <div className="text-xs uppercase tracking-wider font-bold mb-0.5">
                            INSERT NFT
                          </div>
                          <div className="text-[10px] uppercase tracking-widest opacity-60">
                            Click to Select
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Holographic Scan Effect */}
                  {loadedCartridge && (
                    <motion.div
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute inset-y-0 w-20"
                      style={{
                        background: 'linear-gradient(90deg, transparent, hsl(180 100% 50% / 0.3), transparent)'
                      }}
                    />
                  )}
                </div>

                {/* Bottom Label */}
                <div className="mt-3 text-center">
                  <div className="text-[9px] text-terminal-dim/50 uppercase tracking-[0.15em] font-mono">
                    {loadedCartridge 
                      ? 'Authentication Verified' 
                      : isConnected 
                        ? 'Select NFT From Wallet'
                        : 'Connect Wallet First'}
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* START / STOP BUTTON - Industrial Power Button */}
          <motion.button
            whileHover={isConnected && loadedCartridge ? { scale: 1.03 } : {}}
            whileTap={isConnected && loadedCartridge ? { scale: 0.97 } : {}}
            onClick={onToggleMining}
            disabled={!isConnected || !loadedCartridge}
            className="relative disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div 
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                isMining 
                  ? 'bg-gradient-to-br from-red-950/60 via-red-900/40 to-red-950/60' 
                  : 'bg-gradient-to-br from-green-950/60 via-green-900/40 to-green-950/60'
              }`}
              style={{
                boxShadow: isMining 
                  ? `
                      0 0 60px hsl(0 100% 50% / 0.3),
                      0 15px 40px rgba(0, 0, 0, 0.8),
                      inset 0 2px 25px rgba(0, 0, 0, 0.9),
                      inset 0 -3px 20px hsl(0 100% 50% / 0.2)
                    `
                  : isConnected && loadedCartridge
                    ? `
                        0 0 60px hsl(120 100% 50% / 0.3),
                        0 15px 40px rgba(0, 0, 0, 0.8),
                        inset 0 2px 25px rgba(0, 0, 0, 0.9),
                        inset 0 -3px 20px hsl(120 100% 50% / 0.2)
                      `
                    : `
                        0 10px 30px rgba(0, 0, 0, 0.7),
                        inset 0 2px 25px rgba(0, 0, 0, 0.9)
                      `
              }}
            >
              {/* Pulsing Background Effect */}
              <AnimatePresence>
                {(isConnected && loadedCartridge) && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.3, 1.6],
                      opacity: [0.4, 0.2, 0]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 rounded-2xl ${
                      isMining ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  />
                )}
              </AnimatePresence>

              <div className="relative p-6 flex flex-col items-center justify-center h-full">
                {/* Power Icon */}
                <motion.div
                  animate={isMining || (isConnected && loadedCartridge) ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`mb-3 p-4 rounded-full transition-all ${
                    isMining 
                      ? 'bg-red-500/30 border-2 border-red-400' 
                      : 'bg-green-500/30 border-2 border-green-400'
                  }`}
                  style={{
                    boxShadow: isMining 
                      ? `
                          0 0 30px hsl(0 100% 50% / 0.7),
                          inset 0 2px 15px rgba(0, 0, 0, 0.8),
                          inset 0 -2px 10px hsl(0 100% 50% / 0.4)
                        `
                      : isConnected && loadedCartridge
                        ? `
                            0 0 30px hsl(120 100% 50% / 0.7),
                            inset 0 2px 15px rgba(0, 0, 0, 0.8),
                            inset 0 -2px 10px hsl(120 100% 50% / 0.4)
                          `
                        : 'inset 0 2px 15px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  <Power className={`w-10 h-10 ${
                    isMining ? 'text-red-300' : 'text-green-300'
                  }`} />
                </motion.div>
                
                {/* Button Label */}
                <div className="text-center">
                  <div 
                    className={`text-2xl font-black uppercase tracking-wider ${
                      isMining ? 'text-red-300' : 'text-green-300'
                    }`}
                    style={{
                      textShadow: isMining 
                        ? '0 0 20px hsl(0 100% 50%), 0 0 40px hsl(0 100% 50% / 0.5)'
                        : '0 0 20px hsl(120 100% 50%), 0 0 40px hsl(120 100% 50% / 0.5)'
                    }}
                  >
                    {isMining ? 'STOP' : 'START'}
                  </div>
                  <div className={`text-[9px] mt-1.5 uppercase tracking-[0.2em] ${
                    isMining ? 'text-red-400/70' : 'text-green-400/70'
                  }`}>
                    {isMining ? 'Abort Crack' : 'Data Crack'}
                  </div>
                </div>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Secondary Actions Row */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {/* Wallet Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={isConnected ? onDisconnect : onConnect}
            disabled={isConnecting}
            className="relative group"
          >
            <div 
              className="relative p-4 rounded-xl bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-purple-950/40 group-hover:from-purple-950/60 group-hover:via-purple-900/40 group-hover:to-purple-950/60 transition-all"
              style={{
                boxShadow: `
                  0 4px 15px rgba(0, 0, 0, 0.6),
                  inset 0 1px 15px rgba(0, 0, 0, 0.8)
                `
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <Wallet className="w-5 h-5 text-purple-400" />
                <div className="text-xs text-purple-300 uppercase tracking-wide font-bold">
                  {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect'}
                </div>
                {isConnected && (
                  <div className="text-[9px] text-purple-400/60 font-mono">
                    {formatAddress(address)}
                  </div>
                )}
              </div>
            </div>
          </motion.button>

          {/* Leaderboard Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenLeaderboard}
            className="relative group"
          >
            <div 
              className="relative p-4 rounded-xl bg-gradient-to-br from-yellow-950/40 via-yellow-900/20 to-yellow-950/40 group-hover:from-yellow-950/60 group-hover:via-yellow-900/40 group-hover:to-yellow-950/60 transition-all"
              style={{
                boxShadow: `
                  0 4px 15px rgba(0, 0, 0, 0.6),
                  inset 0 1px 15px rgba(0, 0, 0, 0.8)
                `
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <div className="text-xs text-yellow-300 uppercase tracking-wide font-bold">
                  Rankings
                </div>
              </div>
            </div>
          </motion.button>

          {/* Guide Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenGuide}
            className="relative group"
          >
            <div 
              className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-cyan-900/20 to-cyan-950/40 group-hover:from-cyan-950/60 group-hover:via-cyan-900/40 group-hover:to-cyan-950/60 transition-all"
              style={{
                boxShadow: `
                  0 4px 15px rgba(0, 0, 0, 0.6),
                  inset 0 1px 15px rgba(0, 0, 0, 0.8)
                `
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <div className="text-xs text-cyan-300 uppercase tracking-wide font-bold">
                  Guide
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
