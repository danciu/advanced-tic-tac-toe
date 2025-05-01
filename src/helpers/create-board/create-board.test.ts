import { MOCK_BOARD } from '../../constants/constants';
import { createBoard } from './create-board';

describe('createBoard()', () => {
  it('should not accept a board size smaller than 3', () => {
    expect(() => createBoard(2)).toThrow(
      'Tic Tac Toe requires a grid of at least 3x3 squares',
    );
  });

  it('should return a board with correctly positioned squares', () => {
    const grid = createBoard(3);

    expect(grid).toEqual(MOCK_BOARD);
  });
});
