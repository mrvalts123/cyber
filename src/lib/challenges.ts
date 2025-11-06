/**
 * Daily Challenge System
 * 
 * Provides randomized daily challenges for players to complete.
 * Challenges reset every 24 hours and grant bonus rewards.
 * 
 * Challenge Types:
 * - Mine X times
 * - Reach X $DATA
 * - Get X Rare+ drops
 * - Achieve X combo level
 * - Complete within time limit
 */

export type ChallengeType = 
  | 'mine_count'      // Mine X times
  | 'data_earned'     // Earn X $DATA in one day
  | 'rare_drops'      // Get X Rare+ drops
  | 'combo_level'     // Reach combo level X
  | 'speed_mining';   // Complete X mines in Y minutes

export interface Challenge {
  id: string;
  type: ChallengeType;
  name: string;
  description: string;
  target: number;
  progress: number;
  reward: number;
  completed: boolean;
  createdAt: number;
  expiresAt: number;
}

export interface DailyChallengeState {
  challenges: Challenge[];
  lastRefresh: number;
  completedToday: number;
}

const CHALLENGE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY_PREFIX = 'mineboy_challenges_';

/**
 * Challenge templates with varying difficulty
 */
const CHALLENGE_TEMPLATES = [
  // Mine Count Challenges
  {
    type: 'mine_count' as ChallengeType,
    name: 'Data Miner',
    description: 'Complete 5 mining operations',
    target: 5,
    reward: 50,
  },
  {
    type: 'mine_count' as ChallengeType,
    name: 'Power User',
    description: 'Complete 10 mining operations',
    target: 10,
    reward: 120,
  },
  
  // Data Earned Challenges
  {
    type: 'data_earned' as ChallengeType,
    name: 'Data Collector',
    description: 'Earn 100 $DATA today',
    target: 100,
    reward: 75,
  },
  {
    type: 'data_earned' as ChallengeType,
    name: 'Data Tycoon',
    description: 'Earn 250 $DATA today',
    target: 250,
    reward: 200,
  },
  
  // Rare Drops Challenges
  {
    type: 'rare_drops' as ChallengeType,
    name: 'Lucky Strike',
    description: 'Get 2 Rare+ drops',
    target: 2,
    reward: 100,
  },
  {
    type: 'rare_drops' as ChallengeType,
    name: 'Fortune Hunter',
    description: 'Get 5 Rare+ drops',
    target: 5,
    reward: 300,
  },
  
  // Combo Challenges
  {
    type: 'combo_level' as ChallengeType,
    name: 'Combo Master',
    description: 'Reach combo level 2 (Triple Threat)',
    target: 2,
    reward: 80,
  },
  {
    type: 'combo_level' as ChallengeType,
    name: 'Chain Legend',
    description: 'Reach combo level 4 (Ultimate Chain)',
    target: 4,
    reward: 250,
  },
  
  // Speed Mining Challenges
  {
    type: 'speed_mining' as ChallengeType,
    name: 'Speed Demon',
    description: 'Complete 3 mines in 10 minutes',
    target: 3,
    reward: 150,
  },
];

/**
 * Generate random daily challenges
 */
export function generateDailyChallenges(): Challenge[] {
  const now = Date.now();
  const expiresAt = now + CHALLENGE_DURATION;
  
  // Pick 3 random challenges
  const shuffled = [...CHALLENGE_TEMPLATES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);
  
  return selected.map((template, index) => ({
    id: `challenge_${now}_${index}`,
    type: template.type,
    name: template.name,
    description: template.description,
    target: template.target,
    progress: 0,
    reward: template.reward,
    completed: false,
    createdAt: now,
    expiresAt,
  }));
}

/**
 * Check if challenges need to be refreshed (24h passed)
 */
export function needsRefresh(state: DailyChallengeState): boolean {
  const timeSinceRefresh = Date.now() - state.lastRefresh;
  return timeSinceRefresh >= CHALLENGE_DURATION;
}

/**
 * Initialize daily challenge state
 */
export function initChallengeState(): DailyChallengeState {
  return {
    challenges: generateDailyChallenges(),
    lastRefresh: Date.now(),
    completedToday: 0,
  };
}

/**
 * Update challenge progress
 */
export function updateChallengeProgress(
  challenges: Challenge[],
  type: ChallengeType,
  amount: number = 1
): Challenge[] {
  return challenges.map(challenge => {
    if (challenge.type === type && !challenge.completed) {
      const newProgress = challenge.progress + amount;
      const completed = newProgress >= challenge.target;
      
      return {
        ...challenge,
        progress: Math.min(newProgress, challenge.target),
        completed,
      };
    }
    return challenge;
  });
}

/**
 * Get completed but unclaimed challenges
 */
export function getCompletedChallenges(challenges: Challenge[]): Challenge[] {
  return challenges.filter(c => c.completed);
}

/**
 * Get total reward from completed challenges
 */
export function getTotalChallengeReward(challenges: Challenge[]): number {
  return challenges
    .filter(c => c.completed)
    .reduce((sum, c) => sum + c.reward, 0);
}

/**
 * Mark challenges as claimed (for rewards)
 */
export function claimChallengeRewards(challenges: Challenge[]): Challenge[] {
  // For now, we keep them completed but don't remove
  // In a full implementation, you might want to track claimed status separately
  return challenges;
}

/**
 * Save challenge state to localStorage
 */
export function saveChallengeState(address: string, state: DailyChallengeState): void {
  if (!address) return;
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(state));
    console.log('[CHALLENGES] State saved:', state);
  } catch (error) {
    console.error('[CHALLENGES] Failed to save state:', error);
  }
}

/**
 * Load challenge state from localStorage
 */
export function loadChallengeState(address: string): DailyChallengeState {
  if (!address) return initChallengeState();
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) return initChallengeState();
    
    const state = JSON.parse(stored) as DailyChallengeState;
    
    // Check if needs refresh
    if (needsRefresh(state)) {
      console.log('[CHALLENGES] 24h passed, generating new challenges...');
      return initChallengeState();
    }
    
    console.log('[CHALLENGES] State loaded:', state);
    return state;
  } catch (error) {
    console.error('[CHALLENGES] Failed to load state:', error);
    return initChallengeState();
  }
}

/**
 * Get time until challenges refresh (in seconds)
 */
export function getTimeUntilRefresh(state: DailyChallengeState): number {
  const refreshTime = state.lastRefresh + CHALLENGE_DURATION;
  const remaining = refreshTime - Date.now();
  return Math.max(0, Math.floor(remaining / 1000));
}

/**
 * Format time remaining as HH:MM:SS
 */
export function formatTimeRemaining(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
