'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, FileText, Gamepad2, Hand, RotateCcw, Scissors, X } from 'lucide-react';
import {
  canExtendNumberTrail,
  chooseTicTacToeMove,
  getDailyWord,
  getHandResult,
  getTicTacToeWinner,
  isMiniSudokuSolved,
  isNumberTrailSolved,
  MINI_SUDOKU_PUZZLE,
  NUMBER_TRAIL_CHECKPOINTS,
  scoreWordGuess,
  type HandChoice,
  type TicTacToeMark,
  type WordLetterStatus,
} from '@/lib/quick-games';

const PROMPT_AFTER_MS = 3 * 60 * 1000;

const HAND_CHOICES: { value: HandChoice; label: string; icon: typeof Hand }[] = [
  { value: 'rock', label: 'Rock', icon: Hand },
  { value: 'paper', label: 'Paper', icon: FileText },
  { value: 'scissors', label: 'Scissors', icon: Scissors },
];

type Panel = 'closed' | 'invite' | 'offer' | 'rps' | 'tic-tac-toe' | 'sudoku' | 'number-trail' | 'word-guess';
type RpsRound = { player: HandChoice; computer: HandChoice; result: 'win' | 'loss' | 'draw' };
type WordGuess = { word: string; statuses: WordLetterStatus[] };

function localDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const QuickGamesContext = createContext<() => void>(() => {});

export function useQuickGames() {
  return useContext(QuickGamesContext);
}

export default function StayAndPlay({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<Panel>('closed');
  const [rpsRound, setRpsRound] = useState<RpsRound | null>(null);
  const [board, setBoard] = useState<TicTacToeMark[]>(Array(9).fill(null));
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>(() => MINI_SUDOKU_PUZZLE.map((row) => [...row]));
  const [selectedSudokuCell, setSelectedSudokuCell] = useState<number | null>(null);
  const [numberPath, setNumberPath] = useState<number[]>([0]);
  const [numberTrailMessage, setNumberTrailMessage] = useState('Trace adjacent squares from 1 to 5. Visit every square.');
  const [wordSolution, setWordSolution] = useState('');
  const [wordGuess, setWordGuess] = useState('');
  const [wordGuesses, setWordGuesses] = useState<WordGuess[]>([]);
  const activeTime = useRef(0);
  const prompted = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible' || prompted.current) return;
      activeTime.current += 1000;
      if (activeTime.current >= PROMPT_AFTER_MS) {
        prompted.current = true;
        setPanel('invite');
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const winner = getTicTacToeWinner(board);
  const draw = !winner && board.every((square) => square !== null);
  const sudokuSolved = isMiniSudokuSolved(sudokuBoard);
  const numberTrailSolved = isNumberTrailSolved(numberPath);
  const wordWon = wordGuesses.length > 0 && wordGuesses[wordGuesses.length - 1].word === wordSolution;
  const wordFinished = wordWon || wordGuesses.length >= 6;

  const playHand = (player: HandChoice) => {
    const computer = HAND_CHOICES[Math.floor(Math.random() * HAND_CHOICES.length)].value;
    setRpsRound({ player, computer, result: getHandResult(player, computer) });
  };

  const playSquare = (index: number) => {
    if (board[index] || winner || draw) return;
    const nextBoard = [...board];
    nextBoard[index] = 'X';

    if (!getTicTacToeWinner(nextBoard)) {
      const computerMove = chooseTicTacToeMove(nextBoard);
      if (computerMove !== null) nextBoard[computerMove] = 'O';
    }

    setBoard(nextBoard);
  };

  const startGame = (game: Panel) => {
    if (game === 'tic-tac-toe') setBoard(Array(9).fill(null));
    if (game === 'sudoku') {
      setSudokuBoard(MINI_SUDOKU_PUZZLE.map((row) => [...row]));
      setSelectedSudokuCell(null);
    }
    if (game === 'number-trail') {
      setNumberPath([0]);
      setNumberTrailMessage('Trace adjacent squares from 1 to 5. Visit every square.');
    }
    if (game === 'word-guess') {
      setWordSolution(getDailyWord(localDateValue(new Date())));
      setWordGuess('');
      setWordGuesses([]);
    }
    setPanel(game);
  };

  const placeSudokuNumber = (value: number) => {
    if (selectedSudokuCell === null || sudokuSolved) return;
    const rowIndex = Math.floor(selectedSudokuCell / 4);
    const columnIndex = selectedSudokuCell % 4;
    if (MINI_SUDOKU_PUZZLE[rowIndex][columnIndex] !== 0) return;
    setSudokuBoard((current) => current.map((row, index) => {
      if (index !== rowIndex) return row;
      const updatedRow = [...row];
      updatedRow[columnIndex] = value;
      return updatedRow;
    }));
  };

  const clearSudokuCell = () => {
    if (selectedSudokuCell === null || sudokuSolved) return;
    const rowIndex = Math.floor(selectedSudokuCell / 4);
    const columnIndex = selectedSudokuCell % 4;
    if (MINI_SUDOKU_PUZZLE[rowIndex][columnIndex] !== 0) return;
    setSudokuBoard((current) => current.map((row, index) => {
      if (index !== rowIndex) return row;
      const updatedRow = [...row];
      updatedRow[columnIndex] = 0;
      return updatedRow;
    }));
  };

  const traceNumberCell = (cell: number) => {
    if (numberTrailSolved) return;
    if (!canExtendNumberTrail(numberPath, cell)) {
      setNumberTrailMessage('Follow adjacent squares and reach checkpoints in order.');
      return;
    }
    const nextPath = [...numberPath, cell];
    setNumberPath(nextPath);
    setNumberTrailMessage(isNumberTrailSolved(nextPath) ? 'Trail complete!' : 'Good path. Keep going.');
  };

  const submitWordGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guess = wordGuess.toUpperCase();
    if (!/^[A-Z]{5}$/.test(guess) || wordFinished) return;
    setWordGuesses((current) => [...current, { word: guess, statuses: scoreWordGuess(wordSolution, guess) }]);
    setWordGuess('');
  };

  const closePanel = () => {
    prompted.current = true;
    setPanel('closed');
  };
  const openGames = () => {
    prompted.current = true;
    setPanel('offer');
  };

  const panelTitle = panel === 'offer'
    ? 'Choose a game'
    : panel === 'invite'
      ? 'Quick break?'
    : panel === 'rps'
      ? 'Rock, Paper, Scissors'
      : panel === 'tic-tac-toe'
        ? 'Tic-Tac-Toe'
        : panel === 'sudoku'
          ? 'Mini Sudoku'
          : panel === 'number-trail'
            ? 'Number Trail'
            : 'Word Guess';

  return (
    <QuickGamesContext.Provider value={openGames}>
      {children}
      {panel !== 'closed' && (
      <aside className="fixed inset-x-3 bottom-4 z-[60] mx-auto w-auto max-w-sm sm:inset-x-auto sm:right-4 sm:mx-0 sm:w-[calc(100vw-2rem)]" aria-label="Quick games" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))', right: 'max(1rem, env(safe-area-inset-right))' }}>
      <section className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-xl border shadow-2xl" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: '0 18px 55px rgba(0,0,0,0.22)' }}>
        <header className="flex items-center justify-between gap-3 border-b px-4 py-3" style={{ borderColor: 'var(--border)' }}>
          <h2 className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--text-1)' }}>
            <Gamepad2 className="h-4 w-4" style={{ color: 'var(--accent-1)' }} /> {panelTitle}
          </h2>
          <button type="button" aria-label="Close games" title="Close games" onClick={closePanel} className="rounded-md p-1.5 transition-colors hover:bg-[var(--bg-card-hover)]" style={{ color: 'var(--text-2)' }}>
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="p-4">
          {panel === 'invite' && (
            <div className="flex items-center gap-3">
              <p className="min-w-0 flex-1 text-sm" style={{ color: 'var(--text-2)' }}>Ready for a quick brain break?</p>
              <button type="button" onClick={() => setPanel('offer')} className="btn-primary shrink-0 px-3 py-2 text-xs">Play</button>
              <button type="button" onClick={closePanel} className="shrink-0 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>Not now</button>
            </div>
          )}

          {panel === 'offer' && (
            <div>
              <p className="mb-4 text-sm" style={{ color: 'var(--text-2)' }}>Choose a quick brain break.</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setRpsRound(null); setPanel('rps'); }} className="btn-secondary w-full justify-between">
                  Rock, Paper, Scissors <Scissors className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => startGame('tic-tac-toe')} className="btn-secondary w-full justify-between">
                  Tic-Tac-Toe <span className="font-mono font-bold" style={{ color: 'var(--accent-1)' }}>X O</span>
                </button>
                <button type="button" onClick={() => startGame('sudoku')} className="btn-secondary w-full justify-between">
                  Mini Sudoku <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-1)' }}>1–4</span>
                </button>
                <button type="button" onClick={() => startGame('number-trail')} className="btn-secondary w-full justify-between">
                  Number Trail <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-1)' }}>1→5</span>
                </button>
                <button type="button" onClick={() => startGame('word-guess')} className="btn-secondary col-span-2 w-full justify-between">
                  Word Guess <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent-1)' }}>A–Z</span>
                </button>
              </div>
              <button type="button" onClick={closePanel} className="mt-4 w-full text-center text-xs font-semibold" style={{ color: 'var(--text-3)' }}>Not now</button>
            </div>
          )}

          {panel === 'rps' && (
            <div>
              <button type="button" onClick={() => setPanel('offer')} className="mb-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                <ArrowLeft className="h-3.5 w-3.5" /> All games
              </button>
              <p className="mb-3 text-sm" style={{ color: 'var(--text-2)' }}>Choose your move.</p>
              <div className="grid grid-cols-3 gap-2">
                {HAND_CHOICES.map((choice) => {
                  const Icon = choice.icon;
                  return (
                    <button key={choice.value} type="button" onClick={() => playHand(choice.value)} className="flex flex-col items-center gap-2 rounded-lg border px-2 py-3 text-xs font-semibold transition-colors hover:bg-[var(--bg-card-hover)]" style={{ color: 'var(--text-1)', borderColor: 'var(--border)' }}>
                      <Icon className="h-5 w-5" style={{ color: 'var(--accent-1)' }} /> {choice.label}
                    </button>
                  );
                })}
              </div>
              {rpsRound && (
                <div className="mt-4 rounded-lg p-3 text-center" style={{ background: 'var(--bg-card-hover)' }} aria-live="polite">
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>You chose {rpsRound.player}; computer chose {rpsRound.computer}.</p>
                  <p className="mt-1 font-bold" style={{ color: 'var(--accent-1)' }}>{rpsRound.result === 'draw' ? 'It’s a draw.' : rpsRound.result === 'win' ? 'You win this round.' : 'Computer wins this round.'}</p>
                  <button type="button" onClick={() => setRpsRound(null)} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--text-2)' }}>
                    <RotateCcw className="h-3.5 w-3.5" /> Play again
                  </button>
                </div>
              )}
            </div>
          )}

          {panel === 'tic-tac-toe' && (
            <div>
              <button type="button" onClick={() => setPanel('offer')} className="mb-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                <ArrowLeft className="h-3.5 w-3.5" /> All games
              </button>
              <p className="mb-3 text-xs" style={{ color: 'var(--text-2)' }}>You are X. The computer is O.</p>
              <div className="mx-auto grid max-w-56 grid-cols-3 gap-2" role="group" aria-label="Tic-Tac-Toe board">
                {board.map((square, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${square ? `, ${square}` : ', empty'}`}
                    disabled={Boolean(square) || Boolean(winner) || draw}
                    onClick={() => playSquare(index)}
                    className="aspect-square rounded-lg border text-2xl font-bold transition-colors enabled:hover:bg-[var(--bg-card-hover)] disabled:cursor-default"
                    style={{ color: square === 'X' ? 'var(--accent-1)' : 'var(--text-1)', borderColor: 'var(--border)', background: 'var(--bg-base)' }}
                  >
                    {square}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between gap-2" aria-live="polite">
                <p className="text-xs font-semibold" style={{ color: winner ? 'var(--accent-1)' : 'var(--text-2)' }}>
                  {winner === 'X' ? 'You win!' : winner === 'O' ? 'Computer wins.' : draw ? 'It’s a draw.' : 'Your turn.'}
                </p>
                {(winner || draw) && (
                  <button type="button" onClick={() => setBoard(Array(9).fill(null))} className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent-1)' }}>
                    <RotateCcw className="h-3.5 w-3.5" /> New game
                  </button>
                )}
              </div>
            </div>
          )}

          {panel === 'sudoku' && (
            <div>
              <button type="button" onClick={() => setPanel('offer')} className="mb-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                <ArrowLeft className="h-3.5 w-3.5" /> All games
              </button>
              <p className="mb-3 text-xs" style={{ color: 'var(--text-2)' }}>Fill each row, column, and 2×2 box with 1–4.</p>
              <div className="mx-auto grid max-w-60 grid-cols-4 overflow-hidden rounded-lg border" role="group" aria-label="Mini Sudoku board" style={{ borderColor: 'var(--border)' }}>
                {sudokuBoard.flatMap((row, rowIndex) => row.map((value, columnIndex) => {
                  const index = rowIndex * 4 + columnIndex;
                  const fixed = MINI_SUDOKU_PUZZLE[rowIndex][columnIndex] !== 0;
                  const selected = selectedSudokuCell === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={fixed || sudokuSolved}
                      aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}, ${value || 'empty'}${fixed ? ', fixed' : ''}`}
                      aria-pressed={selected}
                      onClick={() => setSelectedSudokuCell(index)}
                      className={`aspect-square border-b border-r text-lg font-bold transition-colors disabled:cursor-default ${columnIndex % 2 === 1 ? 'border-r-2' : ''} ${rowIndex % 2 === 1 ? 'border-b-2' : ''}`}
                      style={{ background: selected ? 'var(--accent-glow)' : 'var(--bg-base)', borderColor: 'var(--border)', color: fixed ? 'var(--text-1)' : 'var(--accent-1)' }}
                    >
                      {value || ''}
                    </button>
                  );
                }))}
              </div>
              <div className="mx-auto mt-3 grid max-w-60 grid-cols-5 gap-1.5">
                {[1, 2, 3, 4].map((number) => (
                  <button key={number} type="button" disabled={selectedSudokuCell === null || sudokuSolved} onClick={() => placeSudokuNumber(number)} className="rounded-md border py-2 text-sm font-bold disabled:opacity-40" style={{ color: 'var(--text-1)', borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>{number}</button>
                ))}
                <button type="button" disabled={selectedSudokuCell === null || sudokuSolved} onClick={clearSudokuCell} className="rounded-md border py-2 text-xs font-semibold disabled:opacity-40" style={{ color: 'var(--text-2)', borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>Clear</button>
              </div>
              <p className="mt-3 text-center text-xs font-semibold" aria-live="polite" style={{ color: sudokuSolved ? 'var(--accent-1)' : 'var(--text-3)' }}>{sudokuSolved ? 'Puzzle solved!' : selectedSudokuCell === null ? 'Select an empty square.' : 'Choose a number.'}</p>
            </div>
          )}

          {panel === 'number-trail' && (
            <div>
              <button type="button" onClick={() => setPanel('offer')} className="mb-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                <ArrowLeft className="h-3.5 w-3.5" /> All games
              </button>
              <p className="mb-3 text-xs" style={{ color: 'var(--text-2)' }}>Connect neighboring squares from 1 to 5. Visit every square once.</p>
              <div className="mx-auto grid max-w-64 grid-cols-5 gap-1.5" role="group" aria-label="Number Trail board">
                {Array.from({ length: 25 }, (_, cell) => {
                  const checkpoint = NUMBER_TRAIL_CHECKPOINTS[cell];
                  const visited = numberPath.includes(cell);
                  return (
                    <button
                      key={cell}
                      type="button"
                      aria-label={`Square ${cell + 1}${checkpoint ? `, checkpoint ${checkpoint}` : ''}${visited ? ', on path' : ''}`}
                      aria-pressed={visited}
                      disabled={numberTrailSolved}
                      onClick={() => traceNumberCell(cell)}
                      className="aspect-square rounded-md border text-sm font-bold transition-colors disabled:cursor-default"
                      style={{ background: visited ? 'var(--accent-glow)' : 'var(--bg-base)', borderColor: visited ? 'var(--border-accent)' : 'var(--border)', color: checkpoint ? 'var(--accent-1)' : 'var(--text-2)' }}
                    >
                      {checkpoint || (visited ? '·' : '')}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs" role="status" style={{ color: numberTrailSolved ? 'var(--accent-1)' : 'var(--text-3)' }}>{numberTrailMessage}</p>
                <button type="button" onClick={() => { setNumberPath([0]); setNumberTrailMessage('Trace adjacent squares from 1 to 5. Visit every square.'); }} className="shrink-0 text-xs font-semibold" style={{ color: 'var(--accent-1)' }}>Start over</button>
              </div>
            </div>
          )}

          {panel === 'word-guess' && (
            <div>
              <button type="button" onClick={() => setPanel('offer')} className="mb-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                <ArrowLeft className="h-3.5 w-3.5" /> All games
              </button>
              <p className="mb-3 text-xs" style={{ color: 'var(--text-2)' }}>Find the five-letter word in six guesses.</p>
              <div className="mx-auto mb-4 grid w-fit grid-cols-5 gap-1.5" aria-label="Word guess board">
                {wordGuesses.map((guess, rowIndex) => guess.word.split('').map((letter, columnIndex) => {
                  const status = guess.statuses[columnIndex];
                  const tileStyle = status === 'correct'
                    ? { background: 'var(--accent-1)', borderColor: 'var(--accent-1)', color: 'var(--bg-base)' }
                    : status === 'present'
                      ? { background: 'var(--accent-glow)', borderColor: 'var(--border-accent)', color: 'var(--text-1)' }
                      : { background: 'var(--bg-card-hover)', borderColor: 'var(--border)', color: 'var(--text-3)' };
                  return <span key={`${rowIndex}-${columnIndex}`} className="flex h-9 w-9 items-center justify-center rounded-md border font-mono text-sm font-bold" style={tileStyle}>{letter}</span>;
                }))}
              </div>
              {!wordFinished ? (
                <form className="flex gap-2" onSubmit={submitWordGuess}>
                  <label className="sr-only" htmlFor="quick-word-guess">Enter a five-letter word</label>
                  <input id="quick-word-guess" className="form-input uppercase" autoComplete="off" maxLength={5} placeholder="Type 5 letters" value={wordGuess} onChange={(event) => setWordGuess(event.target.value.replace(/[^a-z]/gi, '').toUpperCase())} />
                  <button type="submit" disabled={wordGuess.length !== 5} className="btn-primary shrink-0 px-3 py-2 text-xs disabled:opacity-50">Guess</button>
                </form>
              ) : (
                <p className="text-center text-sm font-semibold" role="status" style={{ color: 'var(--accent-1)' }}>
                  {wordWon ? 'You found it!' : `The word was ${wordSolution}.`}
                  <button type="button" className="ml-2 underline underline-offset-2" onClick={() => startGame('word-guess')}>Play again</button>
                </p>
              )}
              <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px]" style={{ color: 'var(--text-3)' }}>
                <span><b style={{ color: 'var(--accent-1)' }}>Exact</b> · right spot</span>
                <span><b style={{ color: 'var(--text-1)' }}>In word</b> · elsewhere</span>
              </div>
            </div>
          )}
        </div>
      </section>
      </aside>
      )}
    </QuickGamesContext.Provider>
  );
}