import { describe, expect, it } from 'vitest';
import holidayEvents from '@/data/holiday-calendar.json';

describe('generated holiday calendar', () => {
  it('includes the requested national and UK regional calendars', () => {
    const calendars = new Set(holidayEvents.map((event) => event.calendar));

    for (const calendar of [
      'us', 'uk-england-wales', 'uk-scotland', 'uk-northern-ireland',
      'india', 'pakistan', 'saudi-arabia', 'uae', 'popular',
    ]) {
      expect(calendars.has(calendar), calendar).toBe(true);
    }
  });

  it('keeps events sorted and identifies lunar dates as tentative', () => {
    const dates = holidayEvents.map((event) => event.date);
    expect(dates).toEqual([...dates].sort());
    expect(holidayEvents.some((event) => event.calendar === 'pakistan' && event.tentative && /Eid/i.test(event.name))).toBe(true);
    expect(holidayEvents.some((event) => event.calendar === 'uae' && event.tentative && /Eid/i.test(event.name))).toBe(true);
  });

  it('uses UK substitute weekdays instead of duplicating weekend bank holidays', () => {
    const ukEvents = holidayEvents.filter((event) => event.calendar === 'uk-england-wales');
    const years = Array.from(new Set(ukEvents.map((event) => Number(event.date.slice(0, 4)))));

    for (const year of years) {
      const boxingDay = new Date(Date.UTC(year, 11, 26)).getUTCDay();
      if (boxingDay === 0 || boxingDay === 6) {
        expect(ukEvents.some((event) => event.date === `${year}-12-26` && event.name === 'Boxing Day')).toBe(false);
        expect(ukEvents.some((event) => event.date > `${year}-12-26` && event.name.includes('Boxing Day') && event.substitute)).toBe(true);
      }
    }
  });
});