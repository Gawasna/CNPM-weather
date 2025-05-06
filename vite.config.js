import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs'; 
import path from 'path'; 

const projectRoot = process.cwd();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    https: { 
      key: fs.readFileSync(path.resolve(projectRoot, 'certs', 'key.pem')),
      cert: fs.readFileSync(path.resolve(projectRoot, 'certs', 'cert.pem')),
    }
  }
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
});