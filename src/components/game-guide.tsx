/**
 * GameGuide Component
 * 
 * Premium redesigned guide with 3D effects, interactive cards, and engaging animations.
 * Features:
 * - 3D card hover effects
 * - Animated gradient backgrounds
 * - Interactive progress bars
 * - Particle effects
 * - Smooth transitions
 * - Visual hierarchy improvements
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Shield, Zap, Trophy, Flame, AlertTriangle, Sparkles, Target, TrendingUp, ChevronRight, Star, Award, Gauge, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RARITY_CONFIGS, type RarityTier } from '@/lib/rarity';

interface GameGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

type GuideSection = 'overview' | 'mechanics' | 'rarities' | 'events' | 'systems';

export function GameGuide({ isOpen, onClose }: GameGuideProps) {
  const [activeSection, setActiveSection] = useState<GuideSection>('overview');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const rarityOrder: RarityTier[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          >
            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-neon-cyan rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="cyber-panel rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col relative pointer-events-auto overflow-hidden"
              style={{
                boxShadow: '0 0 80px hsl(180 100% 50% / 0.4), 0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(0, 0, 0, 0.6)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                animate={{
                  background: [
                    'linear-gradient(135deg, hsl(180 100% 10% / 0.3) 0%, hsl(270 100% 10% / 0.3) 100%)',
                    'linear-gradient(135deg, hsl(270 100% 10% / 0.3) 0%, hsl(330 100% 10% / 0.3) 100%)',
                    'linear-gradient(135deg, hsl(330 100% 10% / 0.3) 0%, hsl(180 100% 10% / 0.3) 100%)',
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none"
              />

              {/* Header with 3D effect */}
              <div className="relative p-6 pb-4 border-b-2 border-cyber-border bg-cyber-darker/80 backdrop-blur-sm">
                <motion.div
                  animate={{ 
                    background: [
                      'linear-gradient(90deg, transparent, hsl(180 100% 50% / 0.2), transparent)',
                      'linear-gradient(90deg, transparent, hsl(330 100% 60% / 0.2), transparent)',
                    ],
                    x: ['-100%', '200%']
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ type: "spring" }}
                      className="p-3 rounded-xl bg-gradient-to-br from-neon-cyan/30 to-neon-purple/30 border-2 border-neon-cyan/60 shadow-neon-cyan"
                    >
                      <BookOpen className="w-7 h-7 text-neon-cyan" />
                    </motion.div>
                    <div>
                      <motion.h2
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl font-bold text-white font-cyber tracking-widest"
                        style={{
                          textShadow: '0 0 20px hsl(180 100% 50% / 0.5), 0 0 40px hsl(180 100% 50% / 0.3)',
                        }}
                      >
                        CYBER MINER GUIDE
                      </motion.h2>
                      <p className="text-xs text-neon-cyan uppercase tracking-widest font-cyber flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3" />
                        Complete Neural Network Manual
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="text-neon-pink hover:text-white hover:bg-neon-pink/30 transition-all hover:scale-110 rounded-xl border border-neon-pink/30 hover:border-neon-pink"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                {/* Enhanced Tab Navigation */}
                <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: BookOpen, color: 'cyan' },
                    { id: 'mechanics', label: 'Mechanics', icon: Zap, color: 'purple' },
                    { id: 'rarities', label: 'Rarities', icon: Sparkles, color: 'pink' },
                    { id: 'events', label: 'Events', icon: AlertTriangle, color: 'orange' },
                    { id: 'systems', label: 'Systems', icon: Trophy, color: 'green' },
                  ].map((tab) => {
                    const isActive = activeSection === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id as GuideSection)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all font-cyber text-xs uppercase tracking-wider relative overflow-hidden ${
                          isActive
                            ? 'bg-gradient-to-r from-neon-cyan/40 to-neon-purple/40 text-white border-2 border-neon-cyan shadow-neon-cyan'
                            : 'bg-cyber-panel/50 text-terminal-text hover:bg-cyber-panel border-2 border-cyber-border/30 hover:border-cyber-border'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20"
                            transition={{ type: "spring", duration: 0.6 }}
                          />
                        )}
                        <tab.icon className={`w-4 h-4 relative z-10 ${isActive ? 'animate-pulse' : ''}`} />
                        <span className="relative z-10">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Content Area with enhanced scrolling */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar relative">
                <AnimatePresence mode="wait">
                  {/* Overview Section */}
                  {activeSection === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      {/* Hero Card */}
                      <motion.div
                        className="relative cyber-screen rounded-2xl p-8 overflow-hidden border-2 border-neon-cyan/50"
                        style={{
                          boxShadow: '0 0 40px hsl(180 100% 50% / 0.2)',
                          transformStyle: 'preserve-3d',
                        }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <motion.div
                          animate={{
                            background: [
                              'radial-gradient(circle at 20% 50%, hsl(180 100% 50% / 0.1) 0%, transparent 50%)',
                              'radial-gradient(circle at 80% 50%, hsl(270 100% 60% / 0.1) 0%, transparent 50%)',
                            ],
                          }}
                          transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                          className="absolute inset-0"
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                              <Sparkles className="w-8 h-8 text-neon-cyan" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple font-cyber tracking-wider">
                              Welcome to the Neural Network
                            </h3>
                          </div>
                          
                          <p className="text-terminal-text leading-relaxed mb-6 text-lg">
                            Cyber Miner is a Web3 cyberpunk mining game where you break through ICE (Intrusion Countermeasures Electronics) 
                            to extract valuable $DATA from the neural network. Connect your wallet, load an ICE Breaker NFT, and start cracking!
                          </p>
                          
                          {/* Feature Cards Grid */}
                          <div className="grid md:grid-cols-3 gap-4 mt-8">
                            {[
                              {
                                icon: Shield,
                                title: 'ICE Breaker',
                                desc: 'Load NFT to mine',
                                color: 'cyan',
                                detail: 'Max 5 per wallet'
                              },
                              {
                                icon: Zap,
                                title: 'Data Crack',
                                desc: '5-60 second sessions',
                                color: 'purple',
                                detail: '0.01 APE fee'
                              },
                              {
                                icon: TrendingUp,
                                title: 'Earn Rewards',
                                desc: '$DATA + Season Points',
                                color: 'pink',
                                detail: 'Global Leaderboard'
                              },
                            ].map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ 
                                  scale: 1.05,
                                  rotateY: 5,
                                  z: 50,
                                }}
                                onHoverStart={() => setHoveredCard(feature.title)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer overflow-hidden ${
                                  feature.color === 'cyan' ? 'border-neon-cyan/40 hover:border-neon-cyan bg-neon-cyan/5' :
                                  feature.color === 'purple' ? 'border-neon-purple/40 hover:border-neon-purple bg-neon-purple/5' :
                                  'border-neon-pink/40 hover:border-neon-pink bg-neon-pink/5'
                                }`}
                                style={{
                                  transformStyle: 'preserve-3d',
                                  boxShadow: hoveredCard === feature.title 
                                    ? `0 0 30px ${feature.color === 'cyan' ? 'hsl(180 100% 50% / 0.4)' : feature.color === 'purple' ? 'hsl(270 100% 60% / 0.4)' : 'hsl(330 100% 60% / 0.4)'}`
                                    : 'none',
                                }}
                              >
                                <motion.div
                                  animate={{
                                    scale: hoveredCard === feature.title ? [1, 1.2, 1] : 1,
                                  }}
                                  transition={{ duration: 0.5 }}
                                  className={`p-3 rounded-lg mb-4 inline-block ${
                                    feature.color === 'cyan' ? 'bg-neon-cyan/20' :
                                    feature.color === 'purple' ? 'bg-neon-purple/20' :
                                    'bg-neon-pink/20'
                                  }`}
                                >
                                  <feature.icon className={`w-6 h-6 ${
                                    feature.color === 'cyan' ? 'text-neon-cyan' :
                                    feature.color === 'purple' ? 'text-neon-purple' :
                                    'text-neon-pink'
                                  }`} />
                                </motion.div>
                                <h4 className={`text-sm font-bold mb-2 font-cyber uppercase tracking-wider ${
                                  feature.color === 'cyan' ? 'text-neon-cyan' :
                                  feature.color === 'purple' ? 'text-neon-purple' :
                                  'text-neon-pink'
                                }`}>
                                  {feature.title}
                                </h4>
                                <p className="text-xs text-white mb-2">{feature.desc}</p>
                                <p className="text-[10px] text-terminal-dim uppercase tracking-wider">{feature.detail}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Mechanics Section */}
                  {activeSection === 'mechanics' && (
                    <motion.div
                      key="mechanics"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {[
                        {
                          step: 1,
                          title: 'Connect Wallet',
                          icon: Shield,
                          color: 'cyan',
                          desc: 'Establish neural link with MetaMask. Auto-switch to ApeChain network.',
                          details: ['Network: ApeChain', 'Chain ID: 33139', 'Currency: APE'],
                        },
                        {
                          step: 2,
                          title: 'Load ICE Breaker',
                          icon: Lock,
                          color: 'purple',
                          desc: 'Select and load your ICE Breaker NFT from the cartridge selector.',
                          details: ['Contract: 0x3322b37...', 'Max 5 per wallet', 'Required to mine'],
                        },
                        {
                          step: 3,
                          title: 'Execute Data Crack',
                          icon: Zap,
                          color: 'green',
                          desc: 'Initiate mining operation. Random duration with real-time progress.',
                          details: ['Duration: 5-60s', 'Hash Rate: 50-100 H/s', 'Live terminal logs'],
                        },
                        {
                          step: 4,
                          title: 'Claim Rewards',
                          icon: Award,
                          color: 'pink',
                          desc: 'Pay 0.01 APE anonymizer fee to extract your $DATA rewards.',
                          details: ['Fee: 0.01 APE', 'Reward: 10-100 $DATA', 'Rarity multipliers apply'],
                        },
                      ].map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.02, x: 10 }}
                          className={`relative cyber-screen rounded-2xl p-6 border-2 overflow-hidden ${
                            step.color === 'cyan' ? 'border-neon-cyan/30 hover:border-neon-cyan/60' :
                            step.color === 'purple' ? 'border-neon-purple/30 hover:border-neon-purple/60' :
                            step.color === 'green' ? 'border-neon-green/30 hover:border-neon-green/60' :
                            'border-neon-pink/30 hover:border-neon-pink/60'
                          }`}
                          style={{
                            boxShadow: `0 0 20px ${
                              step.color === 'cyan' ? 'hsl(180 100% 50% / 0.1)' :
                              step.color === 'purple' ? 'hsl(270 100% 60% / 0.1)' :
                              step.color === 'green' ? 'hsl(150 100% 60% / 0.1)' :
                              'hsl(330 100% 60% / 0.1)'
                            }`,
                          }}
                        >
                          <div className="flex items-start gap-6">
                            {/* Step Number */}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className={`text-6xl font-bold font-cyber opacity-20 ${
                                step.color === 'cyan' ? 'text-neon-cyan' :
                                step.color === 'purple' ? 'text-neon-purple' :
                                step.color === 'green' ? 'text-neon-green' :
                                'text-neon-pink'
                              }`}
                            >
                              {step.step}
                            </motion.div>

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-lg ${
                                  step.color === 'cyan' ? 'bg-neon-cyan/20' :
                                  step.color === 'purple' ? 'bg-neon-purple/20' :
                                  step.color === 'green' ? 'bg-neon-green/20' :
                                  'bg-neon-pink/20'
                                }`}>
                                  <step.icon className={`w-5 h-5 ${
                                    step.color === 'cyan' ? 'text-neon-cyan' :
                                    step.color === 'purple' ? 'text-neon-purple' :
                                    step.color === 'green' ? 'text-neon-green' :
                                    'text-neon-pink'
                                  }`} />
                                </div>
                                <h4 className={`text-xl font-bold font-cyber tracking-wider ${
                                  step.color === 'cyan' ? 'text-neon-cyan' :
                                  step.color === 'purple' ? 'text-neon-purple' :
                                  step.color === 'green' ? 'text-neon-green' :
                                  'text-neon-pink'
                                }`}>
                                  {step.title}
                                </h4>
                              </div>
                              
                              <p className="text-terminal-text mb-4">{step.desc}</p>
                              
                              <div className="grid grid-cols-3 gap-2">
                                {step.details.map((detail, j) => (
                                  <motion.div
                                    key={j}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 + j * 0.05 }}
                                    className="text-[10px] text-terminal-dim font-mono bg-cyber-panel p-2 rounded border border-cyber-border/30"
                                  >
                                    {detail}
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <ChevronRight className={`w-6 h-6 ${
                              step.color === 'cyan' ? 'text-neon-cyan' :
                              step.color === 'purple' ? 'text-neon-purple' :
                              step.color === 'green' ? 'text-neon-green' :
                              'text-neon-pink'
                            }`} />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Rarities Section - Enhanced */}
                  {activeSection === 'rarities' && (
                    <motion.div
                      key="rarities"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink font-cyber tracking-wider mb-2">
                          RARITY SYSTEM
                        </h3>
                        <p className="text-terminal-text">Higher rarities = Higher rewards. Chase the legendary drops!</p>
                      </div>
                      
                      <div className="space-y-4">
                        {rarityOrder.map((tier, i) => {
                          const config = RARITY_CONFIGS[tier];
                          return (
                            <motion.div
                              key={tier}
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ 
                                scale: 1.03,
                                rotateY: 2,
                                z: 20,
                              }}
                              className="relative cyber-screen rounded-2xl p-6 border-2 transition-all cursor-pointer overflow-hidden"
                              style={{
                                borderColor: config.color,
                                boxShadow: `0 0 30px ${config.glowColor}, 0 10px 40px rgba(0, 0, 0, 0.5)`,
                                transformStyle: 'preserve-3d',
                              }}
                            >
                              {/* Animated background */}
                              <motion.div
                                animate={{
                                  background: [
                                    `radial-gradient(circle at 0% 50%, ${config.color}15 0%, transparent 70%)`,
                                    `radial-gradient(circle at 100% 50%, ${config.color}15 0%, transparent 70%)`,
                                  ],
                                }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                                className="absolute inset-0"
                              />

                              <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <motion.div
                                    whileHover={{ scale: 1.2, rotate: 180 }}
                                    className="text-5xl"
                                    style={{ 
                                      color: config.color,
                                      filter: `drop-shadow(0 0 10px ${config.glowColor})`,
                                    }}
                                  >
                                    {config.icon}
                                  </motion.div>
                                  <div>
                                    <h4
                                      className="text-2xl font-bold font-cyber tracking-widest"
                                      style={{ 
                                        color: config.color,
                                        textShadow: `0 0 20px ${config.glowColor}`,
                                      }}
                                    >
                                      {config.name.toUpperCase()}
                                    </h4>
                                    <div className="flex items-center gap-4 mt-1">
                                      <p className="text-xs text-terminal-dim font-mono">
                                        Drop Rate: <span style={{ color: config.color }}>{config.dropRate}%</span>
                                      </p>
                                      <div className="h-4 w-px bg-cyber-border/30" />
                                      <p className="text-xs text-terminal-dim font-mono">
                                        Multiplier: <span style={{ color: config.color }}>{config.multiplier}x</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-4xl font-bold font-cyber"
                                    style={{ 
                                      color: config.color,
                                      textShadow: `0 0 30px ${config.glowColor}`,
                                    }}
                                  >
                                    {config.multiplier}x
                                  </motion.div>
                                </div>
                              </div>
                              
                              {/* Enhanced Progress Bar */}
                              <div className="relative mt-4 h-3 bg-cyber-panel rounded-full overflow-hidden border border-cyber-border/30">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${config.dropRate}%` }}
                                  transition={{ duration: 1, delay: i * 0.1 }}
                                  className="h-full rounded-full relative"
                                  style={{
                                    backgroundColor: config.color,
                                    boxShadow: `0 0 20px ${config.glowColor}, inset 0 0 10px ${config.glowColor}`,
                                  }}
                                >
                                  <motion.div
                                    animate={{ x: ['0%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                  />
                                </motion.div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Example Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="cyber-screen rounded-2xl p-6 border-2 border-neon-cyan/50 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10"
                      >
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
                          <div>
                            <p className="text-sm font-bold text-neon-cyan mb-2 font-cyber uppercase">CALCULATION EXAMPLE</p>
                            <p className="text-xs text-terminal-text font-mono">
                              Base reward: <span className="text-white font-bold">50 $DATA</span> × 
                              <span className="text-neon-purple font-bold"> EPIC</span> (3x) = 
                              <span className="text-neon-green font-bold text-lg"> 150 $DATA</span>
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Events & Systems sections remain similar but with enhanced styling... */}
                  {activeSection === 'events' && (
                    <motion.div
                      key="events"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-cyber tracking-wider mb-2">
                          SYSTEM OVERLOAD EVENTS
                        </h3>
                        <p className="text-terminal-text">High risk, high reward critical events (8% chance)</p>
                      </div>

                      {[
                        { name: 'POWER SURGE', mult: '2.5x', fail: '20%', color: 'hsl(45 100% 55%)', icon: Zap },
                        { name: 'SYSTEM CRASH', mult: '3.0x', fail: '35%', color: 'hsl(0 100% 50%)', icon: AlertTriangle },
                        { name: 'QUANTUM CHAOS', mult: '2.0x', fail: '25%', color: 'hsl(270 100% 60%)', icon: Sparkles },
                      ].map((event, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                          className="cyber-screen rounded-2xl p-6 border-2"
                          style={{
                            borderColor: event.color,
                            boxShadow: `0 0 40px ${event.color}40`,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <event.icon className="w-8 h-8" style={{ color: event.color }} />
                              <div>
                                <h4 className="text-xl font-bold font-cyber tracking-wider" style={{ color: event.color }}>
                                  {event.name}
                                </h4>
                                <p className="text-xs text-terminal-dim mt-1">Critical mining anomaly detected</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold font-cyber" style={{ color: event.color }}>
                                {event.mult}
                              </div>
                              <div className="text-xs text-red-500 font-mono">{event.fail} fail rate</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeSection === 'systems' && (
                    <motion.div
                      key="systems"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8"
                    >
                      {/* Combo System */}
                      <div className="cyber-screen rounded-2xl p-6 border-2 border-neon-pink/50">
                        <div className="flex items-center gap-3 mb-6">
                          <Flame className="w-7 h-7 text-neon-pink" />
                          <h3 className="text-2xl font-bold text-neon-pink font-cyber tracking-wider">COMBO SYSTEM</h3>
                        </div>
                        <p className="text-terminal-text mb-6">
                          Chain consecutive claims within 2 minutes to multiply your rewards!
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { name: 'DOUBLE TAP', claims: 2, mult: '1.5x', color: 'hsl(120 100% 60%)' },
                            { name: 'TRIPLE THREAT', claims: 3, mult: '2.0x', color: 'hsl(210 100% 60%)' },
                            { name: 'MEGA COMBO', claims: 4, mult: '3.0x', color: 'hsl(270 100% 60%)' },
                            { name: 'ULTIMATE CHAIN', claims: '5+', mult: '5.0x', color: 'hsl(330 100% 60%)' },
                          ].map((combo, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.1, y: -5 }}
                              className="cyber-screen rounded-xl p-4 border-2 text-center"
                              style={{
                                borderColor: combo.color,
                                boxShadow: `0 0 20px ${combo.color}40`,
                              }}
                            >
                              <div className="text-3xl font-bold font-cyber mb-2" style={{ color: combo.color }}>
                                {combo.mult}
                              </div>
                              <div className="text-xs font-cyber text-white mb-1">{combo.name}</div>
                              <div className="text-[10px] text-terminal-dim">{combo.claims} claims</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Daily Challenges */}
                      <div className="cyber-screen rounded-2xl p-6 border-2 border-neon-green/50">
                        <div className="flex items-center gap-3 mb-6">
                          <Target className="w-7 h-7 text-neon-green" />
                          <h3 className="text-2xl font-bold text-neon-green font-cyber tracking-wider">DAILY CHALLENGES</h3>
                        </div>
                        <p className="text-terminal-text mb-6">
                          Complete daily objectives for bonus rewards. Resets every 24 hours.
                        </p>
                        
                        <div className="space-y-2">
                          {[
                            { task: 'Mine X times', reward: '50-120 $DATA' },
                            { task: 'Earn X $DATA today', reward: '75-200 $DATA' },
                            { task: 'Get X Rare+ drops', reward: '100-300 $DATA' },
                            { task: 'Reach combo level X', reward: '80-250 $DATA' },
                          ].map((challenge, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center justify-between bg-cyber-panel p-3 rounded-lg border border-neon-green/30"
                            >
                              <span className="text-sm text-terminal-text font-mono">• {challenge.task}</span>
                              <span className="text-xs text-neon-green font-bold">{challenge.reward}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Leaderboard */}
                      <div className="cyber-screen rounded-2xl p-6 border-2 border-yellow-500/50">
                        <div className="flex items-center gap-3 mb-6">
                          <Trophy className="w-7 h-7 text-yellow-500" />
                          <h3 className="text-2xl font-bold text-yellow-500 font-cyber tracking-wider">GLOBAL LEADERBOARD</h3>
                        </div>
                        <p className="text-terminal-text mb-6">
                          Compete worldwide for top rankings based on Season Points!
                        </p>
                        
                        <div className="flex justify-center gap-8">
                          {['🥇', '🥈', '🥉'].map((medal, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ scale: 1.2, y: -10 }}
                              className="text-center"
                            >
                              <div className="text-5xl mb-2">{medal}</div>
                              <div className="text-xs text-terminal-dim uppercase">
                                {i === 0 ? 'Champion' : i === 1 ? 'Runner-up' : 'Third'}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced Footer */}
              <div className="relative p-6 border-t-2 border-cyber-border bg-gradient-to-r from-cyber-darker via-cyber-panel to-cyber-darker backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-terminal-dim font-mono flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span>Contract: 0x3322b37...c1d34d25 • ApeChain (33139)</span>
                  </div>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-neon-cyan/30 to-neon-purple/30 hover:from-neon-cyan/50 hover:to-neon-purple/50 text-white border-2 border-neon-cyan/50 hover:border-neon-cyan font-cyber uppercase tracking-wider shadow-neon-cyan hover:shadow-neon-cyan"
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
