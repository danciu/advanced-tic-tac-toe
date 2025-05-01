import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import App from './app';
import { DEFAULT_BOARD_SIZE } from '../../constants/constants';

expect.extend(toHaveNoViolations);

const mockSetBoardSize = vi.fn();
const mockUseState = vi
  .fn()
  .mockImplementation((initialValue) => [initialValue, mockSetBoardSize]);

vi.mock('../board/board', () => ({
  Board: vi.fn(({ boardSize }) => (
    <div data-testid="mock-board">
      Mock Board: {boardSize}x{boardSize}
    </div>
  )),
}));

vi.mock('react', () => ({
  useState: (...args: unknown[]) => mockUseState(...args),
}));

describe('<App>', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseState.mockImplementation((initialValue) => [
      initialValue,
      mockSetBoardSize,
    ]);
  });

  it('should render without crashing', () => {
    render(<App />);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render the title', () => {
    render(<App />);
    expect(screen.getByText('tic-tac-toe')).toBeInTheDocument();
  });

  it('should render the board size selector', () => {
    render(<App />);
    expect(screen.getByText('Select board size:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render all board size options', () => {
    render(<App />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(8);
  });

  it('should render the Board component with default size initially', () => {
    render(<App />);
    expect(screen.getByTestId('mock-board')).toHaveTextContent(
      `Mock Board: ${DEFAULT_BOARD_SIZE}x${DEFAULT_BOARD_SIZE}`,
    );
  });

  it('should update board size when selecting a different option', () => {
    render(<App />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '5' } });
    expect(mockSetBoardSize).toHaveBeenCalledWith(5);
  });

  it('should render board with updated size when state changes', () => {
    mockUseState.mockImplementation(() => [5, mockSetBoardSize]);

    render(<App />);
    expect(screen.getByTestId('mock-board')).toHaveTextContent(
      'Mock Board: 5x5',
    );
  });

  it('should convert selected value to number when changing board size', () => {
    render(<App />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '7' } });
    expect(mockSetBoardSize).toHaveBeenCalledWith(7);
    expect(typeof mockSetBoardSize.mock.calls[0][0]).toBe('number');
  });

  it('should handle multiple board size changes', () => {
    render(<App />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '4' } });
    expect(mockSetBoardSize).toHaveBeenCalledWith(4);

    fireEvent.change(select, { target: { value: '8' } });
    expect(mockSetBoardSize).toHaveBeenCalledWith(8);

    expect(mockSetBoardSize).toHaveBeenCalledTimes(2);
  });
});
