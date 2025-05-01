import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Board } from './board';
import { SQUARE_VALUES, GAME_STATUS } from '../../constants/constants';
import { useBoard } from '../../hooks/use-board/use-board';

expect.extend(toHaveNoViolations);

const mockPlaySquare = vi.fn();
const mockBoardState = {
  board: Array(3)
    .fill(null)
    .map((_, row) =>
      Array(3)
        .fill(null)
        .map((_, column) => ({
          id: `${row}-${column}`,
          value: SQUARE_VALUES.EMPTY,
        })),
    ),
  lastPlayedValue: SQUARE_VALUES.EMPTY,
  gameStatus: GAME_STATUS.IN_PROGRESS,
  playSquare: mockPlaySquare,
};

vi.mock('../../hooks/use-board/use-board', () => ({
  useBoard: vi.fn().mockImplementation(() => mockBoardState),
}));

describe('<Board>', () => {
  it('should render without crashing', () => {
    render(<Board boardSize={3} />);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Board boardSize={3} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render a board with correct number of squares', () => {
    render(<Board boardSize={3} />);
    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(9);
  });

  it('should show game status', () => {
    render(<Board boardSize={3} />);
    expect(screen.getByText('Game status: In Progress')).toBeInTheDocument();
  });

  it('should call `playSquare` when clicking a square', () => {
    render(<Board boardSize={3} />);
    const squares = screen.getAllByRole('button');
    fireEvent.click(squares[0]);
    expect(mockPlaySquare).toHaveBeenCalledWith(0, 0);
  });

  it('should call `playSquare` when pressing Enter on a square', () => {
    render(<Board boardSize={3} />);
    const squares = screen.getAllByRole('button');
    fireEvent.keyDown(squares[0], { key: 'Enter' });
    expect(mockPlaySquare).toHaveBeenCalledWith(0, 0);
  });

  it('should call `playSquare` when pressing Space on a square', () => {
    render(<Board boardSize={3} />);
    const squares = screen.getAllByRole('button');
    fireEvent.keyDown(squares[0], { key: ' ' });
    expect(mockPlaySquare).toHaveBeenCalledWith(0, 0);
  });

  it('should show winning player when game is won', () => {
    (useBoard as jest.Mock).mockImplementationOnce(() => ({
      ...mockBoardState,
      lastPlayedValue: SQUARE_VALUES.X,
      gameStatus: GAME_STATUS.WIN,
    }));

    render(<Board boardSize={3} />);
    expect(screen.getByText('Game status: Win for X')).toBeInTheDocument();
  });

  it('should apply `gameOver` class when game is not in progress', () => {
    (useBoard as jest.Mock).mockImplementationOnce(() => ({
      ...mockBoardState,
      lastPlayedValue: SQUARE_VALUES.X,
      gameStatus: GAME_STATUS.WIN,
    }));

    const { container } = render(<Board boardSize={3} />);
    expect(container.firstChild).toHaveClass(/gameOver/);
  });

  it('should handle draw game status', () => {
    (useBoard as jest.Mock).mockImplementationOnce(() => ({
      ...mockBoardState,
      lastPlayedValue: SQUARE_VALUES.O,
      gameStatus: GAME_STATUS.DRAW,
    }));

    render(<Board boardSize={3} />);
    expect(screen.getByText('Game status: Draw')).toBeInTheDocument();
  });
});
