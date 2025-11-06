/**
 * System Overload Events
 * 
 * Random critical mining events that add unpredictability and excitement.
 * Can result in bonus rewards OR complete failure.
 * 
 * Overload Effects:
 * - Timer speeds up or slows down
 * - Screen shake and glitch effects
 * - Random multiplier changes
 * - Risk: Lose 0.01 APE fee but gain nothing
 * - Reward: 2x-3x normal reward
 */

export type OverloadType = 'surge' | 'crash' | 'chaos';

export interface OverloadEvent {
  type: OverloadType;
  name: string;
  description: string;
  multiplier: number; // Reward multiplier if successful
  failureChance: number; // 0-1, chance of complete failure
  visualEffect: 'shake' | 'glitch' | 'pulse' | 'distortion';
  color: string;
  active: boolean;
  triggeredAt: number;
}

/**
 * Chance of overload event triggering (5-10%)
 */
const OVERLOAD_CHANCE = 0.08; // 8%

/**
 * Overload event templates
 */
const OVERLOAD_TEMPLATES: Array<Omit<OverloadEvent, 'active' | 'triggeredAt'>> = [
  {
    type: 'surge',
    name: 'POWER SURGE',
    description: 'System overload detected! High risk, high reward!',
    multiplier: 2.5,
    failureChance: 0.2, // 20% fail
    visualEffect: 'pulse',
    color: 'hsl(45 100% 55%)', // Gold
  },
  {
    type: 'crash',
    name: 'SYSTEM CRASH',
    description: 'Critical error! Mining unstable!',
    multiplier: 3.0,
    failureChance: 0.35, // 35% fail
    visualEffect: 'shake',
    color: 'hsl(0 100% 50%)', // Red
  },
  {
    type: 'chaos',
    name: 'QUANTUM CHAOS',
    description: 'Reality is glitching! Anything can happen!',
    multiplier: 2.0,
    failureChance: 0.25, // 25% fail
    visualEffect: 'distortion',
    color: 'hsl(270 100% 60%)', // Purple
  },
];

/**
 * Check if overload event should trigger
 */
export function shouldTriggerOverload(): boolean {
  return Math.random() < OVERLOAD_CHANCE;
}

/**
 * Generate random overload event
 */
export function generateOverloadEvent(): OverloadEvent {
  const template = OVERLOAD_TEMPLATES[Math.floor(Math.random() * OVERLOAD_TEMPLATES.length)];
  
  return {
    ...template,
    active: true,
    triggeredAt: Date.now(),
  };
}

/**
 * Calculate overload result (success or failure)
 */
export function calculateOverloadResult(event: OverloadEvent): {
  success: boolean;
  multiplier: number;
} {
  const roll = Math.random();
  const success = roll > event.failureChance;
  
  return {
    success,
    multiplier: success ? event.multiplier : 0,
  };
}

/**
 * Get overload visual effect class
 */
export function getOverloadEffectClass(effect: OverloadEvent['visualEffect']): string {
  switch (effect) {
    case 'shake':
      return 'animate-shake';
    case 'glitch':
      return 'animate-glitch';
    case 'pulse':
      return 'animate-pulse-fast';
    case 'distortion':
      return 'animate-distortion';
    default:
      return '';
  }
}

/**
 * Create deactivated overload event
 */
export function createInactiveOverload(): OverloadEvent {
  return {
    type: 'surge',
    name: '',
    description: '',
    multiplier: 1.0,
    failureChance: 0,
    visualEffect: 'pulse',
    color: '',
    active: false,
    triggeredAt: 0,
  };
}
