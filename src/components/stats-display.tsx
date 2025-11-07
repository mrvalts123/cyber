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
      label: 'DATA',
      value: stats.minecart.toLocaleString(),
      icon: Database,
      color: 'text-neon-cyan',
      glow: 'shadow-neon-cyan',
    },
    {
      label: 'X',
      value: `${stats.multiplier.toFixed(1)}x`,
      icon: TrendingUp,
      color: 'text-neon-purple',
      glow: 'shadow-neon-purple',
    },
    {
      label: 'POINTS',
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
        {statItems.map((stat, index) => {
          // Extract color name for use in class names
          const colorName = stat.color.replace('text-', '');
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer"
            >
              {/* Cyber Border Effect */}
              <div 
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(to bottom right, hsl(var(--${colorName}) / 0.2), transparent)`
                }}
              />
              
              <div 
                className={`relative bg-cyber-panel backdrop-blur-sm rounded-lg p-3 border transition-all`}
                style={{
                  borderColor: 'hsl(var(--cyber-border) / 0.5)',
                  ...(index === 0 && { '--neon-cyan': '180 100% 50%' }),
                  ...(index === 1 && { '--neon-purple': '270 100% 60%' }),
                  ...(index === 2 && { '--neon-green': '150 100% 60%' })
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  if (colorName === 'neon-cyan') {
                    target.style.borderColor = 'hsl(180 100% 50%)';
                    target.style.boxShadow = '0 0 20px hsl(180 100% 50% / 0.5)';
                  } else if (colorName === 'neon-purple') {
                    target.style.borderColor = 'hsl(270 100% 60%)';
                    target.style.boxShadow = '0 0 20px hsl(270 100% 60% / 0.5)';
                  } else if (colorName === 'neon-green') {
                    target.style.borderColor = 'hsl(150 100% 60%)';
                    target.style.boxShadow = '0 0 20px hsl(150 100% 60% / 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.borderColor = 'hsl(var(--cyber-border) / 0.5)';
                  target.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div className="flex items-center justify-center mb-2">
                  <div 
                    className="p-2 rounded-full"
                    style={{
                      backgroundColor: colorName === 'neon-cyan' 
                        ? 'hsl(180 100% 50% / 0.1)' 
                        : colorName === 'neon-purple'
                        ? 'hsl(270 100% 60% / 0.1)'
                        : 'hsl(150 100% 60% / 0.1)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: colorName === 'neon-cyan'
                        ? 'hsl(180 100% 50% / 0.3)'
                        : colorName === 'neon-purple'
                        ? 'hsl(270 100% 60% / 0.3)'
                        : 'hsl(150 100% 60% / 0.3)'
                    }}
                  >
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
                <div 
                  className="absolute top-0 left-0 w-2 h-2 border-t border-l"
                  style={{
                    borderColor: colorName === 'neon-cyan'
                      ? 'hsl(180 100% 50% / 0.5)'
                      : colorName === 'neon-purple'
                      ? 'hsl(270 100% 60% / 0.5)'
                      : 'hsl(150 100% 60% / 0.5)'
                  }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
                  style={{
                    borderColor: colorName === 'neon-cyan'
                      ? 'hsl(180 100% 50% / 0.5)'
                      : colorName === 'neon-purple'
                      ? 'hsl(270 100% 60% / 0.5)'
                      : 'hsl(150 100% 60% / 0.5)'
                  }}
                />
              </div>
            </motion.div>
          );
        })}
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
