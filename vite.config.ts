import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // CHANGE: Hardcoded repo name is required for PWA to work correctly on iOS GitHub Pages
    base: '/tozamap/', 
    define: {
      // Robustly find the API key from various common environment variable names.
      // This fixes the "Invalid API Key" error by prioritizing process.env.API_KEY.
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY || env.VITE_GEMINI_API_KEY || ''),
    }
  };
});
