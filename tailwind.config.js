/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00F5FF',
        'cyber-purple': '#8B5CF6',
        'matrix-green': '#00FF00',
        'neural-dark': '#0A0A0A',
        'neural-darker': '#050505',
        'neural-glow': '#1E1E1E',
      },
      fontFamily: {
        'mono': ['Fira Code', 'JetBrains Mono', 'monospace'],
        'cyber': ['Orbitron', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            'box-shadow': '0 0 5px #00F5FF, 0 0 10px #00F5FF, 0 0 15px #00F5FF',
            'text-shadow': '0 0 10px #00F5FF'
          },
          '100%': { 
            'box-shadow': '0 0 20px #00F5FF, 0 0 30px #00F5FF, 0 0 40px #00F5FF',
            'text-shadow': '0 0 20px #00F5FF'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        }
      },
      backdropBlur: {
        'neural': '12px',
      },
      backgroundImage: {
        'dots-pattern': "radial-gradient(circle, #ffffff 1px, transparent 1px)",
      },
      backgroundSize: {
        'dots': '20px 20px',
      }
    },
  },
  plugins: [],
}
