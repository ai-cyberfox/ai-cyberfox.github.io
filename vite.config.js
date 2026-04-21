import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'  // faster than babel
import react from '@vitejs/plugin-react'


// For a user/org site (username.github.io) the base is '/'
// For a project site (username.github.io/repo-name) change base to '/repo-name/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {                          // ✅ function, not object
          if (id.includes('node_modules')) {
            if (id.includes('three'))               return 'three-core'
            if (id.includes('@react-three'))        return 'r3f'
            if (id.includes('gsap'))                return 'gsap'
            if (id.includes('react-dom') ||
                id.includes('react/index'))         return 'react'
          }
        },
      },
    },
  },
})