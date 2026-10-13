/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        campus: {
          darkest: '#050A14',
          bg: '#0A1124',
          card: '#0F1B35',
          cardHover: '#142447',
          surface: '#182B54',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(16, 185, 129, 0.25)',
          muted: '#8B9BB4',
        },
        eco: {
          green: '#10B981',
          greenLight: '#34D399',
          greenDark: '#047857',
          cyan: '#06B6D4',
          cyanLight: '#38BDF8',
          cyanDark: '#0891B2',
          amber: '#F59E0B',
          red: '#EF4444',
          blue: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
