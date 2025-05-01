import { defineConfig as vitestDefineConfig } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
const config = defineConfig({
  plugins: [react()],
});

// Vitest configuration
const testConfig = vitestDefineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    globals: true,
    setupFiles: 'vitest.setup.ts',
  },
});

export default {
  ...config,
  ...testConfig,
};
