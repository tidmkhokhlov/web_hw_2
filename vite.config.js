import { defineConfig } from 'vite';

export default defineConfig({
    base: '/web_hw_2/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                movies: 'movies.html',
                currency: 'advices.html',
            },
        },
    },
});
