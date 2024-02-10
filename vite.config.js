import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      // Checker({ types: ['build'] }),
    ],
    server: {
      // 以下のパラメータを指定しないとapp.css, app.jsのURLが0.0.0.0になってしまうため、明示的にlocalhostに変更
      hmr: {
        host: 'localhost'
      },
      // Windowsアプリでファイル編集した際に監視されない問題があるため、usePolling:trueにすることで監視を強制させる
      // https://vitejs.dev/config/server-options.html#server-watch
      watch: {
        usePolling: true
      }
    },
    build: {
      rollupOptions: {
        plugins: [
          visualizer(),
        ],
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom', '@chakra-ui/icons', '@chakra-ui/react'],
            editwand: ['@dnd-kit/core', '@dnd-kit/utilities', '@dnd-kit/sortable', 'uuid'],
          },
        },
      },
    },
  };
});