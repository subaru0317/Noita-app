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

// // export default defineConfig({
// //   plugins: [
// //     react(),
// //     {
// //       name: "configure-response-headers",
// //       configureServer: (server) => {
// //         server.middlewares.use((_req, res, next) => {
// //           const isFFmpegWasm = _req.originalUrl.includes('ffmpeg');
// //           if (isFFmpegWasm) {
// //             res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
// //             res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
// //           }
// //           next();
// //         });
// //       },
// //     },
// //   ],
// // })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//     react(),
//     {
//       name: "configure-response-headers",
//       configureServer: (server) => {
//         server.middlewares.use((_req, res, next) => {
//           res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//           res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//           next();
//         });
//       },
//     },
//   ],
// });


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//     react(),
//     {
//       name: "configure-response-headers",
//       configureServer: (server) => {
//         server.middlewares.use((req, res, next) => {
//           // リクエストが /uploadvideo ページにマッチした場合にだけヘッダを設定
//           if (req.url.startsWith('/uploadvideo')) {
//             res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//             res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//           }
//           else {
//             res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
//             res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
//           }
//           next();
//         });
//       },
//     },
//   ],
// });



// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//     react(),
//     {
//       name: "configure-response-headers",
//       configureServer: (server) => {
//         server.middlewares.use((req, res, next) => {
//           // if (req.originalUrl.startsWith('/api/ffmpeg')) {
//           if (req.originalUrl.startsWith('/api/ffmpeg')) {
//             res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//             res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//           }
//           next();
//         });
//       },
//     },
//   ],
// });
