import { GAME_STATUS } from '../../constants/constants';
import { TSquare } from '../create-board/create-board';
import { getGameStatus } from './get-game-status';

describe('getGameStatus()', () => {
  it('should return `Win` when X wins on a row', () => {
    const board = [
      [{ value: 'X' }, { value: 'X' }, { value: 'X' }],
      [{ value: 'O' }, { value: 'O' }, { value: '' }],
      [{ value: '' }, { value: '' }, { value: '' }],
    ] as TSquare[][];

    expect(getGameStatus(board, 5, 0, 2)).toBe(GAME_STATUS.WIN);
  });

  it('should return `Win` when O wins on a column', () => {
    const board = [
      [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
      [{ value: 'X' }, { value: 'O' }, { value: '' }],
      [{ value: '' }, { value: 'O' }, { value: '' }],
    ] as TSquare[][];
    expect(getGameStatus(board, 6, 2, 1)).toBe(GAME_STATUS.WIN);
  });

  it('should return `Win` when X wins on the main diagonal', () => {
    const board = [
      [{ value: 'X' }, { value: 'O' }, { value: '' }],
      [{ value: 'O' }, { value: 'X' }, { value: '' }],
      [{ value: '' }, { value: '' }, { value: 'X' }],
    ] as TSquare[][];

    expect(getGameStatus(board, 5, 2, 2)).toBe(GAME_STATUS.WIN);
  });

  it('should return `Win` when O wins on the secondary diagonal', () => {
    const board = [
      [{ value: 'X' }, { value: '' }, { value: 'O' }],
      [{ value: 'X' }, { value: 'O' }, { value: '' }],
      [{ value: 'O' }, { value: '' }, { value: 'X' }],
    ] as TSquare[][];

    expect(getGameStatus(board, 6, 1, 1)).toBe(GAME_STATUS.WIN);
  });

  it('should return `Draw` when the game is a draw', () => {
    const board = [
      [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
      [{ value: 'X' }, { value: 'O' }, { value: 'O' }],
      [{ value: 'O' }, { value: 'X' }, { value: 'X' }],
    ] as TSquare[][];
    expect(getGameStatus(board, 9, 2, 2)).toBe(GAME_STATUS.DRAW);
  });

  it('should return `In Progress` when the game is still in progress', () => {
    const board = [
      [{ value: 'X' }, { value: '' }, { value: 'O' }],
      [{ value: 'X' }, { value: 'O' }, { value: '' }],
      [{ value: '' }, { value: '' }, { value: '' }],
    ] as TSquare[][];
    expect(getGameStatus(board, 4, 1, 1)).toBe(GAME_STATUS.IN_PROGRESS);
  });
});
