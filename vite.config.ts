import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 如果 index.html 就在專案根目錄，嘗試註釋掉這行
  // root: '.', 
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true // 確保埠號固定，方便 Docker 轉發
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
