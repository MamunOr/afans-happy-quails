export function calculateAgeInWeeks(hatchDate) {
  const hatch = new Date(hatchDate);
  const now = new Date();
  const diffMs = now - hatch;
  const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return weeks >= 0 ? weeks : 0;
}
