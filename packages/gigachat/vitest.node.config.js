const path = require('path')
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.test.ts', '**/*.test.tsx'],
    env: {
      NODE_ENV: 'test',
      NODE_EXTRA_CA_CERTS: path.resolve(__dirname, 'certs'),
      NODE_TLS_REJECT_UNAUTHORIZED: '0',
    },
  },
});
