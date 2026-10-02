import { describe, expect, it } from 'vitest';
import { buildDailyDateQuestions } from './date-game';

const EVENTS = [
  { name: 'Autumn Festival', date: '2026-10-10', tentative: false },
  { name: 'Founders Day', date: '2026-10-18', tentative: false },
  { name: 'Harvest Day', date: '2026-11-02', tentative: false },
  { name: 'Moon Festival', date: '2026-11-12', tentative: true },
  { name: 'Winter Feast', date: '2026-12-20', tentative: false },
];

describe('daily date game', () => {
  it('creates three deterministic questions from confirmed upcoming dates', () => {
    const firstRun = buildDailyDateQuestions('2026-09-28', EVENTS);
    expect(firstRun).toHaveLength(3);
    expect(buildDailyDateQuestions('2026-09-28', EVENTS)).toEqual(firstRun);
    expect(firstRun.map((question) => question.kind)).toEqual(['weekday', 'countdown', 'race']);
    expect(firstRun.every((question) => question.options.includes(question.answer))).toBe(true);
    expect(new Set(firstRun[2].options).size).toBe(2);
    expect(firstRun.some((question) => question.prompt.includes('Moon Festival'))).toBe(false);
  });

  it('keeps recurring holiday names distinct in the event race', () => {
    const repeatedNames = [
      { name: 'Annual Day', date: '2026-01-06', tentative: false },
      { name: 'Annual Day', date: '2026-01-07', tentative: false },
      { name: 'Annual Day', date: '2026-01-08', tentative: false },
      { name: 'Annual Day', date: '2026-01-09', tentative: false },
      { name: 'Other Day', date: '2026-01-10', tentative: false },
      { name: 'Other Day', date: '2026-01-11', tentative: false },
    ];
    const questions = buildDailyDateQuestions('2026-01-05', repeatedNames);

    expect(new Set(questions[2].options).size).toBe(2);
  });

  it('returns no game for an invalid date or too few future events', () => {
    expect(buildDailyDateQuestions('not-a-date', EVENTS)).toEqual([]);
    expect(buildDailyDateQuestions('2026-12-19', EVENTS)).toEqual([]);
  });
});