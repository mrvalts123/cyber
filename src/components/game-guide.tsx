/**
 * GameGuide Component
 * 
 * Comprehensive information and guide modal that explains all game mechanics,
 * systems, events, rarities, rewards, and requirements.
 * Displays detailed information about:
 * - ICE Breaker requirement
 * - Data cracking mechanics
 * - Rarity system and drop rates
 * - Reward amounts and multipliers
 * - Combo system
 * - Daily challenges
 * - System overload events
 * - Leaderboard system
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Shield, Zap, Trophy, Flame, AlertTriangle, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RARITY_CONFIGS, type RarityTier } from '@/lib/rarity';

interface GameGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

type GuideSection = 'overview' | 'mechanics' | 'rarities' | 'events' | 'systems';

export function GameGuide({ isOpen, onClose }: GameGuideProps) {
  const [activeSection, setActiveSection] = useState<GuideSection>('overview');

  const rarityOrder: RarityTier[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

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

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="cyber-panel rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col relative"
              style={{
                boxShadow: '0 0 60px hsl(180 100% 50% / 0.3), inset 0 0 40px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Header */}
              <div className="relative p-6 pb-4 border-b border-cyber-border">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent"
                />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50">
                      <BookOpen className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white font-cyber tracking-wider">CYBER MINER GUIDE</h2>
                      <p className="text-xs text-terminal-dim uppercase tracking-widest font-cyber">Complete Game Manual</p>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="text-terminal-text hover:text-neon-pink hover:bg-neon-pink/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Tab Navigation */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: BookOpen },
                    { id: 'mechanics', label: 'Mechanics', icon: Zap },
                    { id: 'rarities', label: 'Rarities', icon: Sparkles },
                    { id: 'events', label: 'Events', icon: AlertTriangle },
                    { id: 'systems', label: 'Systems', icon: Trophy },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSection(tab.id as GuideSection)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-cyber text-xs uppercase tracking-wider ${
                        activeSection === tab.id
                          ? 'bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50'
                          : 'bg-cyber-darker text-terminal-text hover:bg-cyber-panel border border-cyber-border/30'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Overview Section */}
                {activeSection === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="cyber-screen rounded-xl p-6">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4 font-cyber tracking-wider">Welcome to Cyber Miner</h3>
                      <p className="text-terminal-text leading-relaxed mb-4">
                        Cyber Miner is a Web3 cyberpunk mining game where you break through ICE (Intrusion Countermeasures Electronics) 
                        to extract valuable $DATA from the neural network. Connect your wallet, load an ICE Breaker NFT, and start cracking!
                      </p>
                      
                      <div className="mt-6 space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-cyber-darker rounded-lg border border-neon-cyan/30">
                          <Shield className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1 font-cyber">ICE Breaker Required</h4>
                            <p className="text-xs text-terminal-dim">
                              You must own and load an ICE Breaker NFT (from contract 0x3322b37...c1d34d25) to start mining. 
                              Maximum 5 ICE Breakers per wallet.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-cyber-darker rounded-lg border border-neon-purple/30">
                          <Zap className="w-5 h-5 text-neon-purple flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1 font-cyber">Mining Process</h4>
                            <p className="text-xs text-terminal-dim">
                              Each crack takes 5-60 seconds (random). Upon completion, claim your $DATA by paying a 
                              0.01 APE anonymizer fee. Rewards vary by rarity tier.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-cyber-darker rounded-lg border border-neon-green/30">
                          <TrendingUp className="w-5 h-5 text-neon-green flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1 font-cyber">Progress & Rewards</h4>
                            <p className="text-xs text-terminal-dim">
                              Earn $DATA, accumulate Season Points, and climb the global leaderboard. Your stats are 
                              automatically saved to your wallet address.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Mechanics Section */}
                {activeSection === 'mechanics' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="cyber-screen rounded-xl p-6">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4 font-cyber tracking-wider">Core Mechanics</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-cyber-darker rounded-lg p-4 border border-cyber-border/50">
                          <h4 className="text-sm font-bold text-neon-cyan mb-3 font-cyber uppercase tracking-wider">1. Connect Wallet</h4>
                          <p className="text-xs text-terminal-text mb-2">
                            Click "CONNECT WALLET" to establish a neural link with MetaMask. The system will automatically 
                            switch you to ApeChain (Chain ID: 33139).
                          </p>
                          <div className="text-[10px] text-terminal-dim font-mono bg-cyber-panel p-2 rounded border border-cyber-border/30">
                            Network: ApeChain • Currency: APE • RPC: apechain.calderachain.xyz
                          </div>
                        </div>

                        <div className="bg-cyber-darker rounded-lg p-4 border border-cyber-border/50">
                          <h4 className="text-sm font-bold text-neon-purple mb-3 font-cyber uppercase tracking-wider">2. Load ICE Breaker</h4>
                          <p className="text-xs text-terminal-text mb-2">
                            Click the ICE Breaker slot to open the selector. Choose one of your NFTs to load. Only wallets 
                            with ICE Breaker NFTs can mine.
                          </p>
                          <div className="text-[10px] text-terminal-dim font-mono bg-cyber-panel p-2 rounded border border-cyber-border/30">
                            Contract: 0x3322b37349aefd6f50f7909b641f2177c1d34d25 • Max: 5 per wallet
                          </div>
                        </div>

                        <div className="bg-cyber-darker rounded-lg p-4 border border-cyber-border/50">
                          <h4 className="text-sm font-bold text-neon-green mb-3 font-cyber uppercase tracking-wider">3. Execute Data Crack</h4>
                          <p className="text-xs text-terminal-text mb-2">
                            Press "DATA CRACK" to start mining. Duration is randomized between 5-60 seconds. Watch the progress 
                            bar and terminal logs as your ICE Breaker infiltrates the system.
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="text-[10px] text-terminal-dim font-mono bg-cyber-panel p-2 rounded border border-cyber-border/30">
                              Min Duration: 5s
                            </div>
                            <div className="text-[10px] text-terminal-dim font-mono bg-cyber-panel p-2 rounded border border-cyber-border/30">
                              Max Duration: 60s
                            </div>
                          </div>
                        </div>

                        <div className="bg-cyber-darker rounded-lg p-4 border border-cyber-border/50">
                          <h4 className="text-sm font-bold text-neon-pink mb-3 font-cyber uppercase tracking-wider">4. Claim Rewards</h4>
                          <p className="text-xs text-terminal-text mb-2">
                            When the crack completes, a claim dialog appears. You must pay 0.01 APE (anonymizer fee) to extract 
                            the $DATA. Confirm the MetaMask transaction to receive your rewards.
                          </p>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="text-[10px] text-neon-pink font-mono bg-cyber-panel p-2 rounded border border-neon-pink/30">
                              Fee: 0.01 APE
                            </div>
                            <div className="text-[10px] text-neon-green font-mono bg-cyber-panel p-2 rounded border border-neon-green/30">
                              Base Reward: 10-100 $DATA
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Rarities Section */}
                {activeSection === 'rarities' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="cyber-screen rounded-xl p-6">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4 font-cyber tracking-wider">Rarity System</h3>
                      <p className="text-sm text-terminal-text mb-6">
                        Every successful crack has a rarity tier that determines your reward multiplier. Higher rarities 
                        are extremely rare but provide massive $DATA bonuses.
                      </p>
                      
                      <div className="space-y-3">
                        {rarityOrder.map((tier) => {
                          const config = RARITY_CONFIGS[tier];
                          return (
                            <motion.div
                              key={tier}
                              whileHover={{ scale: 1.02 }}
                              className="bg-cyber-darker rounded-lg p-4 border-2 transition-all"
                              style={{
                                borderColor: config.color,
                                boxShadow: `0 0 15px ${config.glowColor}`,
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="text-2xl w-8 h-8 flex items-center justify-center rounded"
                                    style={{ color: config.color }}
                                  >
                                    {config.icon}
                                  </div>
                                  <div>
                                    <h4
                                      className="text-lg font-bold font-cyber tracking-wider"
                                      style={{ color: config.color }}
                                    >
                                      {config.name.toUpperCase()}
                                    </h4>
                                    <p className="text-xs text-terminal-dim font-mono">
                                      Drop Rate: {config.dropRate}%
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div
                                    className="text-2xl font-bold font-cyber"
                                    style={{ color: config.color }}
                                  >
                                    {config.multiplier}x
                                  </div>
                                  <p className="text-[10px] text-terminal-dim uppercase tracking-wider">Multiplier</p>
                                </div>
                              </div>
                              
                              {/* Drop Rate Visual Bar */}
                              <div className="mt-3 h-2 bg-cyber-panel rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${config.dropRate}%`,
                                    backgroundColor: config.color,
                                    boxShadow: `0 0 10px ${config.glowColor}`,
                                  }}
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="mt-6 p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
                        <p className="text-xs text-terminal-text font-mono">
                          <span className="text-neon-cyan font-bold">EXAMPLE:</span> If you earn a base reward of 50 $DATA 
                          and get an <span className="text-neon-purple font-bold">EPIC</span> drop (3x multiplier), your final 
                          reward will be <span className="text-neon-green font-bold">150 $DATA</span>.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Events Section */}
                {activeSection === 'events' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="cyber-screen rounded-xl p-6">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4 font-cyber tracking-wider">Special Events</h3>
                      
                      {/* System Overload */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-neon-pink" />
                          <h4 className="text-lg font-bold text-neon-pink font-cyber tracking-wider">SYSTEM OVERLOAD</h4>
                        </div>
                        <p className="text-sm text-terminal-text mb-4">
                          Rare critical events (8% chance) that occur during mining. These high-risk, high-reward moments 
                          can multiply your rewards by 2-3x, but also have a chance of complete failure.
                        </p>
                        
                        <div className="grid gap-3">
                          <div className="bg-cyber-darker rounded-lg p-4 border-2 border-yellow-500/50">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-yellow-500 font-cyber">POWER SURGE</h5>
                              <span className="text-xs text-yellow-500 font-mono">2.5x • 20% Fail</span>
                            </div>
                            <p className="text-xs text-terminal-dim">System overload detected! High risk, high reward!</p>
                          </div>

                          <div className="bg-cyber-darker rounded-lg p-4 border-2 border-red-500/50">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-red-500 font-cyber">SYSTEM CRASH</h5>
                              <span className="text-xs text-red-500 font-mono">3.0x • 35% Fail</span>
                            </div>
                            <p className="text-xs text-terminal-dim">Critical error! Mining unstable!</p>
                          </div>

                          <div className="bg-cyber-darker rounded-lg p-4 border-2 border-purple-500/50">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-bold text-purple-500 font-cyber">QUANTUM CHAOS</h5>
                              <span className="text-xs text-purple-500 font-mono">2.0x • 25% Fail</span>
                            </div>
                            <p className="text-xs text-terminal-dim">Reality is glitching! Anything can happen!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Systems Section */}
                {activeSection === 'systems' && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="cyber-screen rounded-xl p-6">
                      <h3 className="text-xl font-bold text-neon-cyan mb-4 font-cyber tracking-wider">Game Systems</h3>
                      
                      {/* Combo System */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Flame className="w-5 h-5 text-neon-pink" />
                          <h4 className="text-lg font-bold text-neon-pink font-cyber tracking-wider">COMBO SYSTEM</h4>
                        </div>
                        <p className="text-sm text-terminal-text mb-4">
                          Chain consecutive successful claims within 2 minutes to build combo streaks and earn massive 
                          multiplier bonuses. Break the chain if you wait too long!
                        </p>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-cyber-darker rounded-lg p-3 border border-green-500/30">
                            <div className="text-lg font-bold text-green-500 font-cyber">DOUBLE TAP</div>
                            <p className="text-xs text-terminal-dim">2 claims • 1.5x multiplier</p>
                          </div>
                          <div className="bg-cyber-darker rounded-lg p-3 border border-blue-500/30">
                            <div className="text-lg font-bold text-blue-500 font-cyber">TRIPLE THREAT</div>
                            <p className="text-xs text-terminal-dim">3 claims • 2.0x multiplier</p>
                          </div>
                          <div className="bg-cyber-darker rounded-lg p-3 border border-purple-500/30">
                            <div className="text-lg font-bold text-purple-500 font-cyber">MEGA COMBO</div>
                            <p className="text-xs text-terminal-dim">4 claims • 3.0x multiplier</p>
                          </div>
                          <div className="bg-cyber-darker rounded-lg p-3 border border-pink-500/30">
                            <div className="text-lg font-bold text-pink-500 font-cyber">ULTIMATE CHAIN</div>
                            <p className="text-xs text-terminal-dim">5+ claims • 5.0x multiplier</p>
                          </div>
                        </div>
                      </div>

                      {/* Daily Challenges */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5 text-neon-green" />
                          <h4 className="text-lg font-bold text-neon-green font-cyber tracking-wider">DAILY CHALLENGES</h4>
                        </div>
                        <p className="text-sm text-terminal-text mb-4">
                          Complete randomized daily objectives to earn bonus $DATA. Challenges reset every 24 hours.
                        </p>
                        
                        <div className="space-y-2">
                          <div className="bg-cyber-darker rounded p-3 border border-cyber-border/30">
                            <div className="text-xs text-terminal-text font-mono">
                              • <span className="text-neon-cyan">Mine X times</span> - Complete mining operations
                            </div>
                          </div>
                          <div className="bg-cyber-darker rounded p-3 border border-cyber-border/30">
                            <div className="text-xs text-terminal-text font-mono">
                              • <span className="text-neon-purple">Earn X $DATA</span> - Accumulate total rewards
                            </div>
                          </div>
                          <div className="bg-cyber-darker rounded p-3 border border-cyber-border/30">
                            <div className="text-xs text-terminal-text font-mono">
                              • <span className="text-neon-pink">Get X Rare+ drops</span> - High rarity rewards
                            </div>
                          </div>
                          <div className="bg-cyber-darker rounded p-3 border border-cyber-border/30">
                            <div className="text-xs text-terminal-text font-mono">
                              • <span className="text-neon-green">Reach combo level X</span> - Build streaks
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Leaderboard */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                          <h4 className="text-lg font-bold text-yellow-500 font-cyber tracking-wider">GLOBAL LEADERBOARD</h4>
                        </div>
                        <p className="text-sm text-terminal-text mb-4">
                          Compete with players worldwide for top rankings based on Season Points. Your stats are automatically 
                          saved and contribute to the global leaderboard.
                        </p>
                        
                        <div className="bg-cyber-darker rounded-lg p-4 border border-yellow-500/30">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-yellow-500 font-cyber">🥇</div>
                              <div className="text-xs text-terminal-dim mt-1">Top Player</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-gray-400 font-cyber">🥈</div>
                              <div className="text-xs text-terminal-dim mt-1">Runner Up</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-orange-600 font-cyber">🥉</div>
                              <div className="text-xs text-terminal-dim mt-1">Third Place</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-cyber-border bg-cyber-darker rounded-b-2xl">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-terminal-dim font-mono">
                    Contract: 0x3322b37...c1d34d25 • Network: ApeChain (33139)
                  </div>
                  <Button
                    onClick={onClose}
                    className="bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50 font-cyber uppercase tracking-wider"
                  >
                    Close Guide
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
