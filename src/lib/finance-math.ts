/** Shared helpers for the pure calculator modules. No DOM access, no side effects. */

export function round(value: number, decimals = 2): number {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Coerce to a finite number within [min, max]; anything else becomes `fallback`. */
export function clamp(value: number, min: number, max: number, fallback = min): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

/** Standard fixed-rate amortised payment. `monthlyRate` is a fraction (0.005 = 0.5%/month). */
export function monthlyPayment(principal: number, monthlyRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const factor = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * factor) / (factor - 1);
}
