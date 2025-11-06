/**
 * StatsDisplay Component
 * 
 * Displays mining statistics in cyberpunk hacker style.
 * Shows $DATA count, multiplier, season points, and hash rate with neon effects.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Database, TrendingUp, Award, Activity } from 'lucide-react';

interface Stats {
  minecart: number;
  multiplier: number;
  seasonPoints: number;
  hashRate: number;
}

interface StatsDisplayProps {
  stats: Stats;
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  const statItems = [
    {
      label: '$DATA',
      value: stats.minecart.toLocaleString(),
      icon: Database,
      color: 'text-neon-cyan',
      glow: 'shadow-neon-cyan',
    },
    {
      label: 'MULT',
      value: `${stats.multiplier.toFixed(1)}x`,
      icon: TrendingUp,
      color: 'text-neon-purple',
      glow: 'shadow-neon-purple',
    },
    {
      label: 'CREDS',
      value: stats.seasonPoints.toLocaleString(),
      icon: Award,
      color: 'text-neon-green',
      glow: 'shadow-neon-green',
    },
  ];

  return (
    <div className="space-y-3">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            {/* Cyber Border Effect */}
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-${stat.color.replace('text-', '')}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className={`relative bg-cyber-panel backdrop-blur-sm rounded-lg p-3 border border-cyber-border/50 hover:border-${stat.color.replace('text-', '')} transition-all ${stat.glow.replace('shadow-', 'hover:shadow-')}`}>
              {/* Icon */}
              <div className="flex items-center justify-center mb-2">
                <div className={`p-2 rounded-full bg-${stat.color.replace('text-', '')}/10 border border-${stat.color.replace('text-', '')}/30`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              
              {/* Value */}
              <div className="text-center">
                <div className={`text-lg font-bold ${stat.color} stat-glow font-cyber tracking-wider`}>
                  {stat.value}
                </div>
                <div className="text-[9px] text-terminal-dim uppercase tracking-[0.15em] mt-1 font-cyber">
                  {stat.label}
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${stat.color.replace('text-', 'border-')}/50`} />
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${stat.color.replace('text-', 'border-')}/50`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hash Rate Display */}
      <motion.div
        animate={{ 
          opacity: stats.hashRate > 0 ? 1 : 0.5,
          boxShadow: stats.hashRate > 0 ? '0 0 20px hsl(150 100% 60% / 0.3)' : 'none'
        }}
        className="bg-terminal-bg/70 backdrop-blur-sm rounded-lg p-3 border border-neon-green/30 relative overflow-hidden"
      >
        {/* Animated Background */}
        {stats.hashRate > 0 && (
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent"
          />
        )}
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${stats.hashRate > 0 ? 'text-neon-green animate-pulse' : 'text-terminal-dim'}`} />
            <span className="terminal-text text-xs uppercase tracking-[0.15em] font-cyber">
              Neural Hash Rate
            </span>
          </div>
          <div className={`text-sm font-bold font-cyber tracking-wider ${stats.hashRate > 0 ? 'text-neon-green' : 'text-terminal-dim'}`}>
            {stats.hashRate > 0 ? `${stats.hashRate} H/s` : 'IDLE'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
