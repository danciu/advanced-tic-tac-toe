# Advanced Tic Tac Toe

A flexible and modern implementation of the classic Tic Tac Toe game, supporting variable grid sizes for enhanced gameplay.

[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](coverage/coverage-final.json)

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS Modules
- Vitest
- React Testing Library
- ESLint + Prettier

## Features

- Variable grid sizes from 3x3 up to 10x10
- Clean, responsive UI using CSS Modules
- Single-player mode (play against yourself)
- Full keyboard accessibility
- Real-time game state tracking
- Visual feedback for game status (win/draw/in progress)

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/advanced-tic-tac-toe.git

# Change directory
cd advanced-tic-tac-toe

# Install dependencies
yarn install
```

### Development

```bash
# Start development server
yarn dev

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run linter
yarn lint

# Build for production
yarn build
```

## Project Structure

```
advanced-tic-tac-toe/
├── src/
│   ├── components/     # React components
│   ├── constants/      # Game constants and configuration
│   ├── helpers/        # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── types/          # TypeScript type definitions
├── tests/               # Test files
└── public/              # Static assets
```

## Code Quality

- 100% test coverage across all components and utilities
- Strict TypeScript configuration
- ESLint + Prettier for consistent code style
- Comprehensive test suite using Vitest and React Testing Library

## Upcoming Features

- Computer opponent using the minimax algorithm
- Game history and replay functionality
- Customizable player markers
- Animation effects

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
