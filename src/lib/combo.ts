/**
 * Combo System
 * 
 * Chain mining system that rewards consecutive successful claims.
 * Build combo streaks within a time window for multiplier boosts.
 * 
 * Combo Levels:
 * - Level 1: 1.5x multiplier (2 consecutive claims)
 * - Level 2: 2.0x multiplier (3 consecutive claims)
 * - Level 3: 3.0x multiplier (4 consecutive claims)
 * - Level 4: 5.0x multiplier (5+ consecutive claims)
 * 
 * Combo breaks if more than 2 minutes pass between claims.
 */

export interface ComboState {
  level: number;
  streak: number;
  multiplier: number;
  lastClaimTime: number;
  expiresAt: number;
}

const COMBO_TIMEOUT = 2 * 60 * 1000; // 2 minutes
const STORAGE_KEY_PREFIX = 'mineboy_combo_';

/**
 * Combo multipliers by level
 */
const COMBO_MULTIPLIERS: Record<number, number> = {
  0: 1.0,   // No combo
  1: 1.5,   // 2 claims
  2: 2.0,   // 3 claims
  3: 3.0,   // 4 claims
  4: 5.0,   // 5+ claims
};

/**
 * Combo level names
 */
const COMBO_NAMES: Record<number, string> = {
  0: 'NO COMBO',
  1: 'DOUBLE TAP',
  2: 'TRIPLE THREAT',
  3: 'MEGA COMBO',
  4: 'ULTIMATE CHAIN',
};

/**
 * Combo level colors (HSL)
 */
const COMBO_COLORS: Record<number, string> = {
  0: 'hsl(0 0% 50%)',      // Gray
  1: 'hsl(120 100% 60%)',  // Green
  2: 'hsl(210 100% 60%)',  // Blue
  3: 'hsl(270 100% 60%)',  // Purple
  4: 'hsl(330 100% 60%)',  // Pink
};

/**
 * Calculate combo level from streak count
 */
export function calculateComboLevel(streak: number): number {
  if (streak < 2) return 0;
  if (streak === 2) return 1;
  if (streak === 3) return 2;
  if (streak === 4) return 3;
  return 4; // 5+
}

/**
 * Get combo multiplier for current level
 */
export function getComboMultiplier(level: number): number {
  return COMBO_MULTIPLIERS[level] || 1.0;
}

/**
 * Get combo name for current level
 */
export function getComboName(level: number): string {
  return COMBO_NAMES[level] || 'NO COMBO';
}

/**
 * Get combo color for current level
 */
export function getComboColor(level: number): string {
  return COMBO_COLORS[level] || COMBO_COLORS[0];
}

/**
 * Check if combo is still active
 */
export function isComboActive(comboState: ComboState): boolean {
  return Date.now() < comboState.expiresAt;
}

/**
 * Initialize new combo state
 */
export function initComboState(): ComboState {
  return {
    level: 0,
    streak: 0,
    multiplier: 1.0,
    lastClaimTime: 0,
    expiresAt: 0,
  };
}

/**
 * Update combo state after successful claim
 */
export function updateCombo(currentState: ComboState): ComboState {
  const now = Date.now();
  
  // Check if combo is still active
  if (isComboActive(currentState) && currentState.streak > 0) {
    // Continue combo
    const newStreak = currentState.streak + 1;
    const newLevel = calculateComboLevel(newStreak);
    
    return {
      level: newLevel,
      streak: newStreak,
      multiplier: getComboMultiplier(newLevel),
      lastClaimTime: now,
      expiresAt: now + COMBO_TIMEOUT,
    };
  } else {
    // Start new combo
    return {
      level: 0,
      streak: 1,
      multiplier: 1.0,
      lastClaimTime: now,
      expiresAt: now + COMBO_TIMEOUT,
    };
  }
}

/**
 * Reset combo state
 */
export function resetCombo(): ComboState {
  return initComboState();
}

/**
 * Save combo state to localStorage
 */
export function saveComboState(address: string, state: ComboState): void {
  if (!address) return;
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(state));
    console.log('[COMBO] State saved:', state);
  } catch (error) {
    console.error('[COMBO] Failed to save state:', error);
  }
}

/**
 * Load combo state from localStorage
 */
export function loadComboState(address: string): ComboState {
  if (!address) return initComboState();
  
  try {
    const key = `${STORAGE_KEY_PREFIX}${address.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) return initComboState();
    
    const state = JSON.parse(stored) as ComboState;
    
    // Check if combo expired
    if (!isComboActive(state)) {
      console.log('[COMBO] Expired, resetting...');
      return initComboState();
    }
    
    console.log('[COMBO] State loaded:', state);
    return state;
  } catch (error) {
    console.error('[COMBO] Failed to load state:', error);
    return initComboState();
  }
}

/**
 * Get time remaining until combo expires (in seconds)
 */
export function getComboTimeRemaining(comboState: ComboState): number {
  const remaining = comboState.expiresAt - Date.now();
  return Math.max(0, Math.floor(remaining / 1000));
}
