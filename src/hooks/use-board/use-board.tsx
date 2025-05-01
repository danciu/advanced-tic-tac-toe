import { useEffect, useState } from 'react';

import { SQUARE_VALUES, GAME_STATUS } from '../../constants/constants';
import { createBoard } from '../../helpers/create-board/create-board';
import { getGameStatus } from '../../helpers/get-game-status/get-game-status';

export const useBoard = (boardSize: number) => {
  const [boardState, setBoardState] = useState({
    board: createBoard(boardSize),
    squaresPlayed: 0,
    lastPlayedValue: SQUARE_VALUES.EMPTY,
    gameStatus: GAME_STATUS.IN_PROGRESS,
  });
  const { board, squaresPlayed, lastPlayedValue, gameStatus } = boardState;

  useEffect(() => {
    setBoardState({
      board: createBoard(boardSize),
      squaresPlayed: 0,
      lastPlayedValue: SQUARE_VALUES.EMPTY,
      gameStatus: GAME_STATUS.IN_PROGRESS,
    });
  }, [boardSize]);

  const playSquare = (row: number, column: number) => {
    if (board[row][column].value) {
      return;
    }

    const value =
      lastPlayedValue === SQUARE_VALUES.X ? SQUARE_VALUES.O : SQUARE_VALUES.X;
    const updatedBoard = board.map((_, row) => [...board[row]]);
    const updatedSquaresPlayed = squaresPlayed + 1;
    updatedBoard[row][column] = { ...updatedBoard[row][column], value };

    setBoardState({
      board: updatedBoard,
      squaresPlayed: updatedSquaresPlayed,
      lastPlayedValue: value,
      gameStatus: getGameStatus(
        updatedBoard,
        updatedSquaresPlayed,
        row,
        column,
      ),
    });
  };

  return { board, squaresPlayed, lastPlayedValue, gameStatus, playSquare };
};
