/**
 * ControlPad Component
 * 
 * Cyberpunk-style control interface with action panel and hacking controls.
 * Handles wallet connection, ICE breaker management, and data mining controls.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Power, Cpu, Shield, Trophy, Zap, HelpCircle, ArrowRight, Box } from 'lucide-react';
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
    <div className="space-y-4">
      {/* Wrong Network Warning */}
      {isConnected && !isCorrectNetwork && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neon-pink/20 backdrop-blur-sm rounded-lg p-3 border-2 border-neon-pink relative overflow-hidden"
          style={{ boxShadow: '0 0 20px hsl(330 100% 60% / 0.3)' }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-neon-pink/10"
          />
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Shield className="w-5 h-5 text-neon-pink" />
              </motion.div>
              <div>
                <div className="text-xs font-bold text-neon-pink uppercase tracking-wider font-cyber">
                  Wrong Network
                </div>
                <div className="text-[10px] text-terminal-text font-mono">
                  Please switch to ApeChain
                </div>
              </div>
            </div>
            {onSwitchNetwork && (
              <Button
                onClick={onSwitchNetwork}
                size="sm"
                className="bg-neon-pink/30 hover:bg-neon-pink/50 text-neon-pink border border-neon-pink/50 text-xs font-cyber uppercase"
              >
                Switch
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {/* Main Control Section - ICE Breaker Slot + Data Crack Button */}
      <div className="flex items-stretch gap-3">
        {/* ICE Breaker Insertion Slot */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenCartridgeSelector}
          disabled={!isConnected}
          className={`flex-1 relative overflow-hidden rounded-lg p-4 border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            loadedCartridge 
              ? 'border-neon-cyan bg-cyber-panel' 
              : 'border-cyber-border/50 bg-cyber-darker hover:border-neon-purple/60'
          }`}
          style={{
            boxShadow: loadedCartridge 
              ? '0 0 25px hsl(180 100% 50% / 0.4), inset 0 0 20px hsl(180 100% 50% / 0.15)'
              : 'inset 0 2px 8px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Cartridge Slot Effect - Makes it look like an insertion port */}
          <div className={`absolute inset-0 pointer-events-none ${
            loadedCartridge ? 'holographic opacity-20' : 'bg-gradient-to-b from-transparent via-cyber-border/10 to-cyber-border/20'
          }`} />
          
          {/* Slot Top Edge - Makes it look like something can slide in */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${
            loadedCartridge ? 'bg-neon-cyan' : 'bg-cyber-border/30'
          }`} style={{
            boxShadow: loadedCartridge ? '0 2px 10px hsl(180 100% 50% / 0.6)' : 'none'
          }} />
          
          {/* Slot Guide Rails */}
          <div className={`absolute left-3 top-0 bottom-0 w-[2px] ${
            loadedCartridge ? 'bg-neon-cyan/40' : 'bg-cyber-border/20'
          }`} />
          <div className={`absolute right-3 top-0 bottom-0 w-[2px] ${
            loadedCartridge ? 'bg-neon-cyan/40' : 'bg-cyber-border/20'
          }`} />
          
          <div className="relative z-10 flex items-center gap-3">
            {/* Cartridge Icon Container - Looks like a physical slot */}
            <div className={`p-3 rounded-lg border-2 transition-all ${
              loadedCartridge 
                ? 'bg-neon-cyan/20 border-neon-cyan/60 shadow-neon-cyan' 
                : 'bg-cyber-darker border-cyber-border/30'
            }`}>
              <Box className={`w-6 h-6 transition-all ${
                loadedCartridge ? 'text-neon-cyan' : 'text-terminal-dim'
              }`} />
            </div>
            
            <div className="text-left flex-1">
              <div className="text-[10px] text-terminal-dim uppercase tracking-[0.25em] font-cyber mb-1">
                {loadedCartridge ? 'ICE BREAKER LOADED' : 'INSERT ICE BREAKER'}
              </div>
              <div className={`text-sm font-bold font-cyber tracking-wider transition-colors ${
                loadedCartridge ? 'text-white' : 'text-terminal-dim'
              }`}>
                {loadedCartridge ? loadedCartridge.name : 'EMPTY SLOT'}
              </div>
              {loadedCartridge && (
                <div className="text-[10px] text-neon-cyan font-mono mt-1">
                  TOKEN #{loadedCartridge.tokenId}
                </div>
              )}
            </div>
            
            {/* Status LED */}
            <div className={`w-3 h-3 rounded-full transition-all ${
              loadedCartridge ? 'bg-neon-cyan animate-pulse' : 'bg-cyber-border/50'
            }`} style={{
              boxShadow: loadedCartridge ? '0 0 12px hsl(180 100% 50%)' : 'none'
            }} />
          </div>
          
          {/* Click to Insert Indicator */}
          {!loadedCartridge && isConnected && (
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-terminal-dim/40"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          )}
        </motion.button>

        {/* Data Crack Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleMining}
          disabled={!isConnected || !loadedCartridge}
          className={`flex-1 relative group overflow-hidden rounded-lg p-6 border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            isMining 
              ? 'border-neon-pink bg-neon-pink/20' 
              : 'border-neon-cyan bg-cyber-panel hover:border-neon-cyan/80'
          }`}
          style={{
            boxShadow: isMining 
              ? '0 0 30px hsl(330 100% 60% / 0.4), inset 0 0 20px hsl(330 100% 60% / 0.2)'
              : isConnected && loadedCartridge
                ? '0 0 20px hsl(180 100% 50% / 0.2)'
                : 'none'
          }}
        >
          {/* Animated Background */}
          {isMining && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-neon-pink/20 rounded-lg"
            />
          )}
          
          <div className="relative z-10 flex items-center justify-center gap-3">
            <Power className={`w-6 h-6 ${isMining ? 'text-neon-pink' : 'text-neon-cyan'}`} />
            <div className="text-left">
              <div className="text-xs text-terminal-dim uppercase tracking-[0.2em] font-cyber">
                Primary Action
              </div>
              <div className={`text-2xl font-bold font-cyber tracking-wider ${
                isMining ? 'text-neon-pink' : 'text-neon-cyan'
              }`}>
                {isMining ? 'ABORT CRACK' : 'DATA CRACK'}
              </div>
            </div>
          </div>
          
          {/* Corner Accents */}
          <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isMining ? 'border-neon-pink' : 'border-neon-cyan'}`} />
          <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isMining ? 'border-neon-pink' : 'border-neon-cyan'}`} />
        </motion.button>
      </div>
    </div>
  );
}
