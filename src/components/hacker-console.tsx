/**
 * HackerConsole Component
 * 
 * Main cyberpunk hacker terminal UI component with worldbuilding elements.
 * Features ghosted watermarks, CPU/GPU utilization, neural sync latency,
 * and immersive cyberpunk lore throughout the interface.
 */

import React, { ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, LogOut, Wallet, Trophy, HelpCircle, Cpu, Activity, Network } from 'lucide-react';
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
  // Simulate CPU/GPU utilization for worldbuilding
  const [cpuUsage, setCpuUsage] = useState(45);
  const [gpuUsage, setGpuUsage] = useState(32);
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(20, Math.min(85, prev + (Math.random() - 0.5) * 10)));
      setGpuUsage(prev => Math.max(15, Math.min(75, prev + (Math.random() - 0.5) * 12)));
      setLatency(prev => Math.max(8, Math.min(45, prev + (Math.random() - 0.5) * 5)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Main Cyber Panel with Center Spotlight */}
      <div className="cyber-panel rounded-lg p-6 shadow-2xl relative overflow-hidden center-spotlight">
        {/* Center Spotlight is added via CSS class */}
        
        {/* Signature Animation - Slow Rotating Ring */}
        <div className="signature-ring" />
        
        {/* Ghosted Watermark Background - Worldbuilding */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none z-0">
          <div className="text-center transform rotate-[-15deg]">
            <div className="text-6xl font-black tracking-widest text-neon-cyan uppercase font-display">
              APECHAIN
            </div>
            <div className="text-2xl font-bold tracking-[0.3em] text-neon-cyan uppercase mt-2 font-mono">
              SECURE NODE 2049
            </div>
            <div className="text-lg tracking-wider text-neon-green uppercase mt-1 font-mono">
              NEURAL NETWORK v3.0
            </div>
          </div>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none z-0" />
        
        {/* Matrix-style Data Pulses - Subtle Background Animation */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent pointer-events-none data-pulse"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 1.2}s`
            }}
          />
        ))}
        
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
              <div className="relative">
                {/* Title with Cyan Underline */}
                <h1 className="text-2xl font-bold text-neon-cyan neon-text font-display tracking-wider relative inline-block">
                  CYBER MINER
                  <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-60" />
                </h1>
                <div className="text-xs text-terminal-text uppercase tracking-widest flex items-center gap-2 font-mono mt-2">
                  <Zap className="w-3 h-3" />
                  <span>Neural Network v3.0</span>
                  {/* Pulsing Signal Dot */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-neon-green ml-1"
                    style={{ boxShadow: '0 0 8px hsl(150 100% 60%)' }}
                  />
                  {/* Signal Strength Indicator */}
                  <div className="flex gap-0.5 ml-1">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: ['8px', '12px', '8px'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="w-0.5 rounded-full bg-neon-green"
                        style={{ opacity: 0.7 }}
                      />
                    ))}
                  </div>
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
                <span className="text-xs text-neon-cyan uppercase tracking-wider group-hover:text-neon-cyan transition-colors font-mono">Follow</span>
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
                  <span className="text-xs text-neon-green uppercase tracking-wider font-mono">Ranks</span>
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
                  <span className="text-xs text-neon-pink uppercase tracking-wider font-mono">Guide</span>
                </motion.button>
              )}
              
              {isConnected && address ? (
                <>
                  <motion.div 
                    animate={{ 
                      boxShadow: [
                        '0 0 10px hsl(180 100% 50% / 0.3)',
                        '0 0 20px hsl(180 100% 50% / 0.5)',
                        '0 0 10px hsl(180 100% 50% / 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 px-3 py-1 rounded border border-neon-cyan/50 bg-cyber-panel/50"
                  >
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 10px hsl(180 100% 50%)',
                          '0 0 15px hsl(180 100% 50%)',
                          '0 0 10px hsl(180 100% 50%)'
                        ]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-neon-cyan" 
                    />
                    <span className="text-xs text-neon-cyan font-mono">{formatAddress(address)}</span>
                  </motion.div>
                  
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
                    className="cyber-button bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan text-xs uppercase tracking-wider font-mono px-4 py-1 h-auto"
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

        {/* System Metrics Bar - Enhanced Chip Containers */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between gap-3 bg-cyber-darker/50 rounded-lg p-3 border border-cyber-border/30 module-shadow">
            {/* CPU Utilization - Chip Style */}
            <div className="chip-container flex items-center gap-2">
              <Cpu className="w-3 h-3 text-neon-cyan" />
              <div className="text-[10px] font-mono">
                <span className="text-terminal-dim/70 uppercase tracking-wider">CPU</span>
                <span className="text-neon-cyan ml-1.5 font-bold">{cpuUsage.toFixed(0)}%</span>
              </div>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: cpuUsage > (i * 20) ? '12px' : '4px',
                      backgroundColor: cpuUsage > (i * 20) 
                        ? 'hsl(180 100% 50%)' 
                        : 'hsl(180 100% 50% / 0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-0.5 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* GPU Utilization - Chip Style */}
            <div className="chip-container flex items-center gap-2">
              <Activity className="w-3 h-3 text-neon-green" />
              <div className="text-[10px] font-mono">
                <span className="text-terminal-dim/70 uppercase tracking-wider">GPU</span>
                <span className="text-neon-green ml-1.5 font-bold">{gpuUsage.toFixed(0)}%</span>
              </div>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: gpuUsage > (i * 20) ? '12px' : '4px',
                      backgroundColor: gpuUsage > (i * 20) 
                        ? 'hsl(150 100% 60%)' 
                        : 'hsl(150 100% 60% / 0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-0.5 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Neural Sync Latency - Chip Style with Dynamic Colors */}
            <div className="chip-container flex items-center gap-2">
              <Network className="w-3 h-3 text-neon-purple" />
              <div className="text-[10px] font-mono">
                <span className="text-terminal-dim/70 uppercase tracking-wider">Latency</span>
                <motion.span 
                  animate={{
                    color: latency < 15 ? 'hsl(150 100% 60%)' : latency < 30 ? 'hsl(45 100% 55%)' : 'hsl(0 100% 60%)'
                  }}
                  className="ml-1.5 font-bold"
                >
                  {latency.toFixed(0)}ms
                </motion.span>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-1.5 h-1.5 rounded-full ${
                  latency < 15 ? 'bg-neon-green' : latency < 30 ? 'bg-neon-yellow' : 'bg-neon-pink'
                }`}
                style={{
                  boxShadow: latency < 15 
                    ? '0 0 8px hsl(150 100% 60%)' 
                    : latency < 30 
                      ? '0 0 8px hsl(45 100% 55%)'
                      : '0 0 8px hsl(0 100% 60%)'
                }}
              />
            </div>

            {/* Node ID - Chip Style */}
            <div className="chip-container text-[10px] font-mono text-terminal-dim/50 tracking-wider">
              NODE_<span className="text-neon-cyan/60">APE-2049</span>
            </div>
          </div>
        </div>

        {/* Main Screen Container with Enhanced Depth */}
        <div className="relative z-10 bg-cyber-darker rounded-lg p-4 mb-6 shadow-cyber-inset border border-cyber-border/50 module-shadow-lg">
          <div className="cyber-screen rounded-lg p-6 min-h-[450px] relative overflow-hidden module-shadow-md">
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

        {/* Bottom Status Bar with Enhanced Worldbuilding */}
        <div className="relative z-10 mt-6 pt-4 border-t border-cyber-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* System Status - Dynamic Status Colors */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono">
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-2 h-2 rounded-full ${
                    isConnected 
                      ? 'bg-neon-green' 
                      : 'bg-neon-yellow'
                  }`}
                  style={{ 
                    boxShadow: isConnected 
                      ? '0 0 8px hsl(150 100% 60%)' 
                      : '0 0 8px hsl(45 100% 55%)'
                  }}
                />
                <span className={isConnected ? 'text-neon-green' : 'text-neon-yellow'}>
                  {isConnected ? 'CONNECTED' : 'IDLE'}
                </span>
              </div>
              
              {/* Secure Connection Indicator */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-neon-green/70">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green" 
                     style={{ boxShadow: '0 0 6px hsl(150 100% 60%)' }} />
                <span className="uppercase tracking-wider">Encrypted Link</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-mono">
              <span className="text-terminal-dim/70">ApeChain Network</span>
              <span className="text-neon-cyan/50">•</span>
              <span className="text-terminal-dim/50">Chain ID: 33139</span>
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
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-terminal-dim text-xs uppercase tracking-[0.3em] flex items-center gap-2 font-mono">
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan" />
        <span>Web3 Neural Interface</span>
        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-neon-cyan" />
      </div>
    </motion.div>
  );
}
