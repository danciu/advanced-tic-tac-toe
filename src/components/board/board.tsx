import { GAME_STATUS } from '../../constants/constants';
import { useBoard } from '../../hooks/use-board/use-board';

import styles from './board.module.scss';

type TProps = {
  boardSize: number;
};

export function Board({ boardSize }: TProps) {
  const { board, lastPlayedValue, gameStatus, playSquare } =
    useBoard(boardSize);
  const squareSize = `calc(50vw / ${board.length})`;
  const isGameOver = gameStatus !== GAME_STATUS.IN_PROGRESS;

  return (
    <div className={isGameOver ? styles.gameOver : ''}>
      <div className={styles.gameStatus}>
        <h3>
          Game status: {gameStatus}
          {gameStatus === GAME_STATUS.WIN ? ' for ' + lastPlayedValue : ''}
        </h3>
      </div>
      <div
        style={{
          gridTemplateColumns: `repeat(${board.length}, ${squareSize})`,
          gridTemplateRows: `repeat(${board.length}, ${squareSize})`,
        }}
        className={styles.board}
      >
        {board.map((row, rowIndex) =>
          row.map((square, squareIndex) => (
            <div
              key={square.id}
              style={{ width: squareSize, height: squareSize }}
              className={styles.square}
              onClick={() => {
                playSquare(rowIndex, squareIndex);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playSquare(rowIndex, squareIndex);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Square ${squareIndex + 1} from row ${rowIndex + 1} is ${square.value || 'empty'}`}
              aria-disabled={isGameOver}
            >
              <span>{square.value}</span>
            </div>
          )),
        )}
      </div>
    </div>
  );
}
