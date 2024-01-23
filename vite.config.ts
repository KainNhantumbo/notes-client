import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: [],
      minify: true,
      manifest: {
        name: 'ChocoNotey - Notes App',
        short_name: 'ChocoNotey',
        description: 'Markdown notes application',
        icons: [
          {
            src: '/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'favicon'
          },
          {
            src: '/favicon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
            purpose: 'favicon'
          },
          {
            src: '/favicon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'favicon'
          },
          {
            src: '/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        theme_color: '#FFFFFF',
        background_color: '#FFFFFF',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait'
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: '*',
            method: 'GET',
            handler: 'CacheFirst' as const,
            options: {
              cacheName: 'choconotey-cache',
              cacheableResponse: { statuses: [200] }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000
  }
});
