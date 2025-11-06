/**
 * ControlPad Component
 * 
 * Ultra-premium HD control interface with professional-grade design.
 * Features a realistic cartridge slot and industrial start/stop button in a unified layout.
 * Enhanced with vibrant colors, particle effects, and improved visibility.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Power, Trophy, HelpCircle, AlertCircle, Zap, Shield, Cpu, Activity } from 'lucide-react';
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
        {/* Floating Particles Inside Control Panel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-neon-cyan' : i % 3 === 1 ? 'bg-neon-green' : 'bg-neon-purple'
              }`}
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0,
              }}
              animate={{
                y: [null, (Math.random() - 0.5) * 200 + '%'],
                x: [null, (Math.random() - 0.5) * 100 + '%'],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Top Status Bar with Enhanced Indicators */}
        <div className="mb-8 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            {/* System Status */}
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
            
            {/* Connection Indicator */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-neon-green/10 border border-neon-green/30"
              >
                <Activity className="w-3 h-3 text-neon-green" />
                <span className="text-[9px] text-neon-green uppercase tracking-wider font-bold">
                  CONNECTED
                </span>
              </motion.div>
            )}
          </div>
          <div className="text-[9px] text-terminal-dim/40 uppercase tracking-[0.25em] font-mono">
            NEURAL INTERFACE v2.0
          </div>
        </div>

        {/* PRIMARY CONTROL ROW - Insert Slot + Start Button */}
        <div className="grid grid-cols-[1.5fr,1fr] gap-6 relative z-10">
          
          {/* NFT CARTRIDGE SLOT - Premium DVD-Style Slot with ENHANCED VISIBILITY */}
          <button
            onClick={onOpenCartridgeSelector}
            disabled={!isConnected}
            className="relative group disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div 
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
                loadedCartridge 
                  ? 'bg-gradient-to-br from-cyan-900/70 via-cyan-800/50 to-cyan-900/70' 
                  : 'bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-purple-900/50 group-hover:from-purple-900/70 group-hover:via-purple-800/50 group-hover:to-purple-900/70'
              }`}
              style={{
                boxShadow: loadedCartridge 
                  ? `
                      0 0 50px hsl(180 100% 50% / 0.4),
                      0 15px 40px rgba(0, 0, 0, 0.8),
                      inset 0 2px 30px rgba(0, 0, 0, 0.9),
                      inset 0 -2px 20px hsl(180 100% 50% / 0.3)
                    `
                  : `
                      0 0 30px hsl(270 100% 50% / 0.2),
                      0 10px 30px rgba(0, 0, 0, 0.7),
                      inset 0 2px 25px rgba(0, 0, 0, 0.9),
                      inset 0 -2px 15px hsl(270 100% 50% / 0.1)
                    `
              }}
            >
              {/* Glow Border Animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: loadedCartridge
                    ? [
                        '0 0 0 2px hsl(180 100% 50% / 0.4)',
                        '0 0 0 3px hsl(180 100% 50% / 0.6)',
                        '0 0 0 2px hsl(180 100% 50% / 0.4)',
                      ]
                    : [
                        '0 0 0 1px hsl(270 100% 60% / 0.3)',
                        '0 0 0 2px hsl(270 100% 60% / 0.5)',
                        '0 0 0 1px hsl(270 100% 60% / 0.3)',
                      ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

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
                      ${loadedCartridge ? 'inset 0 0 50px hsl(180 100% 50% / 0.3)' : 'inset 0 0 30px hsl(270 100% 60% / 0.15)'}
                    `
                  }}
                >
                  {/* Glowing Guide Rails */}
                  <div 
                    className={`absolute top-2 left-8 right-8 h-[2px] ${
                      loadedCartridge ? 'bg-neon-cyan/60' : 'bg-purple-500/40'
                    }`}
                    style={{
                      boxShadow: loadedCartridge ? '0 0 10px hsl(180 100% 50%)' : '0 0 8px hsl(270 100% 60%)'
                    }}
                  />
                  <div 
                    className={`absolute bottom-2 left-8 right-8 h-[2px] ${
                      loadedCartridge ? 'bg-neon-cyan/60' : 'bg-purple-500/40'
                    }`}
                    style={{
                      boxShadow: loadedCartridge ? '0 0 10px hsl(180 100% 50%)' : '0 0 8px hsl(270 100% 60%)'
                    }}
                  />
                  
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
                              '0 0 40px hsl(180 100% 50% / 0.8)',
                              '0 0 20px hsl(180 100% 50% / 0.5)',
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-3 rounded-lg bg-neon-cyan/30 border-2 border-neon-cyan"
                        >
                          <Shield className="w-6 h-6 text-neon-cyan drop-shadow-[0_0_10px_rgba(0,255,255,1)]" />
                        </motion.div>
                        <div className="text-left">
                          <div className="text-xs text-neon-cyan uppercase tracking-wider font-bold mb-1 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
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
                      /* Empty Slot - More Visible */
                      <div className="flex items-center gap-3 text-purple-300 group-hover:text-purple-200 transition-colors">
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                          className="text-3xl drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                        >
                          ▶
                        </motion.div>
                        <div className="text-left">
                          <div className="text-sm uppercase tracking-wider font-black mb-0.5 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
                            INSERT NFT
                          </div>
                          <div className="text-[10px] uppercase tracking-widest opacity-80">
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
                        background: 'linear-gradient(90deg, transparent, hsl(180 100% 50% / 0.4), transparent)'
                      }}
                    />
                  )}
                </div>

                {/* Bottom Label - Enhanced */}
                <div className="mt-3 text-center">
                  <div className={`text-[9px] uppercase tracking-[0.15em] font-mono ${
                    loadedCartridge 
                      ? 'text-neon-cyan/70' 
                      : 'text-purple-300/60'
                  }`}>
                    {loadedCartridge 
                      ? '🔒 Authentication Verified' 
                      : isConnected 
                        ? '👉 Select NFT From Wallet'
                        : '⚠️ Connect Wallet First'}
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* START / STOP BUTTON - ULTRA VISIBLE GREEN */}
          <motion.button
            whileHover={isConnected && loadedCartridge ? { scale: 1.05 } : {}}
            whileTap={isConnected && loadedCartridge ? { scale: 0.95 } : {}}
            onClick={onToggleMining}
            disabled={!isConnected || !loadedCartridge}
            className="relative disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div 
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                isMining 
                  ? 'bg-gradient-to-br from-red-900/80 via-red-800/60 to-red-900/80' 
                  : 'bg-gradient-to-br from-green-900/80 via-green-800/60 to-green-900/80'
              }`}
              style={{
                boxShadow: isMining 
                  ? `
                      0 0 80px hsl(0 100% 50% / 0.5),
                      0 20px 50px rgba(0, 0, 0, 0.9),
                      inset 0 2px 30px rgba(0, 0, 0, 0.9),
                      inset 0 -3px 25px hsl(0 100% 50% / 0.4)
                    `
                  : isConnected && loadedCartridge
                    ? `
                        0 0 80px hsl(120 100% 50% / 0.6),
                        0 20px 50px rgba(0, 0, 0, 0.9),
                        inset 0 2px 30px rgba(0, 0, 0, 0.9),
                        inset 0 -3px 25px hsl(120 100% 50% / 0.5)
                      `
                    : `
                        0 10px 30px rgba(0, 0, 0, 0.7),
                        inset 0 2px 25px rgba(0, 0, 0, 0.9)
                      `
              }}
            >
              {/* Pulsing Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: (isConnected && loadedCartridge)
                    ? isMining
                      ? [
                          '0 0 0 3px hsl(0 100% 50% / 0.6)',
                          '0 0 0 5px hsl(0 100% 50% / 0.9)',
                          '0 0 0 3px hsl(0 100% 50% / 0.6)',
                        ]
                      : [
                          '0 0 0 3px hsl(120 100% 50% / 0.6)',
                          '0 0 0 6px hsl(120 100% 50% / 0.9)',
                          '0 0 0 3px hsl(120 100% 50% / 0.6)',
                        ]
                    : ['0 0 0 0px transparent'],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              {/* Radial Pulse Effect */}
              <AnimatePresence>
                {(isConnected && loadedCartridge) && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [1, 2, 3],
                        opacity: [0.6, 0.3, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`absolute inset-0 rounded-2xl ${
                        isMining ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [1, 2, 3],
                        opacity: [0.6, 0.3, 0]
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                      className={`absolute inset-0 rounded-2xl ${
                        isMining ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    />
                  </>
                )}
              </AnimatePresence>

              <div className="relative p-6 flex flex-col items-center justify-center h-full">
                {/* Power Icon with Extra Glow */}
                <motion.div
                  animate={isMining || (isConnected && loadedCartridge) ? {
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`mb-3 p-4 rounded-full transition-all ${
                    isMining 
                      ? 'bg-red-500/50 border-4 border-red-300' 
                      : 'bg-green-500/50 border-4 border-green-300'
                  }`}
                  style={{
                    boxShadow: isMining 
                      ? `
                          0 0 40px hsl(0 100% 50%),
                          0 0 80px hsl(0 100% 50% / 0.6),
                          inset 0 2px 20px rgba(0, 0, 0, 0.8),
                          inset 0 -2px 15px hsl(0 100% 50% / 0.6)
                        `
                      : isConnected && loadedCartridge
                        ? `
                            0 0 40px hsl(120 100% 50%),
                            0 0 80px hsl(120 100% 50% / 0.6),
                            inset 0 2px 20px rgba(0, 0, 0, 0.8),
                            inset 0 -2px 15px hsl(120 100% 50% / 0.6)
                          `
                        : 'inset 0 2px 15px rgba(0, 0, 0, 0.9)'
                  }}
                >
                  <Power className={`w-12 h-12 ${
                    isMining ? 'text-red-100' : 'text-green-100'
                  }`} 
                  style={{
                    filter: 'drop-shadow(0 0 10px currentColor)'
                  }}
                  />
                </motion.div>
                
                {/* Button Label with Enhanced Text Glow */}
                <div className="text-center">
                  <motion.div 
                    animate={(isConnected && loadedCartridge) ? {
                      textShadow: isMining
                        ? [
                            '0 0 20px hsl(0 100% 50%), 0 0 40px hsl(0 100% 50% / 0.8)',
                            '0 0 30px hsl(0 100% 50%), 0 0 60px hsl(0 100% 50% / 1)',
                            '0 0 20px hsl(0 100% 50%), 0 0 40px hsl(0 100% 50% / 0.8)',
                          ]
                        : [
                            '0 0 20px hsl(120 100% 50%), 0 0 40px hsl(120 100% 50% / 0.8)',
                            '0 0 30px hsl(120 100% 50%), 0 0 60px hsl(120 100% 50% / 1)',
                            '0 0 20px hsl(120 100% 50%), 0 0 40px hsl(120 100% 50% / 0.8)',
                          ]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`text-3xl font-black uppercase tracking-widest ${
                      isMining ? 'text-red-100' : 'text-green-100'
                    }`}
                  >
                    {isMining ? 'STOP' : 'START'}
                  </motion.div>
                  <div className={`text-[10px] mt-2 uppercase tracking-[0.25em] font-bold ${
                    isMining ? 'text-red-300/80' : 'text-green-300/80'
                  }`}>
                    {isMining ? '🛑 Abort Crack' : '⚡ Data Crack'}
                  </div>
                </div>

                {/* Sound Effect Indicator */}
                {(isConnected && loadedCartridge) && (
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute bottom-2 right-2 flex items-center gap-1"
                  >
                    <Zap className={`w-3 h-3 ${isMining ? 'text-red-400' : 'text-green-400'}`} />
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: [4, 8, 4],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                          className={`w-0.5 rounded-full ${
                            isMining ? 'bg-red-400' : 'bg-green-400'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.button>
        </div>
        </div>

    </div>
  );
}
