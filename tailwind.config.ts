/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#e0f2f1',
        foreground: '#004d40',
        card: '#ffffff',
        'card-foreground': '#004d40',
        popover: '#e0f2f1',
        'popover-foreground': '#004d40',
        primary: '#00796b',
        'primary-foreground': '#ffffff',
        secondary: '#80cbc4',
        'secondary-foreground': '#004d40',
        muted: '#b2dfdb',
        'muted-foreground': '#004d40',
        accent: '#80cbc4',
        'accent-foreground': '#004d40',
        destructive: '#d32f2f',
        'destructive-foreground': '#ffffff',
        border: '#004d40',
        input: '#80cbc4',
        ring: '#00796b',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
