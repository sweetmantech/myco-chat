// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          DEFAULT: '#949494',
          light: '#f6f6f6',
        },
        background: {
          DEFAULT: '#F2E8CC',
        },
      },
      fontFamily: {
        nounish: ['LondrinaSolid-Regular', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      display: ['dark'],
    },
  },
  plugins: [],
}
