export type HandChoice = 'rock' | 'paper' | 'scissors';
export type GameResult = 'win' | 'loss' | 'draw';
export type TicTacToeMark = 'X' | 'O' | null;
export type WordLetterStatus = 'correct' | 'present' | 'absent';

export const MINI_SUDOKU_PUZZLE = [
  [1, 0, 3, 0],
  [3, 4, 0, 2],
  [0, 1, 4, 0],
  [4, 0, 2, 1],
];

export const WORD_GUESS_WORDS = ['BRAVE', 'CLOUD', 'CRANE', 'GRAPE', 'LIGHT', 'MOUSE', 'PLANT', 'SHARE', 'STONE', 'TRAIN', 'WATER', 'WORLD'];

export const NUMBER_TRAIL_CHECKPOINTS: Readonly<Record<number, number>> = { 0: 1, 4: 2, 12: 3, 15: 4, 24: 5 };

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function getHandResult(player: HandChoice, computer: HandChoice): GameResult {
  if (player === computer) return 'draw';
  const playerWins =
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper');
  return playerWins ? 'win' : 'loss';
}

export function getTicTacToeWinner(board: readonly TicTacToeMark[]): Exclude<TicTacToeMark, null> | null {
  for (const [first, second, third] of WINNING_LINES) {
    const mark = board[first];
    if (mark && mark === board[second] && mark === board[third]) return mark;
  }
  return null;
}

function completesLine(board: readonly TicTacToeMark[], index: number, mark: Exclude<TicTacToeMark, null>): boolean {
  const nextBoard = [...board];
  nextBoard[index] = mark;
  return getTicTacToeWinner(nextBoard) === mark;
}

export function chooseTicTacToeMove(board: readonly TicTacToeMark[]): number | null {
  if (board.length !== 9 || getTicTacToeWinner(board)) return null;
  const emptySpaces = board.map((mark, index) => mark === null ? index : -1).filter((index) => index >= 0);
  if (emptySpaces.length === 0) return null;

  const winningMove = emptySpaces.find((index) => completesLine(board, index, 'O'));
  if (winningMove !== undefined) return winningMove;

  const blockingMove = emptySpaces.find((index) => completesLine(board, index, 'X'));
  if (blockingMove !== undefined) return blockingMove;
  if (board[4] === null) return 4;

  const corners = emptySpaces.filter((index) => [0, 2, 6, 8].includes(index));
  if (corners.length > 0) return corners[0];
  return emptySpaces[0];
}

export function isMiniSudokuSolved(board: readonly (readonly number[])[]): boolean {
  if (board.length !== 4 || board.some((row) => row.length !== 4)) return false;
  const isCompleteGroup = (values: readonly number[]) => values.length === 4 && new Set(values).size === 4 && values.every((value) => value >= 1 && value <= 4);

  for (let index = 0; index < 4; index += 1) {
    if (!isCompleteGroup(board[index])) return false;
    if (!isCompleteGroup(board.map((row) => row[index]))) return false;
  }

  for (let boxRow = 0; boxRow < 4; boxRow += 2) {
    for (let boxColumn = 0; boxColumn < 4; boxColumn += 2) {
      const box = [
        board[boxRow][boxColumn], board[boxRow][boxColumn + 1],
        board[boxRow + 1][boxColumn], board[boxRow + 1][boxColumn + 1],
      ];
      if (!isCompleteGroup(box)) return false;
    }
  }

  return true;
}

export function canExtendNumberTrail(path: readonly number[], nextCell: number, size = 5): boolean {
  if (nextCell < 0 || nextCell >= size * size || path.includes(nextCell)) return false;
  const lastCell = path[path.length - 1];
  if (lastCell === undefined) return nextCell === 0;

  const lastRow = Math.floor(lastCell / size);
  const lastColumn = lastCell % size;
  const nextRow = Math.floor(nextCell / size);
  const nextColumn = nextCell % size;
  if (Math.abs(lastRow - nextRow) + Math.abs(lastColumn - nextColumn) !== 1) return false;

  const checkpointReached = path.reduce((highest, cell) => Math.max(highest, NUMBER_TRAIL_CHECKPOINTS[cell] || 0), 0);
  const checkpoint = NUMBER_TRAIL_CHECKPOINTS[nextCell];
  return checkpoint === undefined || checkpoint === checkpointReached + 1;
}

export function isNumberTrailSolved(path: readonly number[], size = 5): boolean {
  return path.length === size * size && path[path.length - 1] === size * size - 1 && new Set(path).size === size * size;
}

export function getDailyWord(date: string): string {
  const seed = date.split('-').reduce((value, part) => value * 31 + Number(part), 0);
  return WORD_GUESS_WORDS[Math.abs(seed) % WORD_GUESS_WORDS.length];
}

export function scoreWordGuess(solution: string, guess: string): WordLetterStatus[] {
  const target = solution.toUpperCase();
  const attempt = guess.toUpperCase();
  if (target.length !== 5 || attempt.length !== 5) return [];

  const statuses: WordLetterStatus[] = Array(5).fill('absent');
  const remaining = new Map<string, number>();

  for (let index = 0; index < 5; index += 1) {
    if (attempt[index] === target[index]) {
      statuses[index] = 'correct';
    } else {
      remaining.set(target[index], (remaining.get(target[index]) || 0) + 1);
    }
  }

  for (let index = 0; index < 5; index += 1) {
    if (statuses[index] === 'correct') continue;
    const matchesRemaining = remaining.get(attempt[index]) || 0;
    if (matchesRemaining > 0) {
      statuses[index] = 'present';
      remaining.set(attempt[index], matchesRemaining - 1);
    }
  }

  return statuses;
}