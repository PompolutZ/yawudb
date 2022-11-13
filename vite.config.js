import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgr from 'vite-plugin-svgr'
import path from "path"
// const reactSvgPlugin = require('vite-plugin-react-svg');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@icons": path.resolve(__dirname, "./src/svgs"),
      "@components": path.resolve(__dirname, "./src/v2/components"),
      "@wudb": path.resolve(__dirname, "./src/data/wudb"),
    },
  },
  plugins: [reactRefresh(), svgr()]
})