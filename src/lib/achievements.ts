/**
 * Achievement System
 * 
 * Defines achievements players can unlock by completing specific milestones.
 * Tracks progress, unlocks, and provides notifications for satisfying visual feedback.
 * 
 * Achievement Categories:
 * - Mining Milestones (total mines completed)
 * - Wealth Accumulation (total $DATA earned)
 * - Rarity Hunter (get specific rarity drops)
 * - Combo Master (reach combo levels)
 * - Speed Demon (complete mines quickly)
 */

import { type RarityTier } from './rarity';

export type AchievementCategory = 'mining' | 'wealth' | 'rarity' | 'combo' | 'speed' | 'special';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  icon: string; // Emoji
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  requirement: {
    type: 'mine_count' | 'data_earned' | 'rarity_drop' | 'combo_level' | 'mine_speed' | 'special';
    target: number | string;
  };
  reward: number; // Bonus $DATA
  unlocked: boolean;
  unlockedAt?: number;
}

export interface AchievementState {
  achievements: Achievement[];
  totalUnlocked: number;
  lastUnlocked: Achievement | null;
}

const STORAGE_KEY_PREFIX = 'mineboy_achievements_';

/**
 * Achievement definitions
 */
export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  // Mining Milestones
  {
    id: 'first_mine',
    name: 'First Crack',
    description: 'Complete your first data mining operation',
    category: 'mining',
    icon: '⛏️',
    rarity: 'bronze',
    requirement: { type: 'mine_count', target: 1 },
    reward: 5,
  },
  {
    id: 'miner_10',
    name: 'Apprentice Miner',
    description: 'Complete 10 mining operations',
    category: 'mining',
    icon: '⚒️',
    rarity: 'bronze',
    requirement: { type: 'mine_count', target: 10 },
    reward: 25,
  },
  {
    id: 'miner_50',
    name: 'Expert Miner',
    description: 'Complete 50 mining operations',
    category: 'mining',
    icon: '🔨',
    rarity: 'silver',
    requirement: { type: 'mine_count', target: 50 },
    reward: 100,
  },
  {
    id: 'miner_100',
    name: 'Master Miner',
    description: 'Complete 100 mining operations',
    category: 'mining',
    icon: '⚡',
    rarity: 'gold',
    requirement: { type: 'mine_count', target: 100 },
    reward: 250,
  },
  
  // Wealth Accumulation
  {
    id: 'wealth_100',
    name: 'Data Collector',
    description: 'Accumulate 100 $DATA',
    category: 'wealth',
    icon: '💰',
    rarity: 'bronze',
    requirement: { type: 'data_earned', target: 100 },
    reward: 10,
  },
  {
    id: 'wealth_500',
    name: 'Data Hoarder',
    description: 'Accumulate 500 $DATA',
    category: 'wealth',
    icon: '💎',
    rarity: 'silver',
    requirement: { type: 'data_earned', target: 500 },
    reward: 50,
  },
  {
    id: 'wealth_1000',
    name: 'Data Tycoon',
    description: 'Accumulate 1000 $DATA',
    category: 'wealth',
    icon: '👑',
    rarity: 'gold',
    requirement: { type: 'data_earned', target: 1000 },
    reward: 150,
  },
  {
    id: 'wealth_5000',
    name: 'Data Kingpin',
    description: 'Accumulate 5000 $DATA',
    category: 'wealth',
    icon: '🏆',
    rarity: 'platinum',
    requirement: { type: 'data_earned', target: 5000 },
    reward: 500,
  },
  
  // Rarity Hunter
  {
    id: 'rare_drop',
    name: 'Lucky Strike',
    description: 'Get your first Rare or higher drop',
    category: 'rarity',
    icon: '✨',
    rarity: 'bronze',
    requirement: { type: 'rarity_drop', target: 'rare' },
    reward: 20,
  },
  {
    id: 'epic_drop',
    name: 'Epic Hunter',
    description: 'Get an Epic drop',
    category: 'rarity',
    icon: '💫',
    rarity: 'silver',
    requirement: { type: 'rarity_drop', target: 'epic' },
    reward: 50,
  },
  {
    id: 'legendary_drop',
    name: 'Legend Seeker',
    description: 'Get a Legendary drop',
    category: 'rarity',
    icon: '⭐',
    rarity: 'gold',
    requirement: { type: 'rarity_drop', target: 'legendary' },
    reward: 100,
  },
  {
    id: 'mythic_drop',
    name: 'Myth Finder',
    description: 'Get a Mythic drop',
    category: 'rarity',
    icon: '🌟',
    rarity: 'diamond',
    requirement: { type: 'rarity_drop', target: 'mythic' },
    reward: 300,
  },
  
  // Combo Master
  {
    id: 'combo_level_1',
    name: 'Double Tap',
    description: 'Reach combo level 1',
    category: 'combo',
    icon: '🔥',
    rarity: 'bronze',
    requirement: { type: 'combo_level', target: 1 },
    reward: 15,
  },
  {
    id: 'combo_level_3',
    name: 'Mega Combo',
    description: 'Reach combo level 3',
    category: 'combo',
    icon: '💥',
    rarity: 'silver',
    requirement: { type: 'combo_level', target: 3 },
    reward: 50,
  },
  {
    id: 'combo_level_4',
    name: 'Ultimate Chain',
    description: 'Reach combo level 4',
    category: 'combo',
    icon: '⚡',
    rarity: 'gold',
    requirement: { type: 'combo_level', target: 4 },
    reward: 100,
  },
  
  // Speed Demon
  {
    id: 'speed_5s',
    name: 'Speed Demon',
    description: 'Complete a 5-second mine',
    category: 'speed',
    icon: '⚡',
    rarity: 'silver',
    requirement: { type: 'mine_speed', target: 5 },
    reward: 30,
  },
  
  // Special
  {
    id: 'first_nft',
    name: 'Ice Breaker',
    description: 'Load your first ICE Breaker NFT',
    category: 'special',
    icon: '🎮',
    rarity: 'bronze',
    requirement: { type: 'special', target: 'load_nft' },
    reward: 10,
  },
];

/**
 * Get rarity color for achievement
 */
export function getAchievementRarityColor(rarity: Achievement['rarity']): string {
  const colors = {
    bronze: 'hsl(30 100% 60%)',
    silver: 'hsl(0 0% 80%)',
    gold: 'hsl(45 100% 55%)',
    platinum: 'hsl(210 100% 70%)',
    diamond: 'hsl(180 100% 60%)',
  };
  return colors[rarity];
}

/**
 * Initialize achievement state
 */
export function initAchievementState(): AchievementState {
  return {
    achievements: ACHIEVEMENT_DEFINITIONS.map(def => ({
      ...def,
      unlocked: false,
    })),
    totalUnlocked: 0,
    lastUnlocked: null,
  };
}

/**
 * Check if an achievement should be unlocked
 */
export function checkAchievement(
  achievement: Achievement,
  stats: {
    mineCount: number;
    totalDataEarned: number;
    lastRarity: RarityTier | null;
    comboLevel: number;
    mineDuration: number;
    hasLoadedNFT: boolean;
  }
): boolean {
  if (achievement.unlocked) return false;

  const { type, target } = achievement.requirement;

  switch (type) {
    case 'mine_count':
      return stats.mineCount >= (target as number);
    
    case 'data_earned':
      return stats.totalDataEarned >= (target as number);
    
    case 'rarity_drop':
      if (!stats.lastRarity) return false;
      const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
      const targetIndex = rarityOrder.indexOf(target as string);
      const currentIndex = rarityOrder.indexOf(stats.lastRarity);
      return currentIndex >= targetIndex;
    
    case 'combo_level':
      return stats.comboLevel >= (target as number);
    
    case 'mine_speed':
      return stats.mineDuration <= (target as number);
    
    case 'special':
      if (target === 'load_nft') return stats.hasLoadedNFT;
      return false;
    
    default:
      return false;
  }
}

/**
 * Check all achievements and return newly unlocked ones
 */
export function checkAllAchievements(
  currentState: AchievementState,
  stats: {
    mineCount: number;
    totalDataEarned: number;
    lastRarity: RarityTier | null;
    comboLevel: number;
    mineDuration: number;
    hasLoadedNFT: boolean;
  }
): { state: AchievementState; newlyUnlocked: Achievement[] } {
  const newlyUnlocked: Achievement[] = [];
  
  const updatedAchievements = currentState.achievements.map(achievement => {
    if (checkAchievement(achievement, stats)) {
      const unlockedAchievement = {
        ...achievement,
        unlocked: true,
        unlockedAt: Date.now(),
      };
      newlyUnlocked.push(unlockedAchievement);
      return unlockedAchievement;
    }
    return achievement;
  });

  return {
    state: {
      achievements: updatedAchievements,
      totalUnlocked: currentState.totalUnlocked + newlyUnlocked.length,
      lastUnlocked: newlyUnlocked[newlyUnlocked.length - 1] || currentState.lastUnlocked,
    },
    newlyUnlocked,
  };
}

/**
 * Save achievement state to localStorage
 */
export function saveAchievementState(address: string, state: AchievementState): void {
  if (!address) return;
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(state));
    console.log('[ACHIEVEMENTS] State saved for', address.slice(0, 6));
  } catch (error) {
    console.error('[ACHIEVEMENTS] Failed to save state:', error);
  }
}

/**
 * Load achievement state from localStorage
 */
export function loadAchievementState(address: string): AchievementState {
  if (!address) return initAchievementState();
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      console.log('[ACHIEVEMENTS] No saved state found, initializing...');
      return initAchievementState();
    }
    
    const data = JSON.parse(stored) as AchievementState;
    console.log('[ACHIEVEMENTS] State loaded:', data.totalUnlocked, 'unlocked');
    return data;
  } catch (error) {
    console.error('[ACHIEVEMENTS] Failed to load state:', error);
    return initAchievementState();
  }
}

/**
 * Get achievement progress percentage
 */
export function getAchievementProgress(state: AchievementState): number {
  const total = state.achievements.length;
  return Math.round((state.totalUnlocked / total) * 100);
}

/**
 * Get achievements by category
 */
export function getAchievementsByCategory(state: AchievementState): Record<AchievementCategory, Achievement[]> {
  const grouped: Record<AchievementCategory, Achievement[]> = {
    mining: [],
    wealth: [],
    rarity: [],
    combo: [],
    speed: [],
    special: [],
  };

  state.achievements.forEach(achievement => {
    grouped[achievement.category].push(achievement);
  });

  return grouped;
}
