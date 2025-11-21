import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    base: './', // Makes paths relative for GitHub Pages deployment
    define: {
      // This ensures 'process.env.API_KEY' is replaced with the actual string value during build
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      // This prevents "process is not defined" error if some library tries to access process.env
      'process.env': {} 
    }
  };
});
