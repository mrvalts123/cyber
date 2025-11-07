/**
 * TerminalDisplay Component
 * 
 * Cyberpunk terminal/console display for showing hacking logs and status messages.
 * Features Matrix-style green text, animated code streams, data visualizations,
 * and dynamic hacking effects during mining operations.
 * 
 * Layout Strategy:
 * - During mining: Hacking panels (infiltration + data stream) appear at top
 * - Chat logs are positioned below the hacking panels for visibility
 * - When not mining: Regular chat log view only
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Terminal as TerminalIcon, Lock, Shield, Cpu, Database, Zap } from 'lucide-react';

interface Log {
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface TerminalDisplayProps {
  logs: Log[];
  status: string;
  isMining?: boolean;
  miningProgress?: number;
}

// Generate random hex strings for hacking effect
const generateHexString = (length: number) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

// Generate random binary string
const generateBinaryString = (length: number) => {
  return Array.from({ length }, () => 
    Math.random() > 0.5 ? '1' : '0'
  ).join('');
};

export function TerminalDisplay({ 
  logs, 
  status, 
  isMining = false,
  miningProgress = 0 
}: TerminalDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [dataPackets, setDataPackets] = useState<Array<{ id: number; text: string; x: number }>>([]);

  // Auto-scroll to bottom when new logs added (but NOT during mining)
  useEffect(() => {
    // Only auto-scroll when NOT mining, so users can see the hacking panels
    if (scrollRef.current && !isMining) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isMining]);

  // Generate animated code lines during mining (reduced frequency for performance)
  useEffect(() => {
    if (!isMining) {
      setCodeLines([]);
      setDataPackets([]);
      return;
    }

    const codeInterval = setInterval(() => {
      const newLines = Array.from({ length: 2 }, () => {
        const operations = [
          `0x${generateHexString(8)} >>> ${generateHexString(16)}`,
          `DECRYPT [${generateBinaryString(16)}] -> ${generateHexString(8)}`,
          `PACKET_${Math.floor(Math.random() * 9999)} :: CAPTURED`,
          `NODE_${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)} >> OK`,
          `HASH: ${generateHexString(32)}`,
          `NEURAL_LINK [${Array.from({ length: 10 }, () => Math.random() > 0.5 ? '█' : '▓').join('')}]`,
        ];
        return operations[Math.floor(Math.random() * operations.length)];
      });
      
      setCodeLines(prev => [...newLines, ...prev].slice(0, 6));
    }, 1500); // Reduced frequency for performance

    // Removed flying data packets for performance

    return () => {
      clearInterval(codeInterval);
    };
  }, [isMining]);

  const getLogColor = (type: Log['type']) => {
    switch (type) {
      case 'success':
        return 'text-neon-cyan';
      case 'error':
        return 'text-neon-pink';
      default:
        return 'text-terminal-text';
    }
  };

  const getLogPrefix = (type: Log['type']) => {
    switch (type) {
      case 'success':
        return '[✓]';
      case 'error':
        return '[✗]';
      default:
        return '[>]';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-neon-cyan/30">
        <div className="flex items-center gap-3">
          <TerminalIcon className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs text-terminal-text uppercase tracking-[0.2em] font-cyber">
            Data Stream
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className={`w-3 h-3 ${isMining ? 'text-neon-green animate-pulse' : 'text-terminal-dim'}`} />
          <div className={`terminal-text text-xs uppercase tracking-wider font-bold ${isMining ? 'text-neon-green' : ''}`}>
            {status}
          </div>
        </div>
      </div>

      {/* Terminal Output Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin bg-terminal-bg/70 rounded-lg p-4 backdrop-blur-sm border border-neon-cyan/20 relative"
      >
        {/* Grid Pattern Overlay - Removed for performance */}
        
        {/* Content Area - Hacking Panels at Top When Mining */}
        <div className="relative z-10 space-y-3">
          {/* Animated Hacking Overlay - At Top During Mining */}
          <AnimatePresence>
            {isMining && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {/* System Infiltration Progress */}
                <div 
                  className="bg-cyber-panel/80 border border-neon-green/40 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-3 h-3 text-neon-green" />
                    <span className="text-xs text-neon-green uppercase tracking-wider font-cyber">
                      System Infiltration
                    </span>
                    <span className="text-xs text-neon-green">
                      {'>>>'}
                    </span>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-1.5">
                    {[
                      { label: 'FIREWALL', icon: Shield, progress: Math.min(miningProgress * 1.2, 100) },
                      { label: 'ENCRYPTION', icon: Lock, progress: Math.min(miningProgress * 0.9, 100) },
                      { label: 'DATABASE', icon: Database, progress: Math.min(miningProgress * 1.1, 100) },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <item.icon className="w-3 h-3 text-neon-cyan/60" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] text-terminal-text/70 uppercase tracking-wide font-mono">
                              {item.label}
                            </span>
                            <span className="text-[9px] text-neon-cyan font-mono">
                              {Math.floor(item.progress)}%
                            </span>
                          </div>
                          <div className="h-1 bg-cyber-darker rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-neon-green via-neon-cyan to-neon-green"
                              initial={{ width: 0 }}
                              animate={{ 
                                width: `${item.progress}%`
                              }}
                              transition={{ 
                                width: { duration: 0.3 }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Code Stream */}
                <div 
                  className="bg-cyber-darker/60 border border-neon-cyan/30 rounded-lg p-2"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-3 h-3 text-neon-cyan" />
                    <span className="text-[9px] text-neon-cyan uppercase tracking-wider font-cyber">
                      Live Data Stream
                    </span>
                  </div>
                  
                  <div className="space-y-0.5 max-h-20 overflow-hidden">
                    {codeLines.map((line, i) => (
                      <div
                        key={`${line}-${i}`}
                        className="text-[9px] font-mono text-neon-green/80"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Extraction Meter */}
                <div 
                  className="bg-gradient-to-r from-cyber-panel/70 to-cyber-panel/50 border border-neon-pink/30 rounded-lg p-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-neon-pink" />
                      <span className="text-[9px] text-neon-pink uppercase tracking-wider font-cyber">
                        Data Extraction
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full transition-all duration-300"
                          style={{
                            height: miningProgress > (i * 12.5) ? '16px' : '8px',
                            backgroundColor: miningProgress > (i * 12.5) 
                              ? 'hsl(330 100% 60%)' 
                              : 'hsl(330 100% 60% / 0.3)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Regular Log Output - Only Show When NOT Mining */}
          {!isMining && (
            <div>
              {logs.map((log, index) => (
                <div
                  key={`${log.timestamp}-${index}`}
                  className={`terminal-text text-xs mb-1.5 font-mono ${getLogColor(log.type)}`}
                >
                  <span className="text-terminal-dim">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>
                  {' '}
                  <span className={getLogColor(log.type)}>
                    {getLogPrefix(log.type)}
                  </span>
                  {' '}
                  {log.message}
                </div>
              ))}
              
              {/* Blinking Cursor */}
              <div className="terminal-text text-xs inline-block terminal-cursor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
