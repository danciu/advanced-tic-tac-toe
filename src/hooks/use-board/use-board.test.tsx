import { useState, useEffect } from 'react';
import { renderHook } from '@testing-library/react';

import {
  SQUARE_VALUES,
  GAME_STATUS,
  MOCK_BOARD,
} from '../../constants/constants';
import { createBoard } from '../../helpers/create-board/create-board';
import { getGameStatus } from '../../helpers/get-game-status/get-game-status';
import { useBoard } from './use-board';

const mockSetState = vi.fn();

vi.mock('react', () => ({
  useState: vi.fn(),
  useEffect: vi.fn(),
}));

vi.mock('../../helpers/create-board/create-board', () => ({
  createBoard: vi.fn(() => MOCK_BOARD.concat()),
}));

vi.mock('../../helpers/get-game-status/get-game-status', () => ({
  getGameStatus: vi.fn(() => GAME_STATUS.IN_PROGRESS),
}));

describe('useBoard()', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useState as jest.Mock).mockImplementation((init) => [init, mockSetState]);
    (useEffect as jest.Mock).mockImplementation((cb) => cb());
  });

  it('should initialize board with correct default values', () => {
    const boardSize = 3;
    const { result } = renderHook(() => useBoard(boardSize));

    expect(createBoard).toHaveBeenCalledWith(boardSize);
    expect(result.current.squaresPlayed).toBe(0);
    expect(result.current.lastPlayedValue).toBe(SQUARE_VALUES.EMPTY);
    expect(result.current.gameStatus).toBe(GAME_STATUS.IN_PROGRESS);
  });

  it('should reset board when boardSize changes', () => {
    const initialBoardSize = 3;
    const { rerender } = renderHook(({ size }) => useBoard(size), {
      initialProps: { size: initialBoardSize },
    });

    expect(createBoard).toHaveBeenCalledWith(initialBoardSize);
    expect(mockSetState).toHaveBeenCalledWith({
      board: expect.any(Array),
      squaresPlayed: 0,
      lastPlayedValue: SQUARE_VALUES.EMPTY,
      gameStatus: GAME_STATUS.IN_PROGRESS,
    });

    // Reset mock counts for clearer assertions
    mockSetState.mockClear();
    (createBoard as jest.Mock).mockClear();

    // Rerender with new board size
    rerender({ size: 4 });

    expect(createBoard).toHaveBeenCalledWith(4);
    expect(mockSetState).toHaveBeenCalledWith({
      board: expect.any(Array),
      squaresPlayed: 0,
      lastPlayedValue: SQUARE_VALUES.EMPTY,
      gameStatus: GAME_STATUS.IN_PROGRESS,
    });
  });

  describe('playSquare()', () => {
    it('should not update board if square is already played', () => {
      const boardWithPlayedSquare = [
        [
          { id: '0-0', value: SQUARE_VALUES.X },
          { id: '0-1', value: SQUARE_VALUES.EMPTY },
          { id: '0-2', value: SQUARE_VALUES.EMPTY },
        ],
        [
          { id: '1-0', value: SQUARE_VALUES.EMPTY },
          { id: '1-1', value: SQUARE_VALUES.EMPTY },
          { id: '1-2', value: SQUARE_VALUES.EMPTY },
        ],
        [
          { id: '2-0', value: SQUARE_VALUES.EMPTY },
          { id: '2-1', value: SQUARE_VALUES.EMPTY },
          { id: '2-2', value: SQUARE_VALUES.EMPTY },
        ],
      ];

      (useState as jest.Mock).mockImplementationOnce(() => [
        {
          board: boardWithPlayedSquare,
          squaresPlayed: 1,
          lastPlayedValue: SQUARE_VALUES.X,
          gameStatus: GAME_STATUS.IN_PROGRESS,
        },
        mockSetState,
      ]);

      const { result } = renderHook(() => useBoard(3));
      mockSetState.mockReset();
      result.current.playSquare(0, 0);

      expect(mockSetState).not.toHaveBeenCalled();
    });

    it('should update board with correct player move', () => {
      const initialState = {
        board: [...MOCK_BOARD],
        squaresPlayed: 0,
        lastPlayedValue: SQUARE_VALUES.EMPTY,
        gameStatus: GAME_STATUS.IN_PROGRESS,
      };

      (useState as jest.Mock).mockImplementationOnce(() => [
        initialState,
        mockSetState,
      ]);

      const { result } = renderHook(() => useBoard(3));
      result.current.playSquare(1, 1);

      expect(mockSetState).toHaveBeenCalledWith({
        ...initialState,
        board: expect.arrayContaining([
          expect.arrayContaining([
            expect.objectContaining({ value: expect.any(String) }),
          ]),
        ]),
        squaresPlayed: 1,
        lastPlayedValue: SQUARE_VALUES.X,
        gameStatus: expect.any(String),
      });
    });

    it('should alternate between players', () => {
      let currentState = {
        board: [...MOCK_BOARD],
        squaresPlayed: 0,
        lastPlayedValue: SQUARE_VALUES.EMPTY,
        gameStatus: GAME_STATUS.IN_PROGRESS,
      };

      // First move
      (useState as jest.Mock).mockImplementationOnce(() => [
        currentState,
        mockSetState,
      ]);

      const { result, rerender } = renderHook(() => useBoard(3));
      result.current.playSquare(0, 0);

      expect(mockSetState).toHaveBeenCalledWith(
        expect.objectContaining({
          lastPlayedValue: SQUARE_VALUES.X,
        }),
      );

      // Second move
      (useState as jest.Mock).mockImplementationOnce(() => [
        { ...currentState, squaresPlayed: 1, lastPlayedValue: SQUARE_VALUES.X },
        mockSetState,
      ]);

      rerender();
      result.current.playSquare(0, 1);

      expect(mockSetState).toHaveBeenCalledWith(
        expect.objectContaining({
          lastPlayedValue: SQUARE_VALUES.O,
        }),
      );
    });

    it('should update game status after each move', () => {
      const initialState = {
        board: [...MOCK_BOARD],
        squaresPlayed: 0,
        lastPlayedValue: SQUARE_VALUES.EMPTY,
        gameStatus: GAME_STATUS.IN_PROGRESS,
      };

      (useState as jest.Mock).mockImplementationOnce(() => [
        initialState,
        mockSetState,
      ]);

      const { result } = renderHook(() => useBoard(3));
      result.current.playSquare(0, 0);

      expect(getGameStatus).toHaveBeenCalledWith(expect.any(Array), 1, 0, 0);
    });
  });
});
