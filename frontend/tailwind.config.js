import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
export default {
  // important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs3: '320px',
      xs2: '475px',
      xs1: '520px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ['Proxima Nova', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        form4: 'repeat(4, 4em)',
        form5: 'repeat(5, 3em)',
      },
      gridTemplateColumns: {
        'form-col': '1fr',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
