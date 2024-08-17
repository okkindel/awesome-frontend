/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#004d40',
        foreground: '#e0f2f1',
        card: '#00695c',
        'card-foreground': '#e0f2f1',
        popover: '#004d40',
        'popover-foreground': '#e0f2f1',
        primary: '#00796b',
        'primary-foreground': '#ffffff',
        secondary: '#004d40',
        'secondary-foreground': '#e0f2f1',
        muted: '#00695c',
        'muted-foreground': '#b2dfdb',
        accent: '#00796b',
        'accent-foreground': '#ffffff',
        destructive: '#d32f2f',
        'destructive-foreground': '#ffffff',
        border: '#80cbc4',
        input: '#00796b',
        ring: '#e0f2f1',
        body: '#00251a',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
