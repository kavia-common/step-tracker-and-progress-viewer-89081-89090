 /**
  * PUBLIC_INTERFACE
  * startOfToday
  * Returns a Date at local start-of-day (00:00:00).
  */
export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * PUBLIC_INTERFACE
 * addDays
 * Returns a new Date by adding the given number of days to date.
 */
export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * PUBLIC_INTERFACE
 * formatISODate
 * Formats a Date as YYYY-MM-DD for input[type="date"].
 */
export function formatISODate(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * PUBLIC_INTERFACE
 * toDisplay
 * Accepts Date or ISO string 'YYYY-MM-DD' and returns human friendly date.
 */
export function toDisplay(d) {
  let date = d;
  if (typeof d === 'string') {
    const [y, m, day] = d.split('-').map(Number);
    date = new Date(y, m - 1, day);
  }
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}
