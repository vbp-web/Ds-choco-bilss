// Device Detection and Optimization Utilities
export const deviceDetection = {
  // Detect device type
  isMobile: () => window.innerWidth <= 767,
  isTablet: () => window.innerWidth >= 768 && window.innerWidth <= 1023,
  isDesktop: () => window.innerWidth >= 1024,
  isWideScreen: () => window.innerWidth >= 1440,
  isUltraWide: () => window.innerWidth >= 2560,

  // Detect specific devices
  isIPhone: () => /iPhone/.test(navigator.userAgent),
  isIPad: () => /iPad/.test(navigator.userAgent),
  isAndroid: () => /Android/.test(navigator.userAgent),
  isSafari: () => /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
  isChrome: () => /Chrome/.test(navigator.userAgent),
  isFirefox: () => /Firefox/.test(navigator.userAgent),

  // Detect capabilities
  isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  hasHover: () => window.matchMedia('(hover: hover)').matches,
  hasReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  isHighDPI: () => window.devicePixelRatio >= 2,
  isRetina: () => window.devicePixelRatio >= 2,
  isDarkMode: () => window.matchMedia('(prefers-color-scheme: dark)').matches,

  // Detect orientation
  isLandscape: () => window.innerWidth > window.innerHeight,
  isPortrait: () => window.innerHeight > window.innerWidth,

  // Get device info
  getDeviceInfo: () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    userAgent: navigator.userAgent,
    isMobile: deviceDetection.isMobile(),
    isTablet: deviceDetection.isTablet(),
    isDesktop: deviceDetection.isDesktop(),
    isWideScreen: deviceDetection.isWideScreen(),
    isTouchDevice: deviceDetection.isTouchDevice(),
    hasHover: deviceDetection.hasHover(),
    hasReducedMotion: deviceDetection.hasReducedMotion(),
    isHighDPI: deviceDetection.isHighDPI(),
    isDarkMode: deviceDetection.isDarkMode(),
    isLandscape: deviceDetection.isLandscape(),
    isPortrait: deviceDetection.isPortrait(),
  })
};

// Animation optimization based on device
export const animationOptimization = {
  // Get optimal animation settings for current device
  getOptimalSettings: () => {
    const device = deviceDetection.getDeviceInfo();
    
    if (device.hasReducedMotion) {
      return {
        duration: 0.01,
        ease: 'linear',
        scale: 1,
        rotation: 0,
        translate: 0,
        enableHover: false,
        enableAnimations: false
      };
    }

    if (device.isMobile) {
      return {
        duration: 0.3,
        ease: 'ease-out',
        scale: 1.02,
        rotation: 3,
        translate: 5,
        enableHover: false,
        enableAnimations: true,
      };
    }

    if (device.isTablet) {
      return {
        duration: 0.4,
        ease: 'ease-out',
        scale: 1.03,
        rotation: 7,
        translate: 8,
        enableHover: device.hasHover,
        enableAnimations: true
      };
    }

    if (device.isDesktop) {
      return {
        duration: 0.5,
        ease: 'ease-out',
        scale: 1.05,
        rotation: 10,
        translate: 10,
        enableHover: true,
        enableAnimations: true
      };
    }

    if (device.isWideScreen) {
      return {
        duration: 0.6,
        ease: 'ease-out',
        scale: 1.08,
        rotation: 12,
        translate: 12,
        enableHover: true,
        enableAnimations: true
      };
    }

    // Default settings
    return {
      duration: 0.5,
      ease: 'ease-out',
      scale: 1.05,
      rotation: 10,
      translate: 10,
      enableHover: true,
      enableAnimations: true
    };
  },

  // Get optimal CSS classes for current device
  getOptimalClasses: () => {
    const device = deviceDetection.getDeviceInfo();
    const settings = animationOptimization.getOptimalSettings();
    
    let classes = ['gpu-accelerated'];
    
    if (device.isMobile) {
      classes.push('mobile-optimized', 'mobile-text', 'mobile-spacing');
    } else if (device.isTablet) {
      classes.push('tablet-optimized', 'tablet-text', 'tablet-spacing');
    } else if (device.isDesktop) {
      classes.push('desktop-optimized', 'desktop-text', 'desktop-spacing');
    } else if (device.isWideScreen) {
      classes.push('wide-optimized', 'wide-text', 'wide-spacing');
    }

    if (device.isTouchDevice) {
      classes.push('touch-friendly');
    } else {
      classes.push('no-touch-enhanced');
    }

    if (device.isHighDPI) {
      classes.push('retina-optimized', 'high-dpi-optimized');
    }

    if (device.hasReducedMotion) {
      classes.push('motion-reduce');
    } else {
      classes.push('motion-safe');
    }

    if (device.isDarkMode) {
      classes.push('dark-optimized');
    } else {
      classes.push('light-optimized');
    }

    if (device.isLandscape) {
      classes.push('landscape-optimized');
    } else {
      classes.push('portrait-optimized');
    }

    return classes.join(' ');
  }
};

// Performance optimization
export const performanceOptimization = {
  // Throttle function for better performance
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Debounce function for better performance
  debounce: (func, wait, immediate) => {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // Check if device can handle heavy animations
  canHandleHeavyAnimations: () => {
    const device = deviceDetection.getDeviceInfo();
    const memory = navigator.deviceMemory || 4; // Default to 4GB if not available
    
    return (
      !device.isMobile || 
      (device.isMobile && memory >= 4) ||
      device.isTablet ||
      device.isDesktop
    );
  },

  // Get optimal animation complexity
  getAnimationComplexity: () => {
    const device = deviceDetection.getDeviceInfo();
    const canHandleHeavy = performanceOptimization.canHandleHeavyAnimations();
    
    if (device.hasReducedMotion || !canHandleHeavy) {
      return 'minimal';
    }
    
    if (device.isMobile) {
      return 'light';
    }
    
    if (device.isTablet) {
      return 'medium';
    }
    
    if (device.isDesktop) {
      return 'heavy';
    }
    
    if (device.isWideScreen) {
      return 'ultra';
    }
    
    return 'medium';
  }
};

// Responsive breakpoint utilities
export const responsiveUtils = {
  // Get current breakpoint
  getCurrentBreakpoint: () => {
    const width = window.innerWidth;
    
    if (width <= 320) return 'xs';
    if (width <= 475) return 'sm';
    if (width <= 640) return 'md';
    if (width <= 768) return 'lg';
    if (width <= 1024) return 'xl';
    if (width <= 1280) return '2xl';
    if (width <= 1536) return '3xl';
    if (width <= 1920) return '4xl';
    return 'ultra';
  },

  // Check if current breakpoint matches
  isBreakpoint: (breakpoint) => {
    return responsiveUtils.getCurrentBreakpoint() === breakpoint;
  },

  // Check if current breakpoint is above
  isAboveBreakpoint: (breakpoint) => {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'ultra'];
    const current = responsiveUtils.getCurrentBreakpoint();
    const currentIndex = breakpoints.indexOf(current);
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex > targetIndex;
  },

  // Check if current breakpoint is below
  isBelowBreakpoint: (breakpoint) => {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'ultra'];
    const current = responsiveUtils.getCurrentBreakpoint();
    const currentIndex = breakpoints.indexOf(current);
    const targetIndex = breakpoints.indexOf(breakpoint);
    return currentIndex < targetIndex;
  }
};

// Export all utilities
export default {
  deviceDetection,
  animationOptimization,
  performanceOptimization,
  responsiveUtils
};


