import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock('../app/app', () => ({
  default: () => <div data-testid="mock-app">Mock App</div>,
}));

vi.mock('../../styles/index.css', () => ({}));

describe('Main Entry Point', () => {
  beforeAll(() => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  it('should render the app in strict mode', async () => {
    await import('./main');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));

    const mockRoot = (createRoot as jest.Mock).mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalledTimes(1);

    const renderArg = mockRoot.render.mock.calls[0][0];
    expect(renderArg.type).toBe(StrictMode);
  });
});
