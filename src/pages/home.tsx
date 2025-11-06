/**
 * Cyber Miner Home Page
 *
 * Main page component for the Web3 data mining game.
 * Features a cyberpunk hacker terminal interface with wallet connection,
 * NFT ICE breaker system, data cracking simulation with random duration (5-60s),
 * and claim dialog for collecting $DATA rewards with 0.01 APE anonymizer fee.
 * 
 * Stats ($DATA and season credits) are persisted to localStorage per wallet address.
 */

import { useState, useEffect } from 'react';
import { Web3Provider, useWeb3 } from '@/components/web3-provider';
import { HackerConsole } from '@/components/hacker-console';
import { TerminalDisplay } from '@/components/terminal-display';
import { StatsDisplay } from '@/components/stats-display';
import { ControlPad } from '@/components/control-pad';
import { CartridgeSelector } from '@/components/cartridge-selector';
import { ClaimDialog } from '@/components/claim-dialog';
import { Leaderboard } from '@/components/leaderboard';
import { GameGuide } from '@/components/game-guide';
import { WalletSelector } from '@/components/wallet-selector';
// MintWidgetDialog removed - using direct instant minting now
import { useMining } from '@/hooks/use-mining';
import { useCartridge } from '@/hooks/use-cartridge';
import { useLeaderboard } from '@/hooks/use-leaderboard';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

function CyberMinerGame() {
  const { address, isConnected, isConnecting, isCorrectNetwork, connect, disconnect, switchNetwork } = useWeb3();
  const [isCartridgeSelectorOpen, setIsCartridgeSelectorOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isWalletSelectorOpen, setIsWalletSelectorOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });
  
  // Get window size for particles on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);
  
  // ICE Breaker system (NFT cartridges)
  const {
    cartridges,
    loadedCartridge,
    isLoading: isLoadingCartridges,
    isCartridgeLoaded,
    loadCartridge,
    ejectCartridge,
  } = useCartridge({ address, isConnected });

  // Data mining system with address for stats persistence
  const {
    isMining,
    isReadyToClaim,
    isClaiming,
    pendingReward,
    pendingRarity,
    miningProgress,
    miningDuration,
    stats,
    logs,
    startMining,
    stopMining,
    claimReward,
  } = useMining({
    isConnected,
    address,
    loadedCartridge,
  });

  // Leaderboard system
  const { entries, refreshLeaderboard } = useLeaderboard();

  // Refresh leaderboard when opening it
  const handleOpenLeaderboard = () => {
    refreshLeaderboard();
    setIsLeaderboardOpen(true);
  };

  // Handle wallet selection
  const handleWalletSelect = async (walletId: string) => {
    if (walletId === 'metamask') {
      await connect();
      setIsWalletSelectorOpen(false);
    } else {
      // For other wallets, show info that they're not yet supported
      console.log('Wallet not yet supported:', walletId);
      // You can add toast notification here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
          className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-neon-pink/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 6,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-neon-purple/15 rounded-full blur-3xl"
        />

        {/* Digital Rain Effect - Sparse */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] bg-gradient-to-b from-transparent via-neon-green/40 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            initial={{ y: -200, opacity: 0 }}
            animate={{ 
              y: ['0vh', '100vh'],
              opacity: [0, 1, 0] 
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-neon-cyan' : i % 3 === 1 ? 'bg-neon-pink' : 'bg-neon-green'
            }`}
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * windowSize.height],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main Hacker Console */}
      <div className="relative z-10 w-full">
        <HackerConsole
          isConnected={isConnected}
          address={address}
          isConnecting={isConnecting}
          onConnect={() => setIsWalletSelectorOpen(true)}
          onDisconnect={disconnect}
          onOpenLeaderboard={handleOpenLeaderboard}
          onOpenGuide={() => setIsGuideOpen(true)}
          controls={
            <ControlPad
              isConnected={isConnected}
              isConnecting={isConnecting}
              address={address}
              isMining={isMining}
              loadedCartridge={loadedCartridge}
              isCorrectNetwork={isCorrectNetwork}
              onConnect={connect}
              onDisconnect={disconnect}
              onToggleMining={isMining ? stopMining : startMining}
              onOpenCartridgeSelector={() => setIsCartridgeSelectorOpen(true)}
              onOpenLeaderboard={handleOpenLeaderboard}
              onOpenGuide={() => setIsGuideOpen(true)}
              onSwitchNetwork={switchNetwork}
            />
          }
        >
          {/* Screen Content */}
          <div className="h-full flex flex-col gap-4">
            {/* Stats Section */}
            <StatsDisplay stats={stats} />

            {/* Data Crack Progress Bar */}
            {(isMining || isReadyToClaim) && (
              <div className="bg-cyber-panel/70 rounded-lg p-4 border border-neon-cyan/40">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {isReadyToClaim ? (
                      <Unlock className="w-4 h-4 text-neon-green" />
                    ) : (
                      <Lock className="w-4 h-4 text-neon-cyan" />
                    )}
                    <span className="text-xs text-terminal-text uppercase tracking-[0.15em] font-cyber">
                      {isReadyToClaim ? 'Decryption Complete' : 'Breaking ICE'}
                    </span>
                  </div>
                  <span className="text-sm text-neon-cyan font-bold font-cyber tracking-wider">
                    {isMining ? `${Math.floor(miningProgress)}%` : '100%'}
                  </span>
                </div>
                
                <div className="w-full h-3 bg-cyber-darker rounded-full overflow-hidden border border-neon-cyan/30">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-cyan via-neon-green to-neon-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${miningProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                
                {isMining && (
                  <div className="text-xs text-terminal-dim mt-2 text-center font-mono">
                    {Math.ceil((miningDuration * 1000 - (miningProgress * miningDuration * 10)) / 1000)}s remaining
                  </div>
                )}
              </div>
            )}

            {/* Terminal Section */}
            <div className="flex-1 min-h-0">
              <TerminalDisplay
                logs={logs}
                status={
                  isMining 
                    ? 'CRACKING' 
                    : isReadyToClaim
                      ? 'READY TO EXTRACT'
                      : isCartridgeLoaded 
                        ? 'STANDBY' 
                        : isConnected 
                          ? 'NO ICE BREAKER' 
                          : 'OFFLINE'
                }
                isMining={isMining}
                miningProgress={miningProgress}
              />
            </div>
          </div>
        </HackerConsole>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-center space-y-3"
        >
          <p className="text-terminal-text text-sm uppercase tracking-[0.1em] font-cyber">
            Connect Neural Link • Load ICE Breaker • Execute Data Crack
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-neon-cyan/60 font-mono">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" 
                 style={{ boxShadow: '0 0 10px hsl(180 100% 50%)' }} />
            <span>ApeChain: 0xXXXX...XXXX</span>
          </div>
        </motion.div>
      </div>

      {/* ICE Breaker Selector Modal */}
      <CartridgeSelector
        isOpen={isCartridgeSelectorOpen}
        onClose={() => setIsCartridgeSelectorOpen(false)}
        cartridges={cartridges}
        loadedCartridge={loadedCartridge}
        isLoading={isLoadingCartridges}
        onSelect={loadCartridge}
        onEject={ejectCartridge}
      />

      {/* Claim $DATA Dialog */}
      <ClaimDialog
        isOpen={isReadyToClaim}
        onClose={stopMining}
        pendingReward={pendingReward}
        pendingRarity={pendingRarity}
        isClaiming={isClaiming}
        onClaim={claimReward}
      />

            {/* Leaderboard Modal */}
      <Leaderboard
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        entries={entries}
        currentAddress={address}
      />

      {/* Game Guide Modal */}
      <GameGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Wallet Selector Modal */}
      <WalletSelector
        isOpen={isWalletSelectorOpen}
        onClose={() => setIsWalletSelectorOpen(false)}
        onSelectWallet={handleWalletSelect}
        isConnecting={isConnecting}
      />

      {/* Mint Widget Dialog - Removed, using direct instant minting now */}
    </div>
  );
}

export default function Home() {
  return (
    <Web3Provider>
      <CyberMinerGame />
    </Web3Provider>
  );
}
