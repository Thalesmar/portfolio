import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Check if we're building for GitHub Pages or Cloudflare
  const isGitHubPages = mode === 'github'
  const base = isGitHubPages ? '/portfolio/' : '/'
  
  return {
    plugins: [react()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})