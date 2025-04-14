/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indigo': {
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        'purple': {
          600: '#9333ea',
        },
      },
    },
  },
  plugins: [],
}