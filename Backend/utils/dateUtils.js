export default function getStartOfDay(date) {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);
  return start;
}

export default function getWeekStart(date) {
  const current = new Date(date);

  const day = current.getUTCDay();

  const diff = day === 0 ? 6 : day - 1;

  current.setUTCDate(current.getUTCDate() - diff);

  return getStartOfDay(current);
}
