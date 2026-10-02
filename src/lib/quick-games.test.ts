import { describe, expect, it } from 'vitest';
import {
  canExtendNumberTrail,
  chooseTicTacToeMove,
  getDailyWord,
  getHandResult,
  getTicTacToeWinner,
  isMiniSudokuSolved,
  isNumberTrailSolved,
  MINI_SUDOKU_PUZZLE,
  scoreWordGuess,
} from './quick-games';

describe('quick game rules', () => {
  it('resolves rock-paper-scissors rounds', () => {
    expect(getHandResult('rock', 'scissors')).toBe('win');
    expect(getHandResult('paper', 'scissors')).toBe('loss');
    expect(getHandResult('rock', 'rock')).toBe('draw');
  });

  it('detects tic-tac-toe wins and draws', () => {
    expect(getTicTacToeWinner(['X', 'X', 'X', 'O', 'O', null, null, null, null])).toBe('X');
    expect(getTicTacToeWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])).toBeNull();
  });

  it('takes a winning move or blocks an immediate player win', () => {
    expect(chooseTicTacToeMove(['O', 'O', null, 'X', 'X', null, null, null, null])).toBe(2);
    expect(chooseTicTacToeMove(['X', 'X', null, 'O', null, null, null, null, null])).toBe(2);
  });

  it('returns no move after a win or a full board', () => {
    expect(chooseTicTacToeMove(['X', 'X', 'X', 'O', 'O', null, null, null, null])).toBeNull();
    expect(chooseTicTacToeMove(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'])).toBeNull();
  });

  it('validates a completed 4x4 Sudoku grid', () => {
    expect(isMiniSudokuSolved(MINI_SUDOKU_PUZZLE)).toBe(false);
    expect(isMiniSudokuSolved([[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]])).toBe(true);
    expect(isMiniSudokuSolved([[1, 1, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]])).toBe(false);
  });

  it('enforces adjacency, numbered checkpoints, and a full number trail', () => {
    const solution = [0, 1, 2, 3, 4, 9, 8, 7, 6, 5, 10, 11, 12, 13, 14, 19, 18, 17, 16, 15, 20, 21, 22, 23, 24];
    let path = [solution[0]];
    for (const cell of solution.slice(1)) {
      expect(canExtendNumberTrail(path, cell)).toBe(true);
      path = [...path, cell];
    }
    expect(isNumberTrailSolved(path)).toBe(true);
    expect(canExtendNumberTrail([0], 6)).toBe(false);
    expect(canExtendNumberTrail([0, 4], 12)).toBe(false);
  });

  it('chooses a stable daily word and scores duplicate letters once', () => {
    expect(getDailyWord('2026-09-28')).toBe(getDailyWord('2026-09-28'));
    expect(scoreWordGuess('APPLE', 'ALLEY')).toEqual(['correct', 'present', 'absent', 'present', 'absent']);
    expect(scoreWordGuess('WATER', 'WATER')).toEqual(['correct', 'correct', 'correct', 'correct', 'correct']);
  });
});