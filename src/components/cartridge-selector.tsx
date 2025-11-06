/**
 * CartridgeSelector Component
 * 
 * Cyberpunk modal dialog for selecting and loading ICE Breaker NFTs.
 * Displays user's available hacking programs with preview images and cyber aesthetics.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Shield, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type NFTCartridge } from '@/lib/nft';

interface CartridgeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  cartridges: NFTCartridge[];
  loadedCartridge: NFTCartridge | null;
  isLoading: boolean;
  onSelect: (cartridge: NFTCartridge) => void;
  onEject: () => void;
}

export function CartridgeSelector({
  isOpen,
  onClose,
  cartridges,
  loadedCartridge,
  isLoading,
  onSelect,
  onEject,
}: CartridgeSelectorProps) {
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const handleImageError = (tokenId: string) => {
    console.warn(`[CartridgeSelector] Image failed to load for token ${tokenId}`);
    setImageErrors(prev => ({ ...prev, [tokenId]: true }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="cyber-panel border-2 border-neon-cyan rounded-lg max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl relative"
          style={{ boxShadow: '0 0 50px hsl(180 100% 50% / 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5)' }}
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
          
          {/* Header */}
          <div className="relative z-10 bg-cyber-darker border-b-2 border-neon-cyan/50 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 rounded-lg border-2 border-neon-cyan flex items-center justify-center bg-neon-cyan/10"
                  style={{ boxShadow: '0 0 20px hsl(180 100% 50% / 0.5)' }}
                >
                  <Shield className="w-6 h-6 text-neon-cyan" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-neon-cyan neon-text font-cyber tracking-wider">
                    ICE BREAKERS
                  </h2>
                  <div className="text-xs text-terminal-text uppercase tracking-[0.2em] font-cyber">
                    Neural Hacking Programs
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-terminal-text hover:text-neon-pink hover:bg-neon-pink/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Currently Loaded Program */}
          {loadedCartridge && (
            <div className="relative z-10 bg-terminal-bg/50 border-b border-neon-cyan/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {loadedCartridge.image && !imageErrors[loadedCartridge.tokenId] ? (
                    <div className="relative">
                      <img
                        src={loadedCartridge.image}
                        alt={loadedCartridge.name}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-neon-cyan"
                        style={{ boxShadow: '0 0 15px hsl(180 100% 50% / 0.5)' }}
                        onError={() => handleImageError(loadedCartridge.tokenId)}
                        loading="lazy"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neon-cyan animate-pulse" 
                           style={{ boxShadow: '0 0 10px hsl(180 100% 50%)' }} />
                    </div>
                  ) : loadedCartridge.image ? (
                    <div className="relative w-16 h-16 rounded-lg border-2 border-neon-cyan bg-cyber-darker flex items-center justify-center">
                      <Shield className="w-8 h-8 text-terminal-dim opacity-30" />
                    </div>
                  ) : null}
                  <div>
                    <div className="text-xs text-terminal-dim uppercase tracking-[0.15em] font-cyber">
                      Active Program
                    </div>
                    <div className="text-white font-bold text-lg font-cyber tracking-wide">
                      {loadedCartridge.name}
                    </div>
                    <div className="text-xs text-neon-cyan font-mono">
                      ID: #{loadedCartridge.tokenId}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={onEject}
                  className="bg-neon-pink/20 hover:bg-neon-pink/30 text-neon-pink border border-neon-pink/50 uppercase tracking-wider font-cyber"
                  style={{ boxShadow: '0 0 15px hsl(330 100% 60% / 0.3)' }}
                >
                  EJECT
                </Button>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 p-6 overflow-y-auto max-h-[50vh] scrollbar-thin">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Loader2 className="w-10 h-10 text-neon-cyan animate-spin" />
                <p className="text-terminal-text text-sm uppercase tracking-wider font-cyber">
                  Scanning Neural Network...
                </p>
              </div>
            ) : cartridges.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Cpu className="w-20 h-20 text-terminal-dim opacity-30" />
                <div className="text-center">
                  <p className="text-terminal-text mb-2 font-cyber tracking-wide">
                    No ICE Breakers Found
                  </p>
                  <p className="text-xs text-terminal-dim font-mono">
                    Contract: 0x3322b37...c1d34d25
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cartridges.map((cartridge) => (
                  <motion.button
                    key={cartridge.tokenId}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelect(cartridge);
                      onClose();
                    }}
                    className={`relative overflow-hidden rounded-lg p-4 text-left transition-all group ${
                      loadedCartridge?.tokenId === cartridge.tokenId
                        ? 'border-2 border-neon-cyan bg-neon-cyan/10'
                        : 'border border-cyber-border bg-cyber-panel hover:border-neon-purple'
                    }`}
                    style={{
                      boxShadow: loadedCartridge?.tokenId === cartridge.tokenId
                        ? '0 0 20px hsl(180 100% 50% / 0.4), inset 0 0 15px hsl(180 100% 50% / 0.1)'
                        : 'none'
                    }}
                  >
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {cartridge.image && !imageErrors[cartridge.tokenId] ? (
                        <div className="relative mb-3">
                          <img
                            src={cartridge.image}
                            alt={cartridge.name}
                            className="w-full aspect-square object-cover rounded-lg border border-cyber-border/50"
                            onError={() => handleImageError(cartridge.tokenId)}
                            loading="lazy"
                            crossOrigin="anonymous"
                          />
                          {/* Corner Accents */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-purple" />
                        </div>
                      ) : (
                        <div className="w-full aspect-square bg-cyber-darker rounded-lg mb-3 flex items-center justify-center border border-cyber-border/30">
                          <Shield className="w-12 h-12 text-terminal-dim opacity-30" />
                        </div>
                      )}
                      <h3 className="text-white font-bold mb-1 font-cyber tracking-wide">
                        {cartridge.name}
                      </h3>
                      <p className="text-xs text-terminal-dim font-mono">
                        Token #{cartridge.tokenId}
                      </p>
                      {cartridge.description && (
                        <p className="text-xs text-terminal-text mt-2 line-clamp-2 opacity-80">
                          {cartridge.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Active Indicator */}
                    {loadedCartridge?.tokenId === cartridge.tokenId && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded bg-neon-cyan/20 border border-neon-cyan text-[10px] text-neon-cyan uppercase tracking-wider font-cyber">
                        Active
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative z-10 bg-cyber-darker border-t-2 border-neon-cyan/50 p-4">
            <p className="text-xs text-terminal-dim text-center font-mono">
              ApeChain Contract: 0x3322b37349aefd6f50f7909b641f2177c1d34d25
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
