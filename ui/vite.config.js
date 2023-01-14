import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext', // enables top-level await
  },
  plugins: [
    vue(),
    (process.env.NODE_ENV === 'development' ? basicSsl() : null),
    vueJsx(),
  ],
  server: {
    host: true, // necessary for docker port mapping
    https: process.env.NODE_ENV === 'development',
    port: 5173,
    cors: '*',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
