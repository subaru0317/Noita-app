// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

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

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((req, res, next) => {
          if (req.originalUrl.startsWith('/api/ffmpeg')) {
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          }
          next();
        });
      },
    },
  ],
});
