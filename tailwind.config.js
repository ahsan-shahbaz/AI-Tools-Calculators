/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Legacy brand colors (kept for existing tool pages)
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        // New 2027 design system
        dark: {
          50:  '#0c0c1d',
          100: '#09091a',
          900: '#060611',
          950: '#03030d',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-violet':     'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(139,92,246,0.12) 0%, transparent 60%)',
      },
      animation: {
        'shimmer':    'shimmer 4s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
        'orb-spin':   'orb-spin 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':      { transform: 'scale(1.4)', opacity: '0.7' },
        },
        'orb-spin': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'glow-violet': '0 0 30px rgba(139, 92, 246, 0.4)',
        'glow-cyan':   '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-rose':   '0 0 30px rgba(244, 63, 94, 0.4)',
        'inner-glow':  'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '60px',
      },
    },
  },
  plugins: [],
};
