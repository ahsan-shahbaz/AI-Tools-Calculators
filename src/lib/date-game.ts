import { daysBetween } from './date-calculators';

export interface DateGameEvent {
  name: string;
  date: string;
  tentative: boolean;
}

export interface DateGameQuestion {
  kind: 'weekday' | 'countdown' | 'race';
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function rotate<T>(items: T[], amount: number): T[] {
  return items.map((_, index) => items[(index + amount) % items.length]);
}

export function buildDailyDateQuestions(today: string, events: readonly DateGameEvent[]): DateGameQuestion[] {
  const seed = daysBetween('2020-01-01', today);
  if (seed === null) return [];

  const uniqueEvents = new Map<string, DateGameEvent>();
  for (const event of events) {
    const daysUntil = daysBetween(today, event.date);
    if (event.tentative || daysUntil === null || daysUntil <= 0 || daysUntil > 365) continue;
    uniqueEvents.set(`${event.date}:${event.name}`, event);
  }

  const pool = Array.from(uniqueEvents.values()).sort((left, right) => left.date.localeCompare(right.date));
  if (pool.length < 2 || new Set(pool.map((event) => event.name)).size < 2) return [];

  const pick = (offset: number) => pool[(seed + offset * 7) % pool.length];
  const weekdayEvent = pick(0);
  const countdownEvent = pick(2);
  const firstRaceEvent = pick(4);
  let secondRaceEvent = pick(5);
  for (let offset = 6; (secondRaceEvent.date === firstRaceEvent.date || secondRaceEvent.name === firstRaceEvent.name) && offset < pool.length + 6; offset += 1) {
    secondRaceEvent = pick(offset);
  }

  if (secondRaceEvent.date === firstRaceEvent.date || secondRaceEvent.name === firstRaceEvent.name) return [];

  const weekdayDate = new Date(`${weekdayEvent.date}T00:00:00Z`);
  const weekdayAnswer = WEEKDAYS[weekdayDate.getUTCDay()];
  const countdownDays = daysBetween(today, countdownEvent.date);
  if (countdownDays === null) return [];

  const countdownOptions = Array.from(new Set([
    countdownDays,
    Math.max(0, countdownDays - 1),
    countdownDays + 3,
    countdownDays + 7,
  ])).map((days) => `${days} ${days === 1 ? 'day' : 'days'}`);

  const earlierEvent = firstRaceEvent.date < secondRaceEvent.date ? firstRaceEvent : secondRaceEvent;
  const laterEvent = earlierEvent === firstRaceEvent ? secondRaceEvent : firstRaceEvent;

  return [
    {
      kind: 'weekday',
      prompt: `What weekday is ${weekdayEvent.name} (${formatDate(weekdayEvent.date)})?`,
      options: rotate(WEEKDAYS, seed % WEEKDAYS.length),
      answer: weekdayAnswer,
      explanation: `${formatDate(weekdayEvent.date)} falls on a ${weekdayAnswer}.`,
    },
    {
      kind: 'countdown',
      prompt: `How many days until ${countdownEvent.name} on ${formatDate(countdownEvent.date)}?`,
      options: rotate(countdownOptions, seed % countdownOptions.length),
      answer: `${countdownDays} ${countdownDays === 1 ? 'day' : 'days'}`,
      explanation: `${countdownEvent.name} is ${countdownDays} calendar days away.`,
    },
    {
      kind: 'race',
      prompt: 'Which date happens first?',
      options: rotate([firstRaceEvent.name, secondRaceEvent.name], seed % 2),
      answer: earlierEvent.name,
      explanation: `${earlierEvent.name} (${formatDate(earlierEvent.date)}) comes before ${laterEvent.name} (${formatDate(laterEvent.date)}).`,
    },
  ];
}