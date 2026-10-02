import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import Holidays from 'date-holidays';

const CALENDARS = [
  { id: 'us', country: 'US', name: 'United States · Federal' },
  { id: 'uk-england-wales', country: 'GB', subdivision: 'ENG', name: 'UK · England & Wales' },
  { id: 'uk-scotland', country: 'GB', subdivision: 'SCT', name: 'UK · Scotland' },
  { id: 'uk-northern-ireland', country: 'GB', subdivision: 'NIR', name: 'UK · Northern Ireland' },
  { id: 'india', country: 'IN', name: 'India · National' },
  { id: 'pakistan', country: 'PK', name: 'Pakistan · National' },
  { id: 'saudi-arabia', country: 'SA', name: 'Saudi Arabia · National' },
  { id: 'uae', country: 'AE', name: 'UAE · Federal' },
];

function dateString(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return dateString(year, month, day);
}

function addDays(value, amount) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + amount));
  return dateString(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

const firstYear = new Date().getFullYear();
const lastYear = firstYear + 4;
const events = [];

for (const calendarConfig of CALENDARS) {
  const calendar = new Holidays(calendarConfig.country, calendarConfig.subdivision);
  calendar.setLanguages('en');

  for (let year = firstYear; year <= lastYear; year += 1) {
    const countryHolidays = calendar.getHolidays(year);
    const normalizedName = (name) => name.replace(/\s*\(substitute day\)$/i, '').trim().toLowerCase();
    const substituteNames = new Set(
      countryHolidays.filter((holiday) => holiday.substitute).map((holiday) => normalizedName(holiday.name))
    );

    for (const holiday of countryHolidays) {
      if (holiday.type !== 'public' && holiday.type !== 'bank') continue;

      const date = holiday.date.slice(0, 10);
      const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
      if (!holiday.substitute && (weekday === 0 || weekday === 6) && substituteNames.has(normalizedName(holiday.name))) continue;

      const lunarRule = /islamic|hijri|lunar|moon|ramadan|shawwal|dhu al-|eid|diwali|holi|mawlid|ashura/i.test(`${holiday.rule} ${holiday.name}`);
      events.push({
        id: `${calendarConfig.id}-${date}-${holiday.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        calendar: calendarConfig.id,
        calendarName: calendarConfig.name,
        date,
        name: holiday.name,
        type: holiday.type,
        tentative: lunarRule,
        substitute: Boolean(holiday.substitute),
      });
    }
  }
}

for (let year = firstYear; year <= lastYear; year += 1) {
  const easter = easterSunday(year);
  const popularDates = [
    ['New Year\'s Day', dateString(year, 1, 1)],
    ['Valentine\'s Day', dateString(year, 2, 14)],
    ['Easter Sunday', easter],
    ['Halloween', dateString(year, 10, 31)],
    ['Christmas Eve', dateString(year, 12, 24)],
    ['Christmas Day', dateString(year, 12, 25)],
    ['New Year\'s Eve', dateString(year, 12, 31)],
  ];

  for (const [name, date] of popularDates) {
    events.push({
      id: `popular-${date}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      calendar: 'popular',
      calendarName: 'Popular dates',
      date,
      name,
      type: 'popular',
      tentative: false,
      substitute: false,
    });
  }
}

events.sort((left, right) => left.date.localeCompare(right.date) || left.name.localeCompare(right.name));
const outputPath = fileURLToPath(new URL('../src/data/holiday-calendar.json', import.meta.url));
await writeFile(outputPath, `${JSON.stringify(events, null, 2)}\n`, 'utf8');
console.log(`Generated ${events.length} holiday dates for ${firstYear}-${lastYear}.`);