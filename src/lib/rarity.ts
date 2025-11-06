/**
 * Rarity System for Data Mining
 * 
 * Defines rarity tiers, drop rates, and reward multipliers.
 * Implements weighted random selection for realistic rare drops.
 */

export type RarityTier = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface RarityConfig {
  tier: RarityTier;
  name: string;
  color: string;
  glowColor: string;
  dropRate: number; // Percentage (0-100)
  multiplier: number; // Reward multiplier
  icon: string; // Unicode/emoji
}

/**
 * Rarity Configuration
 * Drop rates add up to 100%
 */
export const RARITY_CONFIGS: Record<RarityTier, RarityConfig> = {
  common: {
    tier: 'common',
    name: 'Common',
    color: 'hsl(0 0% 70%)', // Gray
    glowColor: 'hsl(0 0% 70% / 0.5)',
    dropRate: 50.0, // 50%
    multiplier: 1.0,
    icon: '▪',
  },
  uncommon: {
    tier: 'uncommon',
    name: 'Uncommon',
    color: 'hsl(120 100% 60%)', // Green
    glowColor: 'hsl(120 100% 60% / 0.5)',
    dropRate: 30.0, // 30%
    multiplier: 1.5,
    icon: '◆',
  },
  rare: {
    tier: 'rare',
    name: 'Rare',
    color: 'hsl(210 100% 60%)', // Blue
    glowColor: 'hsl(210 100% 60% / 0.5)',
    dropRate: 15.0, // 15%
    multiplier: 2.0,
    icon: '★',
  },
  epic: {
    tier: 'epic',
    name: 'Epic',
    color: 'hsl(270 100% 65%)', // Purple
    glowColor: 'hsl(270 100% 65% / 0.5)',
    dropRate: 4.0, // 4%
    multiplier: 3.0,
    icon: '◈',
  },
  legendary: {
    tier: 'legendary',
    name: 'Legendary',
    color: 'hsl(45 100% 55%)', // Gold
    glowColor: 'hsl(45 100% 55% / 0.6)',
    dropRate: 0.9, // 0.9%
    multiplier: 5.0,
    icon: '✦',
  },
  mythic: {
    tier: 'mythic',
    name: 'Mythic',
    color: 'hsl(330 100% 60%)', // Pink/Magenta
    glowColor: 'hsl(330 100% 60% / 0.7)',
    dropRate: 0.1, // 0.1%
    multiplier: 10.0,
    icon: '◉',
  },
};

/**
 * Calculate random rarity based on weighted drop rates
 */
export function calculateRarity(): RarityTier {
  const random = Math.random() * 100; // 0-100
  let cumulative = 0;

  // Iterate through rarities in order (common to mythic)
  const tiers: RarityTier[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
  
  for (const tier of tiers) {
    cumulative += RARITY_CONFIGS[tier].dropRate;
    if (random <= cumulative) {
      return tier;
    }
  }

  // Fallback to common (should never reach here)
  return 'common';
}

/**
 * Calculate reward amount based on base reward and rarity multiplier
 */
export function calculateReward(baseReward: number, rarity: RarityTier): number {
  const multiplier = RARITY_CONFIGS[rarity].multiplier;
  return Math.floor(baseReward * multiplier);
}

/**
 * Get rarity configuration by tier
 */
export function getRarityConfig(tier: RarityTier): RarityConfig {
  return RARITY_CONFIGS[tier];
}
