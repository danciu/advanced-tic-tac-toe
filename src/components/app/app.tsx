import { useState } from 'react';

import { Board } from '../board/board';
import { DEFAULT_BOARD_SIZE } from '../../constants/constants';

import styles from './app.module.scss';

function App() {
  const [boardSize, setBoardSize] = useState(DEFAULT_BOARD_SIZE);

  const changeBoardSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = Number(e.target.value);

    setBoardSize(size);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>tic-tac-toe</h1>
        <div>
          <label htmlFor="board-size-select" className={styles.label}>
            Select board size:
          </label>
          <select
            id="board-size-select"
            onChange={changeBoardSize}
            value={boardSize}
            aria-label="Select board size"
          >
            <option value="3">3x3</option>
            <option value="4">4x4</option>
            <option value="5">5x5</option>
            <option value="6">6x6</option>
            <option value="7">7x7</option>
            <option value="8">8x8</option>
            <option value="9">9x9</option>
            <option value="10">10x10</option>
          </select>
        </div>
      </header>
      <div className={styles.gameWrapper}>
        <Board boardSize={boardSize} />
      </div>
    </>
  );
}

export default App;
