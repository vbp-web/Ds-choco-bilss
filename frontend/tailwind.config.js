/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chocolate': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cdc2',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        'cream': {
          50: '#fffef7',
          100: '#fffceb',
          200: '#fff8d1',
          300: '#fff1b3',
          400: '#ffe485',
          500: '#ffd54f',
          600: '#ffc107',
          700: '#ff8f00',
          800: '#ff6f00',
          900: '#e65100',
        },
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        // Mobile-first breakpoints
        'mobile': '320px',
        'mobile-lg': '425px',
        'tablet': '768px',
        'tablet-lg': '1024px',
        'desktop': '1024px',
        'desktop-lg': '1440px',
        'wide': '1440px',
        'ultra-wide': '2560px',
        // Device-specific breakpoints
        'iphone-se': '375px',
        'iphone-x': '375px',
        'iphone-12': '390px',
        'iphone-14': '393px',
        'ipad': '768px',
        'ipad-pro': '1024px',
        'surface': '912px',
        'galaxy-tab': '800px',
        'kindle': '600px',
        // Orientation breakpoints
        'landscape': {'raw': '(orientation: landscape)'},
        'portrait': {'raw': '(orientation: portrait)'},
        // Touch device breakpoints
        'touch': {'raw': '(hover: none) and (pointer: coarse)'},
        'no-touch': {'raw': '(hover: hover) and (pointer: fine)'},
        // High DPI breakpoints
        'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
        'high-dpi': {'raw': '(-webkit-min-device-pixel-ratio: 3), (min-resolution: 288dpi)'},
        // Reduced motion breakpoints
        'reduced-motion': {'raw': '(prefers-reduced-motion: reduce)'},
        'no-reduced-motion': {'raw': '(prefers-reduced-motion: no-preference)'},
        // Dark mode breakpoints
        'dark': {'raw': '(prefers-color-scheme: dark)'},
        'light': {'raw': '(prefers-color-scheme: light)'},
        // Print breakpoint
        'print': {'raw': 'print'},
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        // Existing animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        
        // Basic animations
        'modal-slide-in': 'modalSlideIn 0.3s ease-out',
        'pattern-move': 'patternMove 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        // Existing keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        
        modalSlideIn: {
          '0%': { 
            transform: 'translateY(-50px) scale(0.8)',
            opacity: '0',
          },
          '100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1',
          },
        },
        patternMove: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '100px 100px, -100px -100px' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow3d: {
          '0%': { 
            textShadow: '0 0 5px rgba(139, 69, 19, 0.5), 0 0 10px rgba(139, 69, 19, 0.3)',
            transform: 'translateZ(0)',
          },
          '100%': { 
            textShadow: '0 0 20px rgba(139, 69, 19, 0.8), 0 0 30px rgba(139, 69, 19, 0.6)',
            transform: 'translateZ(10px)',
          },
        },
        slide3d: {
          '0%': { 
            transform: 'translateX(-100%) translateZ(-50px) rotateY(-90deg)',
            opacity: '0',
          },
          '100%': { 
            transform: 'translateX(0) translateZ(0) rotateY(0deg)',
            opacity: '1',
          },
        },
        flip3d: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        zoom3d: {
          '0%': { 
            transform: 'scale(0) translateZ(-100px)',
            opacity: '0',
          },
          '100%': { 
            transform: 'scale(1) translateZ(0)',
            opacity: '1',
          },
        },
        wiggle3d: {
          '0%, 100%': { transform: 'rotateZ(0deg) translateZ(0)' },
          '25%': { transform: 'rotateZ(5deg) translateZ(5px)' },
          '75%': { transform: 'rotateZ(-5deg) translateZ(-5px)' },
        },
        morph3d: {
          '0%, 100%': { 
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            borderRadius: '0%',
          },
          '25%': { 
            transform: 'perspective(1000px) rotateX(10deg) rotateY(10deg) scale(1.05)',
            borderRadius: '20%',
          },
          '50%': { 
            transform: 'perspective(1000px) rotateX(0deg) rotateY(20deg) scale(1.1)',
            borderRadius: '50%',
          },
          '75%': { 
            transform: 'perspective(1000px) rotateX(-10deg) rotateY(10deg) scale(1.05)',
            borderRadius: '20%',
          },
        },
      },
      transformOrigin: {
        'center-3d': 'center center',
        'top-3d': 'center top',
        'bottom-3d': 'center bottom',
        'left-3d': 'left center',
        'right-3d': 'right center',
      },
      perspective: {
        'none': 'none',
        '1000': '1000px',
        '1500': '1500px',
        '2000': '2000px',
      },
      backfaceVisibility: {
        'visible': 'visible',
        'hidden': 'hidden',
      },
      transformStyle: {
        'flat': 'flat',
        'preserve-3d': 'preserve-3d',
      },
      willChange: {
        'auto': 'auto',
        'scroll': 'scroll-position',
        'contents': 'contents',
        'transform': 'transform',
        'opacity': 'opacity',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-1500': {
          perspective: '1500px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.backface-visible': {
          backfaceVisibility: 'visible',
        },
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform',
        },
        '.transform-gpu': {
          transform: 'translate3d(0, 0, 0)',
        },
        '.rotate-x-15': {
          transform: 'rotateX(15deg)',
        },
        '.rotate-y-15': {
          transform: 'rotateY(15deg)',
        },
        '.rotate-z-15': {
          transform: 'rotateZ(15deg)',
        },
        '.translate-z-10': {
          transform: 'translateZ(10px)',
        },
        '.translate-z-20': {
          transform: 'translateZ(20px)',
        },
        '.translate-z-50': {
          transform: 'translateZ(50px)',
        },
        '.translate-z-100': {
          transform: 'translateZ(100px)',
        },
        '.scale-3d-105': {
          transform: 'scale3d(1.05, 1.05, 1.05)',
        },
        '.scale-3d-110': {
          transform: 'scale3d(1.1, 1.1, 1.1)',
        },
        '.rotate-3d-x': {
          transform: 'rotateX(10deg) rotateY(5deg)',
        },
        '.rotate-3d-y': {
          transform: 'rotateY(10deg) rotateX(5deg)',
        },
        '.rotate-3d-z': {
          transform: 'rotateZ(5deg) rotateX(5deg)',
        },
        '.text-3d': {
          textShadow: '1px 1px 0 #8B4513, 2px 2px 0 #7A3E0F, 3px 3px 0 #6B350B, 4px 4px 0 #5C2D07, 5px 5px 0 #4D2503',
          transform: 'perspective(500px) rotateX(15deg)',
        },
        '.shadow-3d': {
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        },
        '.shadow-3d-lg': {
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        },
        '.shadow-3d-xl': {
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        },
        // Device-specific responsive utilities
        '.mobile-optimized': {
          transform: 'scale(0.95)',
          padding: '0.5rem',
        },
        '.tablet-optimized': {
          transform: 'scale(1)',
          padding: '1rem',
        },
        '.desktop-optimized': {
          transform: 'scale(1.05)',
          padding: '1.5rem',
        },
        '.wide-optimized': {
          transform: 'scale(1.1)',
          padding: '2rem',
        },
        // Touch device utilities
        '.touch-friendly': {
          transform: 'scale(1)',
        },
        '.no-touch-enhanced': {
          transform: 'scale(1.05)',
        },
        // High DPI utilities
        '.retina-optimized': {
          transform: 'scale(0.95)',
        },
        '.high-dpi-optimized': {
          transform: 'scale(0.9)',
        },
        // Reduced motion utilities
        '.motion-safe': {
          animation: 'pulse 2s infinite',
        },
        '.motion-reduce': {
          animation: 'none',
        },
        // Dark mode utilities
        '.dark-optimized': {
          backgroundColor: '#1f2937',
          color: '#ffffff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
        '.light-optimized': {
          backgroundColor: '#ffffff',
          color: '#111827',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        },
        // Print utilities
        '.print-optimized': {
          transform: 'scale(1)',
          backgroundColor: '#ffffff',
          color: '#000000',
        },
        // Orientation utilities
        '.landscape-optimized': {
          transform: 'scale(0.95)',
          padding: '0.5rem 0.5rem',
        },
        '.portrait-optimized': {
          transform: 'scale(1)',
          padding: '0.5rem 1rem',
        },
        // Performance utilities
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        },
        '.smooth-scroll': {
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        },
        '.hardware-accelerated': {
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        },
        // 3D device-specific utilities
        '.mobile-3d': {
          transform: 'scale(0.95)',
        },
        '.tablet-3d': {
          transform: 'scale(1)',
        },
        '.desktop-3d': {
          transform: 'scale(1.05)',
        },
        '.wide-3d': {
          transform: 'scale(1.1)',
        },
        // Touch 3D utilities
        '.touch-3d': {
          transform: 'scale(0.95)',
        },
        '.no-touch-3d': {
          transform: 'scale(1.05)',
        },
        // Animation performance utilities
        '.animate-smooth': {
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          animationFillMode: 'both',
        },
        '.animate-fast': {
          animationDuration: '0.2s',
          animationTimingFunction: 'ease-out',
        },
        '.animate-slow': {
          animationDuration: '1s',
          animationTimingFunction: 'ease-in-out',
        },
        // Device-specific text utilities
        '.mobile-text': {
          fontSize: '0.75rem',
        },
        '.tablet-text': {
          fontSize: '0.875rem',
        },
        '.desktop-text': {
          fontSize: '1rem',
        },
        '.wide-text': {
          fontSize: '1.125rem',
        },
        // Device-specific spacing utilities
        '.mobile-spacing': {
          padding: '0.5rem',
        },
        '.tablet-spacing': {
          padding: '1rem',
        },
        '.desktop-spacing': {
          padding: '1.5rem',
        },
        '.wide-spacing': {
          padding: '2rem',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

