export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95' },
        accent: { 400: '#f472b6', 500: '#ec4899', 600: '#db2777' },
        warm: { 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
        teal: { 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' },
        dark: { 50: '#1a1a2e', 100: '#16162a', 200: '#12121f', 300: '#0f0f1a', 400: '#0a0a0f' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)',
        'gradient-cool': 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 100%)',
        'gradient-hero': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #fda085 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)'
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'morph': 'morphBlob 8s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      keyframes: {
        gradient: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        'pulse-glow': { '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(236,72,153,0.5)' } },
        'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        morphBlob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
        },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.8)' }, to: { opacity: '1', transform: 'scale(1)' } }
      },
      boxShadow: {
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.3)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.3)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.3)',
        'dark-lg': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'dark-xl': '0 30px 80px rgba(0, 0, 0, 0.6)'
      }
    }
  },
  plugins: []
};
