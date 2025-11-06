# MineBoy Project Overview

## Project Structure

### Core Application Files
- `src/App.tsx`: Main application component with routing and query client setup
- `src/main.tsx`: Application entry point
- `src/pages/home.tsx`: Main MineBoy game interface with Web3 integration, NFT cartridge system, data mining, and reward claiming
- `src/pages/404.tsx`: Not found error page

### Styling
- `src/styles/globals.css`: Global styles with retro gaming theme, terminal effects, and cyberpunk aesthetics
- `tailwind.config.ts`: Tailwind configuration with custom GameBoy color palette and cyber theme
- `index.html`: HTML entry point with MineBoy branding

### Web3 Integration
- `src/lib/wallet.ts`: Web3 wallet utilities for MetaMask connection and ApeChain network
- `src/lib/nft.ts`: NFT utilities for fetching and managing cartridge NFTs from ApeChain contract (0x3322b37349aefd6f50f7909b641f2177c1d34d25)
- `src/lib/minting.ts`: **Direct NFT minting utilities** - Instant on-chain minting to contract 0x8867D52Aa849Ebc4aB487e542AE3F99FB29321a4. Auto-detects mint price, executes transaction, and verifies NFT receipt in user's wallet.
- `src/hooks/use-wallet.tsx`: Custom hook for wallet state management
- `src/hooks/use-mining.tsx`: Custom hook for mining simulation with random duration (5-60s), rarity calculation, reward claiming (0.01 APE fee), and instant NFT minting
- `src/hooks/use-cartridge.tsx`: Custom hook for NFT cartridge management and selection
- `src/hooks/use-leaderboard.tsx`: Custom hook for compiling and managing global leaderboard from localStorage stats

### Components
- `src/components/web3-provider.tsx`: Context provider for Web3 wallet state
- `src/components/gameboy-console.tsx`: Main GameBoy device UI wrapper
- `src/components/hacker-console.tsx`: Cyberpunk hacker terminal UI wrapper with neon effects
- `src/components/terminal-display.tsx`: Retro terminal display with mining logs and hacking effects
- `src/components/stats-display.tsx`: Mining statistics dashboard
- `src/components/control-pad.tsx`: GameBoy-style control interface with D-pad, action buttons, and wallet controls
- `src/components/cartridge-selector.tsx`: Modal dialog for selecting and loading ICE breaker NFTs
- `src/components/claim-dialog.tsx`: Modal dialog for claiming mining rewards with rarity reveal animations
- `src/components/leaderboard.tsx`: Modern leaderboard modal displaying top players by season points
- `src/components/mint-widget-dialog.tsx`: **DEPRECATED** - Previously used external minting widget, replaced by direct minting
- `src/components/combo-display.tsx`: Combo streak display with timer (ready to integrate)
- `src/components/challenge-display.tsx`: Daily challenges modal (ready to integrate)
- `src/components/overload-overlay.tsx`: System overload event overlay (ready to integrate)

### UI Components Library
- `src/components/ui/`: shadcn/ui component library (50+ components)
- Pre-built, accessible components for rapid development
- Fully customizable with Tailwind CSS

### Utilities
- `src/lib/utils.ts`: Utility functions for class name merging
- `src/lib/api.ts`: API client setup for backend communication
- `src/lib/rarity.ts`: Rarity system for mining rewards (Common → Mythic)
- `src/lib/combo.ts`: Combo system utilities (ready to integrate)
- `src/lib/challenges.ts`: Daily challenge system utilities (ready to integrate)
- `src/lib/overload.ts`: System overload event utilities (ready to integrate)

### Server (Backend API)
- `src/server/app.dev.ts`: Development server configuration
- `src/server/app.prod.ts`: Production server with static file serving
- `src/server/routes/`: API route handlers
  - `example.ts`: Example API endpoints
  - `index.ts`: Route registration
- `src/server/schema.ts`: Zod validation schemas

### Documentation
- `docs/prd.md`: Product Requirements Document
- `docs/todo.md`: Development task list
- `docs/overview.md`: This file - project structure overview

## Tech Stack

### Frontend
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first styling with custom gaming theme
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Server state management
- **React Router**: Client-side routing

### Web3
- **MetaMask**: Wallet connection
- **ApeChain**: Target blockchain network (Chain ID: 33139)
- **NFT Contract (ICE Breakers)**: 0x3322b37349aefd6f50f7909b641f2177c1d34d25
- **Minting Contract (CyberMinerNFT)**: 0x8867D52Aa849Ebc4aB487e542AE3F99FB29321a4
- **Web3 Provider**: Direct eth_call integration for reading NFT data
- **Transaction System**: eth_sendTransaction for reward claiming (0.01 APE) and direct NFT minting

### Backend
- **Hono.js**: Lightweight, fast web framework
- **Deno**: Modern JavaScript runtime
- **Zod**: Runtime type validation

### Build Tools
- **Rspack**: Ultra-fast bundler (10x faster than Webpack)
- **PostCSS**: CSS processing
- **TypeScript Compiler**: Type checking

## Key Features

1. **Retro GameBoy Interface**: Authentic 90s gaming aesthetic with purple/blue palette
2. **Cyberpunk Hacker Theme**: Matrix-style terminal, neon effects, digital rain animations
3. **Web3 Wallet Integration**: MetaMask connection with ApeChain support
4. **NFT Cartridge System**: Load verified NFTs from ApeChain contract as mining catalysts
5. **Cartridge Requirement**: Users must own and load a cartridge NFT to mine
6. **Mining Simulation**: Random duration (5-60 seconds) with progress tracking
7. **Rarity System**: Common → Mythic rewards with weighted drop rates
8. **Reward Claiming**: 0.01 APE transaction fee to claim $DATA with rarity reveal
9. **Stats Persistence**: All stats saved to localStorage per wallet address
10. **Global Leaderboard**: Real-time rankings compiled from all players' localStorage data
11. **Instant NFT Minting**: Direct on-chain minting to contract 0x8867D52Aa849Ebc4aB487e542AE3F99FB29321a4 with automatic price detection

## Instant Mint System

The MINT button performs direct on-chain minting:

1. **Auto-detects mint price** from your deployed contract
2. **Shows price** in terminal logs before transaction
3. **User confirms** MetaMask transaction
4. **NFT mints** directly to user's wallet
5. **Verifies receipt** by checking wallet balance
6. **Logs token ID** in terminal on success

**Contract Address:** 0x8867D52Aa849Ebc4aB487e542AE3F99FB29321a4  
**Function Called:** `mint(uint256 quantity)` with quantity = 1  
**Requirements:** Wallet connected + ICE breaker loaded + sufficient APE

No external widgets, no $DATA costs, no IPFS uploads - pure instant minting!

## Development Status

✅ **Completed:**
- Web3 wallet integration
- NFT cartridge system
- Mining simulation
- Reward claiming with APE fees
- Stats persistence
- Global leaderboard
- Direct NFT minting integration

🚧 **Ready to Integrate:**
- Combo system
- Daily challenges
- System overload events

## Next Steps

1. Test instant minting on ApeChain mainnet
2. Verify NFT metadata and images
3. Integrate combo/challenge/overload features
4. Polish UI and animations
5. Deploy to production
