import { startOfToday, addDays, formatISODate } from './date';

/**
 * PUBLIC_INTERFACE
 * generateInitialMockData
 * Create a mock dataset of the last N days with step counts and a default goal.
 */
export function generateInitialMockData(days = 30) {
  const today = startOfToday();
  const stepsByDate = {};
  let seed = 1234;
  const rand = () => {
    // simple deterministic pseudo-random
    seed = (1103515245 * seed + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let i = days - 1; i >= 0; i--) {
    const d = addDays(today, -i);
    const variance = Math.floor(rand() * 3000);
    const base = 6000 + Math.floor(rand() * 4000);
    stepsByDate[formatISODate(d)] = Math.max(0, base + (i % 3 === 0 ? -variance : variance));
  }
  return {
    stepsByDate,
    dailyGoal: 8000,
  };
}
