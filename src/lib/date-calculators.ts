const DAY_MS = 24 * 60 * 60 * 1000;

function parseDateOnly(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(0);
  parsed.setUTCHours(0, 0, 0, 0);
  parsed.setUTCFullYear(year, month - 1, day);

  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) {
    return null;
  }

  return parsed;
}

export function daysBetween(start: string, end: string): number | null {
  const startDate = parseDateOnly(start);
  const endDate = parseDateOnly(end);
  if (!startDate || !endDate) return null;
  return Math.round((endDate.getTime() - startDate.getTime()) / DAY_MS);
}

function addMonthsClamped(date: Date, months: number): Date {
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return target;
}

export interface DateDuration {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

export function dateDuration(start: string, end: string): DateDuration | null {
  const startDate = parseDateOnly(start);
  const endDate = parseDateOnly(end);
  if (!startDate || !endDate || endDate < startDate) return null;

  const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / DAY_MS);
  let years = endDate.getUTCFullYear() - startDate.getUTCFullYear();
  let cursor = addMonthsClamped(startDate, years * 12);
  if (cursor > endDate) {
    years -= 1;
    cursor = addMonthsClamped(startDate, years * 12);
  }

  let months = (endDate.getUTCFullYear() - cursor.getUTCFullYear()) * 12 + endDate.getUTCMonth() - cursor.getUTCMonth();
  cursor = addMonthsClamped(startDate, years * 12 + months);
  if (cursor > endDate) {
    months -= 1;
    cursor = addMonthsClamped(startDate, years * 12 + months);
  }

  const days = Math.round((endDate.getTime() - cursor.getTime()) / DAY_MS);
  return { years, months, days, totalDays };
}

export function countBusinessDays(start: string, end: string): number | null {
  const startDate = parseDateOnly(start);
  const endDate = parseDateOnly(end);
  if (!startDate || !endDate || endDate < startDate) return null;

  const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / DAY_MS) + 1;
  const fullWeeks = Math.floor(totalDays / 7);
  let weekdays = fullWeeks * 5;
  const remainingDays = totalDays % 7;
  const startDay = startDate.getUTCDay();

  for (let offset = 0; offset < remainingDays; offset += 1) {
    const day = (startDay + offset) % 7;
    if (day !== 0 && day !== 6) weekdays += 1;
  }

  return weekdays;
}

export interface YearProgress {
  isoWeek: number;
  isoYear: number;
  dayOfYear: number;
  daysRemaining: number;
  progressPercent: number;
}

export function getYearProgress(value: string): YearProgress | null {
  const date = parseDateOnly(value);
  if (!date) return null;

  const year = date.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const nextYear = new Date(Date.UTC(year + 1, 0, 1));
  const daysInYear = Math.round((nextYear.getTime() - yearStart.getTime()) / DAY_MS);
  const dayOfYear = Math.round((date.getTime() - yearStart.getTime()) / DAY_MS) + 1;
  const isoDate = new Date(date);
  const weekday = isoDate.getUTCDay() || 7;
  isoDate.setUTCDate(isoDate.getUTCDate() + 4 - weekday);
  const isoYearStart = new Date(Date.UTC(isoDate.getUTCFullYear(), 0, 1));
  const isoWeek = Math.ceil(((isoDate.getTime() - isoYearStart.getTime()) / DAY_MS + 1) / 7);

  return {
    isoWeek,
    isoYear: isoDate.getUTCFullYear(),
    dayOfYear,
    daysRemaining: daysInYear - dayOfYear,
    progressPercent: Math.round((dayOfYear / daysInYear) * 1000) / 10,
  };
}