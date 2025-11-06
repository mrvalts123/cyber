# MineBoy - Web3 Mining Game

## Product Vision
A nostalgic GameBoy-style Web3 mining game that allows users to connect their MetaMask wallet to ApeChain, load NFT cartridges, mine with random duration (5-60 seconds), and claim rewards by paying 0.01 APE fee. Users can use accumulated $DATA to mint custom NFTs with trait-based rarity system.

## Core Features

### V1 Features
1. **Retro GameBoy Interface**
   - Authentic GameBoy-inspired design with purple/blue color scheme
   - Pixel-perfect UI elements
   - Retro gaming aesthetic with neon effects
   - Animated background elements

2. **Web3 Wallet Integration**
   - MetaMask wallet connection
   - ApeChain network support
   - Display connected wallet address
   - Network switching capability
   - Transaction management for reward claiming and NFT minting

3. **NFT Cartridge System**
   - Load cartridges from ApeChain NFT contract (0x3322b37349aefd6f50f7909b641f2177c1d34d25)
   - Ownership verification using `balanceOf` and `ownerOf`
   - Cartridge selector modal with NFT preview images
   - Cartridge ejection functionality
   - Mining requires loaded cartridge
   - Maximum 5 ICE breakers per wallet

4. **Mining System**
   - Interactive mining simulation with cartridge requirement
   - Random mining duration (5-60 seconds)
   - Real-time progress bar with percentage
   - Dynamic hash rate display (50-100 H/s)
   - Mining status console with detailed logs
   - Progress updates at 25%, 50%, 75%
   - Visual mining feedback with animations
   - Clean UI during mining (no log spam)

5. **Reward Claiming System**
   - Automatic claim dialog popup when mining completes
   - Display pending reward amount ($DATA)
   - Show rarity tier (Common, Uncommon, Rare, Epic, Legendary, Mythic)
   - Show 0.01 APE transaction fee requirement
   - MetaMask transaction confirmation
   - Transaction status tracking
   - Reward added to balance after successful claim
   - Error handling for cancelled/failed transactions

6. **Stats Dashboard**
   - $DATA counter (accumulated rewards)
   - Multiplier display (increases with mining)
   - Season points tracker
   - Hash rate indicator

7. **Control System**
   - Directional pad (D-pad) controls (decorative)
   - A button: Start/Stop data cracking
   - B button: Open NFT minting interface
   - Wallet connection button
   - ICE breaker slot with status display
   - Interactive button feedback
   - Trophy button for global leaderboard

8. **NFT Minting & Launchpad System** ⭐ NEW
   - Full-featured NFT creation and minting
   - Customizable trait system with categories:
     - **Background**: 8 variations (Sky, Ocean, Forest, Desert, etc.)
     - **Body**: 12 base types with different colors/patterns
     - **Eyes**: 15 eye styles (Normal, Laser, Cyber, etc.)
     - **Mouth**: 10 mouth expressions
     - **Headwear**: 20 options (Hat, Crown, Visor, etc.) - Optional
     - **Accessories**: 25+ items (Chains, Glasses, Masks, etc.) - Optional
   - Rarity-based trait distribution:
     - Common traits: 40% probability
     - Uncommon: 30%
     - Rare: 20%
     - Epic: 8%
     - Legendary: 2%
   - Random trait generation with weighted probabilities
   - Manual trait selection/customization option
   - Live preview of NFT with selected traits
   - Rarity score calculation (0-100)
   - Metadata generation with all traits and attributes
   - IPFS metadata upload (Pinata integration)
   - On-chain minting transaction
   - Minting cost: 10 $DATA + gas fees
   - Requires loaded ICE breaker to mint
   - Minted NFTs stored in user's wallet
   - View minted NFT gallery (optional)

9. **Stats Persistence System**
   - Automatic localStorage saving per wallet address
   - Stats persist across page refreshes
   - $DATA, season points, and multiplier saved
   - Pending rewards survive network switches during claim

10. **Global Leaderboard**
    - Trophy button in control pad opens leaderboard
    - Real-time rankings of all players by season points
    - Shows rank, wallet address, season points, $DATA balance
    - Highlights current user's position
    - Shows player multiplier and last updated date
    - Top 3 ranks have special styling (gold, silver, bronze)
    - Automatically updates when players claim rewards

## Technical Stack
- React 19 + TypeScript
- Web3 Integration (MetaMask direct eth_call)
- Tailwind CSS for styling
- Framer Motion for animations
- ApeChain blockchain
- shadcn/ui component library
- IPFS/Pinata for NFT metadata storage
- ERC-721 smart contract for minting

## User Flow

### Mining Flow
1. User lands on page with GameBoy interface
2. User clicks to connect MetaMask wallet
3. System prompts to switch to ApeChain network if needed
4. System automatically fetches user's NFT cartridges (max 5)
5. User clicks cartridge slot to open selector
6. User selects and loads an NFT cartridge
7. User clicks A button (DATA CRACK) to start mining
8. System generates random mining duration (5-60s)
9. Progress bar shows mining completion in real-time
10. Hacking visuals display during mining (no log spam)
11. Mining completes, claim dialog automatically appears
12. User clicks "CLAIM REWARD" button
13. MetaMask popup requests 0.01 APE transaction
14. User confirms transaction
15. System waits for confirmation
16. Rewards added to $DATA balance
17. User can mine again or mint NFTs with accumulated $DATA

### NFT Minting Flow
1. User accumulates at least 10 $DATA from mining
2. User has an ICE breaker loaded
3. User clicks B button (MINT) on control pad
4. Mint dialog opens with trait customization interface
5. System generates random trait combination OR user customizes manually
6. User previews NFT with all traits
7. System calculates rarity score based on trait rarities
8. User reviews minting cost (10 $DATA + gas)
9. User clicks "MINT NFT" button
10. System uploads metadata to IPFS
11. System builds minting transaction with metadata URI
12. MetaMask popup requests gas payment
13. User confirms transaction
14. System waits for transaction confirmation
15. NFT minted and appears in user's wallet
16. 10 $DATA deducted from balance
17. Success notification with NFT details
18. User can view minted NFT in their wallet

## Key Metrics
- Mining Duration: 5-60 seconds (randomized)
- Claim Fee: 0.01 APE per claim
- Reward Amount: 1-13 $DATA (based on duration + rarity tier)
- Minting Cost: 10 $DATA + gas fees
- Hash Rate: 50-100 H/s (simulated)
- Max ICE Breakers: 5 per wallet
- Trait Categories: 6 (Background, Body, Eyes, Mouth, Headwear, Accessories)
- Total Trait Variations: 90+ unique traits
- Rarity Tiers: 6 (Common to Mythic)

## NFT Minting Configuration

### Smart Contract
- **Contract Type**: ERC-721 (NFT standard)
- **Network**: ApeChain (0x8173)
- **Minting Function**: `mint(address to, string memory tokenURI)`
- **Owner**: Deployer address (controls contract)
- **Royalties**: Optional 2.5% creator royalty
- **Max Supply**: Unlimited OR set cap (e.g., 10,000)

### Trait System Design
```
NFT Attributes:
{
  "name": "Cyber Miner #1234",
  "description": "A unique cyber miner generated from data cracking",
  "image": "ipfs://QmX.../1234.png",
  "attributes": [
    { "trait_type": "Background", "value": "Neon City", "rarity": "Epic" },
    { "trait_type": "Body", "value": "Chrome", "rarity": "Rare" },
    { "trait_type": "Eyes", "value": "Laser", "rarity": "Legendary" },
    { "trait_type": "Mouth", "value": "Smirk", "rarity": "Common" },
    { "trait_type": "Headwear", "value": "Crown", "rarity": "Epic" },
    { "trait_type": "Accessory", "value": "Diamond Chain", "rarity": "Legendary" }
  ],
  "rarity_score": 87,
  "minted_by": "0x1234...5678",
  "minted_at": 1704067200
}
```

### Metadata Storage
- **Primary**: IPFS via Pinata API
- **Backup**: Consider decentralized alternatives (Arweave, Filecoin)
- **Metadata Format**: JSON (ERC-721 standard)
- **Image Generation**: On-demand OR pre-generated sprite sheets
- **Caching**: Local cache for faster preview

### Minting Economics
- **Cost**: 10 $DATA (earned from mining)
- **Gas**: User pays network gas fees (~$0.10-1.00 depending on network)
- **Revenue Model**: Optional platform fee (e.g., 0.001 APE per mint)
- **Incentive**: Rarer traits = higher resale value

## Future Enhancements (V2)
- Multiple cartridge types with different mining bonuses
- Actual smart contract integration for reward distribution
- Server-side leaderboard with blockchain verification
- Daily mining challenges
- Cartridge trading marketplace
- Mining difficulty adjustments
- Token rewards instead of/in addition to NFTs
- Seasonal leaderboard resets with prizes
- **NFT Staking**: Stake minted NFTs for bonus mining rewards
- **Trait Evolution**: Burn $DATA to upgrade NFT traits
- **NFT Marketplace**: Built-in marketplace for trading minted NFTs
- **Trait Forge**: Combine multiple NFTs to create ultra-rare traits
- **Achievement System**: Mint special NFTs for completing challenges
- **3D NFT Viewer**: Interactive 3D model viewer for minted NFTs
