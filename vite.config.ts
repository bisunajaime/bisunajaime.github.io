import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { seo } from './scripts/vite-plugin-seo'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    // Prerenders the homepage at build time (see the file for what else it generates).
    seo(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Hashed JS/CSS go to /_app/ (not /assets/, which also holds unhashed public images) so
  // vercel.json can cache them for a year without catching images that change in place.
  build: {
    assetsDir: '_app',
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
