import tailwindcss from 'tailwindcss';
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'fearless-pink': '#FF00CE',
                'smart-plum': '#653D62',
                'sunny-yellow': '#EEE707',
                'deep-graphite': '#353535',
                'grey': {
                    100: '#f7f7f7', //light grey
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717', //dark grey
                }
            },
            fontFamily: {
                'work-sans': ['Work Sans', 'sans-serif']
            },
        },
    },
    plugins: [],
};