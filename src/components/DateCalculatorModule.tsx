'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, ChevronRight, Clock, Gamepad2, Layers } from 'lucide-react';
import HOLIDAY_EVENTS from '@/data/holiday-calendar.json';
import { countBusinessDays, dateDuration, daysBetween, getYearProgress } from '@/lib/date-calculators';
import { buildDailyDateQuestions } from '@/lib/date-game';

type Mode = 'until' | 'since' | 'duration' | 'business' | 'year';
type HolidayEvent = (typeof HOLIDAY_EVENTS)[number];
type CountdownView = 'clock' | 'blocks';
type PageView = 'tools' | 'game';

const MODES: { id: Mode; label: string }[] = [
  { id: 'until', label: 'Days until' },
  { id: 'since', label: 'Days since' },
  { id: 'duration', label: 'Date duration' },
  { id: 'business', label: 'Weekdays' },
  { id: 'year', label: 'Week & year' },
];

const HOLIDAY_CALENDARS = [
  { id: 'popular', label: 'Popular dates' },
  { id: 'us', label: 'United States · Federal' },
  { id: 'uk-england-wales', label: 'UK · England & Wales' },
  { id: 'uk-scotland', label: 'UK · Scotland' },
  { id: 'uk-northern-ireland', label: 'UK · Northern Ireland' },
  { id: 'india', label: 'India · National' },
  { id: 'pakistan', label: 'Pakistan · National' },
  { id: 'saudi-arabia', label: 'Saudi Arabia · National' },
  { id: 'uae', label: 'UAE · Federal' },
];

function localDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function shiftLocalDate(value: string, days: number): string {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return localDateValue(date);
}

function formatDate(value: string): string {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function CountdownClock({ event, today }: { event: HolidayEvent; today: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const [year, month, day] = event.date.split('-').map(Number);
  const targetTime = new Date(year, month - 1, day).getTime();
  const totalSeconds = now === null ? null : Math.max(0, Math.floor((targetTime - now) / 1000));
  const segments = [
    { label: 'Days', value: totalSeconds === null ? null : Math.floor(totalSeconds / 86400) },
    { label: 'Hours', value: totalSeconds === null ? null : Math.floor((totalSeconds % 86400) / 3600) },
    { label: 'Minutes', value: totalSeconds === null ? null : Math.floor((totalSeconds % 3600) / 60) },
    { label: 'Seconds', value: totalSeconds === null ? null : totalSeconds % 60 },
  ];

  return (
    <div className="rounded-xl border p-5 sm:p-6" style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Counting down to</p>
          <h3 className="truncate text-lg font-bold" style={{ color: 'var(--text-1)' }}>{event.name}</h3>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-2)' }}>{formatDate(event.date)}</p>
        </div>
        {event.tentative && (
          <span className="shrink-0 rounded border px-2 py-1 text-[10px] font-semibold" style={{ color: 'var(--accent-1)', borderColor: 'var(--border-accent)' }}>
            Tentative
          </span>
        )}
      </div>

      <div
        role="timer"
        aria-label={segments.map((segment) => `${segment.value ?? 0} ${segment.label.toLowerCase()}`).join(', ')}
        className="grid grid-cols-4 gap-2"
      >
        {segments.map((segment) => (
          <div key={segment.label} className="min-w-0 rounded-lg border px-1 py-3 text-center sm:px-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <div className="font-mono text-xl font-bold tabular-nums sm:text-3xl" style={{ color: 'var(--accent-1)' }}>
              {segment.value === null ? '--' : String(segment.value).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[9px] font-semibold uppercase sm:text-[10px]" style={{ color: 'var(--text-3)' }}>{segment.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs" style={{ color: 'var(--text-3)' }}>
        {event.date === today ? 'This date is today.' : 'Counts down to midnight at the start of the date in your local time.'}
      </p>
    </div>
  );
}

function DailyDateGame({ today }: { today: string }) {
  const questions = buildDailyDateQuestions(today, HOLIDAY_EVENTS);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[questionIndex];
  const isCorrect = selectedAnswer !== null && selectedAnswer === question?.answer;

  const resetGame = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  };

  const submitAnswer = (answer: string) => {
    if (selectedAnswer !== null || !question) return;
    setSelectedAnswer(answer);
    if (answer === question.answer) setScore((currentScore) => currentScore + 1);
  };

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  };

  if (!today || questions.length === 0) {
    return <p className="rounded-xl border p-6 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>The daily date challenge is loading.</p>;
  }

  return (
    <section className="rounded-xl border p-5 sm:p-7" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }} aria-labelledby="daily-game-heading">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-1)' }}>
            <Gamepad2 className="h-4 w-4" /> Daily challenge
          </p>
          <h2 id="daily-game-heading" className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Date Dash</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-2)' }}>Three quick puzzles. A fresh set each day.</p>
        </div>
        <div className="rounded-lg border px-3 py-2 text-sm font-semibold tabular-nums" style={{ color: 'var(--text-2)', borderColor: 'var(--border)' }}>
          {finished ? `${score} / ${questions.length}` : `Score ${score} / ${questions.length}`}
        </div>
      </div>

      {finished ? (
        <div className="rounded-lg p-5 text-center" style={{ background: 'var(--bg-card-hover)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-2)' }}>Round complete</p>
          <p className="my-2 text-3xl font-bold" style={{ color: 'var(--accent-1)' }}>{score} / {questions.length}</p>
          <button type="button" className="btn-primary mx-auto" onClick={resetGame}>Play again</button>
        </div>
      ) : question && (
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>
              Puzzle {questionIndex + 1} of {questions.length}
            </span>
            <div className="flex gap-1.5" aria-label={`Puzzle ${questionIndex + 1} of ${questions.length}`}>
              {questions.map((item, index) => (
                <span key={item.kind} className="h-1.5 w-8 rounded-full" style={{ background: index <= questionIndex ? 'var(--accent-1)' : 'var(--border)' }} />
              ))}
            </div>
          </div>
          <h3 className="mb-5 text-lg font-semibold sm:text-xl" style={{ color: 'var(--text-1)' }}>{question.prompt}</h3>
          <div role="group" aria-label="Answer options" className="grid gap-2 sm:grid-cols-2">
            {question.options.map((option) => {
              const chosen = selectedAnswer === option;
              const correct = selectedAnswer !== null && option === question.answer;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={chosen}
                  disabled={selectedAnswer !== null}
                  onClick={() => submitAnswer(option)}
                  className="min-h-12 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors disabled:cursor-default"
                  style={{
                    background: correct ? 'var(--accent-glow)' : chosen ? 'var(--bg-card-hover)' : 'var(--bg-surface)',
                    borderColor: correct ? 'var(--border-accent)' : chosen ? 'var(--border-accent)' : 'var(--border)',
                    color: correct ? 'var(--accent-1)' : 'var(--text-1)',
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {selectedAnswer !== null && (
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
              <p className="text-sm" style={{ color: isCorrect ? 'var(--accent-1)' : 'var(--text-2)' }}>
                <strong>{isCorrect ? 'Nice one.' : 'Not quite.'}</strong> {question.explanation}
              </p>
              <button type="button" className="btn-primary shrink-0 justify-center" onClick={nextQuestion}>
                {questionIndex === questions.length - 1 ? 'See score' : 'Next puzzle'}
              </button>
            </div>
          )}
        </div>
      )}
      <p className="mt-5 border-t pt-4 text-xs" style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
        This daily round is generated in your browser. Your score is not saved or sent anywhere.
      </p>
    </section>
  );
}

export default function DateCalculatorModule() {
  const [mode, setMode] = useState<Mode>('until');
  const [pageView, setPageView] = useState<PageView>('tools');
  const [today, setToday] = useState('');
  const [target, setTarget] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [holidayCalendar, setHolidayCalendar] = useState('popular');
  const [showMoreHolidays, setShowMoreHolidays] = useState(false);
  const [countdownView, setCountdownView] = useState<CountdownView>('clock');
  const [selectedHolidayId, setSelectedHolidayId] = useState('');

  useEffect(() => {
    const currentDate = localDateValue(new Date());
    setToday(currentDate);
    setTarget(shiftLocalDate(currentDate, 30));
    setStart(shiftLocalDate(currentDate, -7));
    setEnd(currentDate);
  }, []);

  const dayCount = target && today ? daysBetween(today, target) : null;
  const elapsedDays = start && today ? daysBetween(start, today) : null;
  const duration = start && end ? dateDuration(start, end) : null;
  const weekdays = start && end ? countBusinessDays(start, end) : null;
  const yearProgress = target ? getYearProgress(target) : null;

  let resultLabel = 'Choose a date to get started';
  let resultHeadline = 'Your date, at a glance';
  let resultDetails = 'Pick a mode above. Your result updates as you change the dates.';
  let metrics: { label: string; value: string }[] = [];

  if (mode === 'until' && target && dayCount !== null) {
    resultLabel = dayCount > 0 ? 'Time remaining' : dayCount < 0 ? 'Time elapsed' : 'It is today';
    resultHeadline = dayCount === 0 ? 'Today' : `${Math.abs(dayCount).toLocaleString()} ${Math.abs(dayCount) === 1 ? 'day' : 'days'}`;
    resultDetails = `${dayCount < 0 ? 'Since' : 'Until'} ${formatDate(target)}`;
    metrics = [
      { label: 'Weeks', value: `${Math.floor(Math.abs(dayCount) / 7)} weeks, ${Math.abs(dayCount) % 7} days` },
      { label: 'Target weekday', value: formatDate(target).split(',')[0] },
    ];
  } else if (mode === 'since' && start && elapsedDays !== null) {
    resultLabel = elapsedDays >= 0 ? 'Time since' : 'Time until';
    resultHeadline = `${Math.abs(elapsedDays).toLocaleString()} ${Math.abs(elapsedDays) === 1 ? 'day' : 'days'}`;
    resultDetails = `${elapsedDays >= 0 ? 'Since' : 'Until'} ${formatDate(start)}`;
    metrics = [{ label: 'Weeks', value: `${Math.floor(Math.abs(elapsedDays) / 7)} weeks, ${Math.abs(elapsedDays) % 7} days` }];
  } else if (mode === 'duration') {
    resultLabel = 'Calendar duration';
    if (duration) {
      resultHeadline = `${duration.totalDays.toLocaleString()} ${duration.totalDays === 1 ? 'day' : 'days'}`;
      resultDetails = 'Elapsed days between the selected dates.';
      metrics = [{ label: 'In calendar time', value: `${duration.years}y ${duration.months}m ${duration.days}d` }];
    } else if (start && end) {
      resultDetails = 'Choose an end date on or after the start date.';
    }
  } else if (mode === 'business') {
    resultLabel = 'Weekdays in range';
    if (weekdays !== null) {
      resultHeadline = `${weekdays.toLocaleString()} ${weekdays === 1 ? 'weekday' : 'weekdays'}`;
      resultDetails = 'Both dates included. Public holidays are not excluded.';
      metrics = [{ label: 'Date range', value: `${formatDate(start)} – ${formatDate(end)}` }];
    } else if (start && end) {
      resultDetails = 'Choose an end date on or after the start date.';
    }
  } else if (mode === 'year' && target && yearProgress) {
    resultLabel = 'ISO calendar week';
    resultHeadline = `Week ${yearProgress.isoWeek}`;
    resultDetails = `${formatDate(target)} · ISO week-year ${yearProgress.isoYear}`;
    metrics = [
      { label: 'Day of the year', value: `${yearProgress.dayOfYear}` },
      { label: 'Days remaining', value: `${yearProgress.daysRemaining}` },
    ];
  }

  const showTargetDate = mode === 'until' || mode === 'year';
  const showSinceDate = mode === 'since';
  const showRange = mode === 'duration' || mode === 'business';
  const upcomingHolidays = today
    ? HOLIDAY_EVENTS.filter((event) => event.calendar === holidayCalendar && event.date >= today)
    : [];
  const visibleHolidays = showMoreHolidays ? upcomingHolidays : upcomingHolidays.slice(0, 8);
  const selectedHoliday = upcomingHolidays.find((event) => event.id === selectedHolidayId) || upcomingHolidays[0];

  return (
    <div className="relative z-10 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm" style={{ color: 'var(--text-3)' }}>
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-[var(--accent-1)]">
            <ArrowLeft className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span style={{ color: 'var(--text-1)' }}>Date &amp; Time</span>
        </nav>

        <header className="mb-8 max-w-2xl">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent-1)' }}>
            <CalendarDays className="h-4 w-4" /> Date &amp; Time Toolkit
          </div>
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text-1)' }}>
            Make dates easier to plan
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Count down, compare dates, or plan your weeks. Choose a calculator and get an instant result.
          </p>
        </header>

        <div className="mb-6 flex gap-1 rounded-lg border p-1" role="group" aria-label="Date tools or game mode" style={{ borderColor: 'var(--border)', background: 'var(--bg-base)' }}>
          {(['tools', 'game'] as const).map((view) => (
            <button
              key={view}
              type="button"
              aria-pressed={pageView === view}
              onClick={() => setPageView(view)}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors"
              style={{ background: pageView === view ? 'var(--accent-1)' : 'transparent', color: pageView === view ? '#fff' : 'var(--text-2)' }}
            >
              {view === 'tools' ? <CalendarDays className="h-4 w-4" /> : <Gamepad2 className="h-4 w-4" />}
              {view === 'tools' ? 'Calculators' : 'Game Mode'}
            </button>
          ))}
        </div>

        {pageView === 'game' ? (
          <DailyDateGame today={today} />
        ) : (
          <>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Date calculator">
          {MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              className="shrink-0 rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition-colors"
              style={{
                background: mode === item.id ? 'var(--accent-1)' : 'var(--bg-surface)',
                borderColor: mode === item.id ? 'var(--accent-1)' : 'var(--border)',
                color: mode === item.id ? '#fff' : 'var(--text-2)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <section className="grid overflow-hidden rounded-xl border md:grid-cols-[minmax(250px,0.8fr)_1.2fr]" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
          <div className="space-y-5 p-5 sm:p-7">
            {showTargetDate && (
              <label className="block text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                {mode === 'until' ? 'Count down to' : 'Check week and year for'}
                <input className="form-input mt-2" type="date" value={target} onChange={(event) => setTarget(event.target.value)} />
              </label>
            )}

            {showSinceDate && (
              <label className="block text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                Count from
                <input className="form-input mt-2" type="date" value={start} onChange={(event) => setStart(event.target.value)} />
              </label>
            )}

            {showRange && (
              <>
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                  Start date
                  <input className="form-input mt-2" type="date" value={start} onChange={(event) => setStart(event.target.value)} />
                </label>
                <label className="block text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                  End date
                  <input className="form-input mt-2" type="date" value={end} onChange={(event) => setEnd(event.target.value)} />
                </label>
              </>
            )}

            <button
              type="button"
              className="text-sm font-semibold transition-colors hover:underline"
              style={{ color: 'var(--accent-1)' }}
              onClick={() => {
                const currentDate = localDateValue(new Date());
                setToday(currentDate);
                setTarget(shiftLocalDate(currentDate, 30));
                setStart(shiftLocalDate(currentDate, -7));
                setEnd(currentDate);
              }}
            >
              Reset dates
            </button>
          </div>

          <div className="flex min-h-64 flex-col justify-center border-t p-5 md:border-l md:border-t-0 sm:p-8" style={{ borderColor: 'var(--border)' }} aria-live="polite">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{resultLabel}</p>
            <p className="result-number mb-3 text-4xl sm:text-5xl">{resultHeadline}</p>
            <p className="mb-6 text-sm" style={{ color: 'var(--text-2)' }}>{resultDetails}</p>

            {mode === 'year' && yearProgress && (
              <div className="mb-6">
                <div className="mb-2 flex justify-between text-xs" style={{ color: 'var(--text-3)' }}>
                  <span>Year progress</span><span>{yearProgress.progressPercent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--bg-card-hover)' }}>
                  <div className="h-full rounded-full transition-[width]" style={{ width: `${yearProgress.progressPercent}%`, background: 'var(--accent-1)' }} />
                </div>
              </div>
            )}

            {metrics.length > 0 && (
              <dl className="space-y-3 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <dt style={{ color: 'var(--text-3)' }}>{metric.label}</dt>
                    <dd className="font-semibold text-right" style={{ color: 'var(--text-1)' }}>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
          </>
        )}

        <section className="mt-12 border-t pt-8" style={{ borderColor: 'var(--border)' }} aria-labelledby="countdowns-heading">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 id="countdowns-heading" className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>
                Upcoming countdowns
              </h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-3)' }}>
                Federal, national, regional bank holidays, and popular dates.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[minmax(190px,1fr)_auto] lg:w-auto">
              <label className="block text-sm font-semibold" style={{ color: 'var(--text-1)' }}>
                Calendar
                <select
                  className="form-select mt-2"
                  value={holidayCalendar}
                  onChange={(event) => {
                    setHolidayCalendar(event.target.value);
                    setShowMoreHolidays(false);
                    setSelectedHolidayId('');
                  }}
                >
                  {HOLIDAY_CALENDARS.map((calendar) => (
                    <option key={calendar.id} value={calendar.id}>{calendar.label}</option>
                  ))}
                </select>
              </label>
              <div className="flex items-end gap-1 rounded-lg border p-1" role="group" aria-label="Countdown display mode" style={{ borderColor: 'var(--border)', background: 'var(--bg-base)' }}>
                {(['clock', 'blocks'] as const).map((view) => (
                  <button
                    key={view}
                    type="button"
                    aria-pressed={countdownView === view}
                    onClick={() => setCountdownView(view)}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition-colors"
                    style={{
                      background: countdownView === view ? 'var(--accent-1)' : 'transparent',
                      color: countdownView === view ? '#fff' : 'var(--text-2)',
                    }}
                  >
                    {view === 'clock' ? <Clock className="h-3.5 w-3.5" /> : <Layers className="h-3.5 w-3.5" />}
                    {view === 'clock' ? 'Clock' : 'Blocks'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {visibleHolidays.length > 0 ? (
            countdownView === 'clock' ? (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(250px,0.8fr)]">
                {selectedHoliday && <CountdownClock key={selectedHoliday.id} event={selectedHoliday} today={today} />}
                <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
                  <div className="border-b px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
                    Pick a date
                  </div>
                  <div className="max-h-80 divide-y overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
                    {visibleHolidays.map((event) => {
                      const daysRemaining = today ? daysBetween(today, event.date) : null;
                      const selected = selectedHoliday?.id === event.id;
                      return (
                        <button
                          key={event.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setSelectedHolidayId(event.id)}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--bg-card-hover)]"
                          style={{ background: selected ? 'var(--bg-card-hover)' : 'transparent', borderColor: 'var(--border)' }}
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold" style={{ color: 'var(--text-1)' }}>{event.name}</span>
                            <span className="mt-1 block text-xs" style={{ color: 'var(--text-3)' }}>{formatDate(event.date)}</span>
                          </span>
                          <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: 'var(--accent-1)' }}>
                            {daysRemaining === 0 ? 'Today' : `${daysRemaining}d`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {visibleHolidays.map((event, index) => {
                  const daysRemaining = today ? daysBetween(today, event.date) : null;
                  const selected = selectedHoliday?.id === event.id;
                  return (
                    <button
                      key={event.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedHolidayId(event.id)}
                      className="group relative min-h-40 overflow-hidden rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--border-accent)]"
                      style={{ background: selected ? 'var(--bg-card-hover)' : 'var(--bg-surface)', borderColor: selected ? 'var(--border-accent)' : 'var(--border)' }}
                    >
                      <span className="mb-5 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>Date {String(index + 1).padStart(2, '0')}</span>
                        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--accent-1)' }}>{daysRemaining === 0 ? 'Today' : `${daysRemaining}d`}</span>
                      </span>
                      <span className="block text-base font-bold leading-snug" style={{ color: 'var(--text-1)' }}>{event.name}</span>
                      <span className="mt-2 block text-xs" style={{ color: 'var(--text-3)' }}>{formatDate(event.date)}</span>
                      {event.tentative && <span className="mt-3 inline-block rounded border px-1.5 py-0.5 text-[10px] font-semibold" style={{ color: 'var(--accent-1)', borderColor: 'var(--border-accent)' }}>Tentative</span>}
                    </button>
                  );
                })}
              </div>
            )
          ) : (
            <p className="rounded-lg border px-4 py-6 text-sm" style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}>
              No upcoming dates in this calendar.
            </p>
          )}

          {upcomingHolidays.length > 8 && (
            <button
              type="button"
              className="mt-4 text-sm font-semibold transition-colors hover:underline"
              style={{ color: 'var(--accent-1)' }}
              aria-expanded={showMoreHolidays}
              onClick={() => setShowMoreHolidays((expanded) => !expanded)}
            >
              {showMoreHolidays ? 'Show fewer dates' : `Show all ${upcomingHolidays.length} upcoming dates`}
            </button>
          )}

          <p className="mt-4 max-w-4xl text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
            US dates follow the federal calendar. UK dates are split by nation; employer and local observance can vary. Islamic and other lunar dates are estimates until confirmed locally. Data adapted from{' '}
            <a className="underline underline-offset-2" href="https://github.com/commenthol/date-holidays" target="_blank" rel="noreferrer">date-holidays</a>{' '}
            (<a className="underline underline-offset-2" href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>); check official calendars before making plans.
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-3)' }}>
            <a className="underline underline-offset-2" href="https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/" target="_blank" rel="noreferrer">US OPM holidays</a>
            <a className="underline underline-offset-2" href="https://www.gov.uk/bank-holidays" target="_blank" rel="noreferrer">UK bank holidays</a>
            <a className="underline underline-offset-2" href="https://u.ae/en/information-and-services/public-holidays-and-religious-affairs/public-holidays" target="_blank" rel="noreferrer">UAE public holidays</a>
          </div>
        </section>

        <p className="mt-4 text-xs" style={{ color: 'var(--text-3)' }}>
          Date counts use calendar days. Weekday counts include both selected dates and do not exclude public holidays.
        </p>

        <section className="mt-12 border-t pt-8" style={{ borderColor: 'var(--border)' }}>
          <h2 className="mb-3 text-xl font-bold" style={{ color: 'var(--text-1)' }}>Date calculations, without the busywork</h2>
          <p className="max-w-3xl text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Use the countdown for a launch or trip, compare two dates to plan a timeline, or count weekdays for a work schedule. Dates are calculated in your browser using calendar dates, so daylight-saving time does not change the day count.
          </p>
        </section>
      </div>
    </div>
  );
}