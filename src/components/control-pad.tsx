/**
 * ControlPad Component
 * 
 * Cyberpunk-style control interface with action panel and hacking controls.
 * Handles wallet connection, ICE breaker management, and data mining controls.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Power, Cpu, Shield, Trophy, Zap } from 'lucide-react';
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
  onToggleMining: () => void;
  onMint: () => void;
  onOpenCartridgeSelector: () => void;
  onOpenLeaderboard: () => void;
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
  onToggleMining,
  onMint,
  onOpenCartridgeSelector,
  onOpenLeaderboard,
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

      {/* Connection Status Panel */}
      <div className="bg-cyber-panel/50 backdrop-blur-sm rounded-lg p-4 border border-cyber-border/50 relative overflow-hidden">
        {/* Animated Background Stripe */}
        {isConnected && (
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent"
          />
        )}
        
        <div className="relative z-10 space-y-3">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  boxShadow: isConnected 
                    ? ['0 0 10px hsl(180 100% 50% / 0.5)', '0 0 20px hsl(180 100% 50% / 0.8)', '0 0 10px hsl(180 100% 50% / 0.5)']
                    : 'none'
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-neon-cyan' : 'bg-neon-pink'
                }`}
              />
              <div>
                <div className="text-[10px] text-terminal-dim uppercase tracking-[0.2em] font-cyber">
                  Neural Link Status
                </div>
                <div className={`text-sm font-bold font-cyber tracking-wider ${
                  isConnected ? 'text-neon-cyan' : 'text-neon-pink'
                }`}>
                  {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </div>
              </div>
            </div>
            {isConnected && (
              <div className="text-terminal-text text-xs font-mono bg-cyber-darker px-3 py-1 rounded border border-cyber-border/30">
                {formatAddress(address)}
              </div>
            )}
          </div>
          
          {/* Network Status */}
          {isConnected && (
            <div className="flex items-center justify-between pt-3 border-t border-cyber-border/30">
              <div className="flex items-center gap-2">
                <Cpu className={`w-3 h-3 ${isCorrectNetwork ? 'text-neon-purple' : 'text-neon-pink animate-pulse'}`} />
                <div>
                  <div className="text-[9px] text-terminal-dim uppercase tracking-[0.2em] font-cyber">
                    Network
                  </div>
                  <div className={`text-xs font-bold font-cyber tracking-wider ${isCorrectNetwork ? 'text-neon-purple' : 'text-neon-pink'}`}>
                    {isCorrectNetwork ? 'ApeChain' : 'WRONG NETWORK'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[9px] text-terminal-dim uppercase tracking-[0.2em] font-cyber">
                    Currency
                  </div>
                  <div className="text-xs font-bold font-cyber tracking-wider text-neon-green">
                    APE
                  </div>
                </div>
                <div className={`text-[9px] text-terminal-dim font-mono px-2 py-1 rounded border ${isCorrectNetwork ? 'bg-cyber-darker border-neon-purple/30' : 'bg-neon-pink/20 border-neon-pink/50'}`}>
                  Chain: 33139
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Control Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Primary Action - Data Crack */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleMining}
          disabled={!isConnected || !loadedCartridge}
          className={`col-span-2 relative group overflow-hidden rounded-lg p-6 border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
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

        {/* Secondary Actions */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onMint}
          disabled={!isConnected || !loadedCartridge}
          className="cyber-button rounded-lg p-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-5 h-5 text-neon-purple" />
            <div className="text-xs text-neon-purple uppercase tracking-wider font-cyber">
              MINT
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenLeaderboard}
          className="cyber-button rounded-lg p-4"
        >
          <div className="flex flex-col items-center gap-2">
            <Trophy className="w-5 h-5 text-neon-green" />
            <div className="text-xs text-neon-green uppercase tracking-wider font-cyber">
              RANKS
            </div>
          </div>
        </motion.button>
      </div>

      {/* ICE Breaker Slot */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onOpenCartridgeSelector}
        disabled={!isConnected}
        className={`w-full relative overflow-hidden rounded-lg p-4 border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
          loadedCartridge 
            ? 'border-neon-cyan bg-cyber-panel' 
            : 'border-cyber-border bg-cyber-darker hover:border-neon-purple'
        }`}
        style={{
          boxShadow: loadedCartridge 
            ? '0 0 20px hsl(180 100% 50% / 0.3), inset 0 0 15px hsl(180 100% 50% / 0.1)'
            : 'none'
        }}
      >
        {/* Holographic Overlay */}
        {loadedCartridge && (
          <div className="absolute inset-0 holographic opacity-30" />
        )}
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${loadedCartridge ? 'bg-neon-cyan/20' : 'bg-cyber-panel'} border ${loadedCartridge ? 'border-neon-cyan/50' : 'border-cyber-border/30'}`}>
              <Shield className={`w-5 h-5 ${loadedCartridge ? 'text-neon-cyan' : 'text-terminal-dim'}`} />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-terminal-dim uppercase tracking-[0.2em] font-cyber">
                ICE Breaker
              </div>
              <div className={`text-sm font-bold font-cyber tracking-wider ${loadedCartridge ? 'text-white' : 'text-terminal-dim'}`}>
                {loadedCartridge ? loadedCartridge.name : 'NO PROGRAM LOADED'}
              </div>
            </div>
          </div>
          {loadedCartridge && (
            <div className="text-neon-cyan text-xs font-mono bg-cyber-darker px-2 py-1 rounded border border-neon-cyan/30">
              #{loadedCartridge.tokenId}
            </div>
          )}
        </div>
        
        {/* Status Indicator */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
          loadedCartridge ? 'bg-neon-cyan animate-pulse' : 'bg-cyber-border'
        }`} style={{
          boxShadow: loadedCartridge ? '0 0 10px hsl(180 100% 50%)' : 'none'
        }} />
      </motion.button>

      {/* Wallet Connect Button */}
      {!isConnected && (
        <Button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full cyber-button bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border-2 border-neon-cyan h-12 text-sm uppercase tracking-wider font-cyber"
          style={{ boxShadow: '0 0 20px hsl(180 100% 50% / 0.3)' }}
        >
          <Wallet className="w-5 h-5 mr-2" />
          {isConnecting ? 'ESTABLISHING NEURAL LINK...' : 'CONNECT WALLET'}
        </Button>
      )}
    </div>
  );
}
