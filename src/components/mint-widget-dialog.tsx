/**
 * MintWidgetDialog Component
 * 
 * Modal dialog that displays the external NFT minting widget.
 * Opens when user clicks the MINT button to mint NFTs from the launchpad.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MintWidgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MintWidgetDialog({
  isOpen,
  onClose
}: MintWidgetDialogProps) {
  // Widget URL with hideBanner parameter
  const widgetUrl = 'https://0xae737f85f7b9de4494e81b9b9cd7c75e9279b105_33139.nfts2.me/?widget=classic&hideBanner=true';

  // Open in new tab
  const handleOpenInNewTab = () => {
    window.open(widgetUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl pointer-events-auto"
            >
              {/* Cyberpunk Panel */}
              <div
                className="cyber-panel rounded-xl relative overflow-hidden"
                style={{
                  boxShadow: '0 0 40px hsl(270 100% 60% / 0.4), inset 0 0 30px rgba(0, 0, 0, 0.5)',
                  background: 'hsl(240 15% 6%)'
                }}
              >
                {/* Animated Border Glow */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 border-2 border-neon-purple rounded-xl pointer-events-none"
                  style={{ boxShadow: '0 0 30px hsl(270 100% 60% / 0.6)' }}
                />

                {/* Header */}
                <div className="relative bg-cyber-darker/90 backdrop-blur-sm border-b border-neon-purple/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className="w-10 h-10 rounded-lg bg-neon-purple/20 border border-neon-purple/50 flex items-center justify-center"
                      >
                        <div className="w-6 h-6 border-4 border-neon-purple border-t-transparent rounded-full" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold text-white font-cyber tracking-wider">
                          NFT MINTING
                        </h2>
                        <p className="text-sm text-neon-purple font-mono uppercase tracking-wider">
                          External Launchpad
                        </p>
                      </div>
                    </div>

                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="w-10 h-10 rounded-lg bg-neon-pink/20 border border-neon-pink/50 flex items-center justify-center hover:bg-neon-pink/30 transition-colors"
                      style={{ boxShadow: '0 0 15px hsl(330 100% 60% / 0.3)' }}
                    >
                      <X className="w-5 h-5 text-neon-pink" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Info Banner */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neon-purple/10 border border-neon-purple/30 rounded-lg p-4"
                  >
                    <p className="text-terminal-text text-sm font-mono leading-relaxed">
                      You're about to access the <span className="text-neon-purple font-bold">NFT Minting Launchpad</span>.
                      The widget will open in a new browser tab where you can mint your NFTs directly on-chain.
                    </p>
                  </motion.div>

                  {/* Widget Preview (Iframe) with black background */}
                  <div 
                    className="relative rounded-lg overflow-hidden border-2 border-neon-purple/50" 
                    style={{ 
                      boxShadow: '0 0 20px hsl(270 100% 60% / 0.3), inset 0 0 20px rgba(0, 0, 0, 0.7)',
                      background: '#000000'
                    }}
                  >
                    <iframe
                      id='iframe-widget'
                      src={widgetUrl}
                      className="w-full h-[515px] border-none"
                      title="NFT Minting Widget"
                      style={{
                        background: 'transparent',
                        colorScheme: 'dark'
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleOpenInNewTab}
                      className="flex-1 cyber-button bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple border-2 border-neon-purple h-12 text-sm uppercase tracking-wider font-cyber"
                      style={{ boxShadow: '0 0 20px hsl(270 100% 60% / 0.3)' }}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Open in New Tab
                    </Button>
                    
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1 h-12 text-sm uppercase tracking-wider font-cyber border-2 border-cyber-border/50 hover:border-neon-pink/50 hover:text-neon-pink"
                    >
                      Cancel
                    </Button>
                  </div>

                  {/* Technical Info */}
                  <div className="text-xs text-terminal-dim font-mono text-center space-y-1">
                    <p>Contract: 0xae737f85f7b9de4494e81b9b9cd7c75e9279b105</p>
                    <p>Network: ApeChain (Chain ID: 33139)</p>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-purple rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-purple rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-purple rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-purple rounded-br-xl" />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
