/**
 * WalletSelector Component
 * 
 * Modal dialog for selecting and connecting different Web3 wallets.
 * Detects installed wallets and displays connection options.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Check, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isMetaMaskInstalled } from '@/lib/wallet';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  isInstalled: boolean;
  installUrl?: string;
  description: string;
}

interface WalletSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (walletId: string) => void;
  isConnecting: boolean;
}

export function WalletSelector({
  isOpen,
  onClose,
  onSelectWallet,
  isConnecting
}: WalletSelectorProps) {
  const [walletOptions, setWalletOptions] = useState<WalletOption[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  useEffect(() => {
    // Check for installed wallets
    const checkWallets = () => {
      const metamaskInstalled = isMetaMaskInstalled();
      
      const wallets: WalletOption[] = [
        {
          id: 'metamask',
          name: 'MetaMask',
          icon: '🦊',
          isInstalled: metamaskInstalled,
          installUrl: 'https://metamask.io/download/',
          description: 'Connect with MetaMask wallet'
        },
        {
          id: 'walletconnect',
          name: 'WalletConnect',
          icon: '🔗',
          isInstalled: true, // WalletConnect is always "available" as a protocol
          description: 'Connect with any wallet via WalletConnect'
        },
        {
          id: 'coinbase',
          name: 'Coinbase Wallet',
          icon: '💙',
          isInstalled: !!(window as any).coinbaseWalletExtension,
          installUrl: 'https://www.coinbase.com/wallet',
          description: 'Connect with Coinbase Wallet'
        },
        {
          id: 'trust',
          name: 'Trust Wallet',
          icon: '🛡️',
          isInstalled: !!(window as any).trustwallet,
          installUrl: 'https://trustwallet.com/',
          description: 'Connect with Trust Wallet'
        },
      ];

      setWalletOptions(wallets);
    };

    if (isOpen) {
      checkWallets();
    }
  }, [isOpen]);

  const handleWalletClick = (wallet: WalletOption) => {
    if (!wallet.isInstalled) {
      // Open install page
      if (wallet.installUrl) {
        window.open(wallet.installUrl, '_blank');
      }
      return;
    }

    setSelectedWallet(wallet.id);
    onSelectWallet(wallet.id);
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-cyber-panel rounded-xl border-2 border-cyber-border shadow-2xl overflow-hidden"
              style={{
                boxShadow: '0 0 50px hsl(180 100% 50% / 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Animated Grid Background */}
              <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 p-6 border-b border-cyber-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50">
                      <Wallet className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neon-cyan font-cyber tracking-wider">
                        SELECT WALLET
                      </h3>
                      <p className="text-xs text-terminal-dim uppercase tracking-wider mt-1">
                        Choose your neural interface
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={isConnecting}
                    className="text-terminal-dim hover:text-neon-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {walletOptions.map((wallet) => (
                  <motion.button
                    key={wallet.id}
                    whileHover={{ scale: wallet.isInstalled ? 1.02 : 1.01 }}
                    whileTap={{ scale: wallet.isInstalled ? 0.98 : 1 }}
                    onClick={() => handleWalletClick(wallet)}
                    disabled={isConnecting && selectedWallet !== wallet.id}
                    className={`w-full relative overflow-hidden rounded-lg p-4 border-2 transition-all text-left ${
                      wallet.isInstalled
                        ? selectedWallet === wallet.id && isConnecting
                          ? 'border-neon-cyan bg-neon-cyan/20'
                          : 'border-cyber-border hover:border-neon-cyan bg-cyber-darker'
                        : 'border-cyber-border/30 bg-cyber-darker/30 opacity-60'
                    }`}
                    style={{
                      boxShadow: wallet.isInstalled && selectedWallet === wallet.id && isConnecting
                        ? '0 0 20px hsl(180 100% 50% / 0.4)'
                        : 'none'
                    }}
                  >
                    {/* Holographic effect when selected */}
                    {selectedWallet === wallet.id && isConnecting && (
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{wallet.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold font-cyber tracking-wider ${
                              wallet.isInstalled ? 'text-white' : 'text-terminal-dim'
                            }`}>
                              {wallet.name}
                            </span>
                            {wallet.isInstalled && (
                              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-neon-green/20 border border-neon-green/50">
                                <Check className="w-3 h-3 text-neon-green" />
                                <span className="text-[9px] text-neon-green uppercase tracking-wider font-cyber">
                                  Installed
                                </span>
                              </div>
                            )}
                          </div>
                          <p className={`text-xs mt-1 ${
                            wallet.isInstalled ? 'text-terminal-text' : 'text-terminal-dim'
                          }`}>
                            {wallet.description}
                          </p>
                        </div>
                      </div>
                      
                      {selectedWallet === wallet.id && isConnecting ? (
                        <Loader2 className="w-5 h-5 text-neon-cyan animate-spin" />
                      ) : !wallet.isInstalled ? (
                        <ExternalLink className="w-4 h-4 text-terminal-dim" />
                      ) : null}
                    </div>

                    {/* Corner Accents */}
                    {wallet.isInstalled && (
                      <>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan/50" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan/50" />
                      </>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="relative z-10 p-6 border-t border-cyber-border/50 bg-cyber-darker/50">
                <div className="flex items-center gap-2 text-terminal-dim text-xs">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" style={{ boxShadow: '0 0 8px hsl(180 100% 50%)' }} />
                  <span className="uppercase tracking-wider font-cyber">
                    {isConnecting ? 'Establishing Neural Link...' : 'Select wallet to connect'}
                  </span>
                </div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-pink" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
