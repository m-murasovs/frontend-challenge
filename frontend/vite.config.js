import dns from 'dns';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svgr(), react()],
    server: {
        host: '127.0.0.1',
        port: 5000,
    },
});
