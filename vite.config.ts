import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `--mode single` inlines everything into one HTML file for the Artifact preview.
// `base: './'` makes every asset URL relative, so the same build works at a domain root
// (user.github.io) and in a sub-folder (user.github.io/repo/, i.e. GitHub Pages project sites).
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: {
    outDir: mode === 'single' ? 'dist-single' : 'dist',
    chunkSizeWarningLimit: 2000,
  },
}))
