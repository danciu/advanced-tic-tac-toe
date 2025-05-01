export type TSquare = {
  id: string;
  value: string;
};

export const createBoard = (size: number): TSquare[][] => {
  if (size < 3) {
    throw new Error('Tic Tac Toe requires a grid of at least 3x3 squares');
  }

  return Array.from({ length: size }, (_, row) => {
    let rowSquares = [];

    for (var column = 0; column < size; column++) {
      rowSquares.push({
        id: `${row}-${column}`,
        value: '',
      });
    }

    return rowSquares;
  });
};
