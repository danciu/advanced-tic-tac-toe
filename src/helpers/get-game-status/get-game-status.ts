import { GAME_STATUS } from '../../constants/constants';
import { TSquare } from '../create-board/create-board';

export const getGameStatus = (
  updatedBoard: TSquare[][],
  squaresPlayed: number,
  row: number,
  column: number,
) => {
  const boardSize = updatedBoard.length;
  const currentPlayedValue = updatedBoard[row][column].value;

  // Check win on the current row
  if (
    updatedBoard[row].every((square) => square.value === currentPlayedValue)
  ) {
    return GAME_STATUS.WIN;
  }
  // Check win on the current column
  if (updatedBoard.every((row) => row[column].value === currentPlayedValue)) {
    return GAME_STATUS.WIN;
  }
  // Check win on the main diagonal, but only if the square is part of it
  if (
    row === column &&
    updatedBoard.every((row, index) => row[index].value === currentPlayedValue)
  ) {
    return GAME_STATUS.WIN;
  }
  // Check win on the secondary diagonal, but only if the square is part of it
  if (
    row + column === boardSize - 1 &&
    updatedBoard.every(
      (row, index) => row[boardSize - 1 - index].value === currentPlayedValue,
    )
  ) {
    return GAME_STATUS.WIN;
  }
  // Check for draw
  if (squaresPlayed === boardSize ** 2) {
    return GAME_STATUS.DRAW;
  }
  return GAME_STATUS.IN_PROGRESS;
};
