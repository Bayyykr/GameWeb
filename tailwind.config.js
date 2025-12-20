/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                fredoka: ['Fredoka', 'sans-serif'],
            },
            colors: {
                game: {
                    purple: '#6d28d9',
                    amber: '#f59e0b',
                    rose: '#e11d48',
                    blue: '#2563eb',
                }
            },
            boxShadow: {
                'game-hover': '0 10px 0 0 rgba(0, 0, 0, 0.2)',
                'game-active': '0 4px 0 0 rgba(0, 0, 0, 0.2)',
            }
        },
    },
    plugins: [],
}
