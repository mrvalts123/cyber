/**
 * Web3Provider Component
 * 
 * Context provider for Web3 wallet state management.
 * Wraps the application to provide wallet connection state to all children.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useWallet } from '@/hooks/use-wallet';

interface Web3ContextType {
  address: string;
  isConnected: boolean;
  isCorrectNetwork: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  const wallet = useWallet();

  return (
    <Web3Context.Provider value={wallet}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
