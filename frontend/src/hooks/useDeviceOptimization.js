import { useState, useEffect, useCallback } from 'react';
import { deviceDetection, animationOptimization, performanceOptimization, responsiveUtils } from '../utils/deviceOptimization';

// Custom hook for device optimization
export const useDeviceOptimization = () => {
  const [deviceInfo, setDeviceInfo] = useState(deviceDetection.getDeviceInfo());
  const [optimalSettings, setOptimalSettings] = useState(animationOptimization.getOptimalSettings());
  const [optimalClasses, setOptimalClasses] = useState(animationOptimization.getOptimalClasses());
  const [animationComplexity, setAnimationComplexity] = useState(performanceOptimization.getAnimationComplexity());
  const [currentBreakpoint, setCurrentBreakpoint] = useState(responsiveUtils.getCurrentBreakpoint());

  // Update device info on resize
  const updateDeviceInfo = useCallback(() => {
    const newDeviceInfo = deviceDetection.getDeviceInfo();
    const newOptimalSettings = animationOptimization.getOptimalSettings();
    const newOptimalClasses = animationOptimization.getOptimalClasses();
    const newAnimationComplexity = performanceOptimization.getAnimationComplexity();
    const newBreakpoint = responsiveUtils.getCurrentBreakpoint();

    setDeviceInfo(newDeviceInfo);
    setOptimalSettings(newOptimalSettings);
    setOptimalClasses(newOptimalClasses);
    setAnimationComplexity(newAnimationComplexity);
    setCurrentBreakpoint(newBreakpoint);
  }, []);

  // Throttled resize handler
  const throttledResize = useCallback(
    performanceOptimization.throttle(updateDeviceInfo, 100),
    [updateDeviceInfo]
  );

  useEffect(() => {
    // Initial setup
    updateDeviceInfo();

    // Add resize listener
    window.addEventListener('resize', throttledResize);
    window.addEventListener('orientationchange', throttledResize);

    // Add media query listeners for better responsiveness
    const mediaQueries = [
      '(prefers-reduced-motion: reduce)',
      '(prefers-color-scheme: dark)',
      '(hover: hover)',
      '(pointer: coarse)'
    ];

    const mediaQueryListeners = mediaQueries.map(query => {
      const mediaQuery = window.matchMedia(query);
      const handler = () => updateDeviceInfo();
      mediaQuery.addListener(handler);
      return { mediaQuery, handler };
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledResize);
      window.removeEventListener('orientationchange', throttledResize);
      
      mediaQueryListeners.forEach(({ mediaQuery, handler }) => {
        mediaQuery.removeListener(handler);
      });
    };
  }, [throttledResize, updateDeviceInfo]);

  // Get device-specific animation props for Framer Motion
  const getMotionProps = useCallback((baseProps = {}) => {
    const { enableAnimations, duration, ease, scale, rotation, translate } = optimalSettings;
    
    if (!enableAnimations) {
      return {
        ...baseProps,
        animate: false,
        transition: { duration: 0.01 }
      };
    }

    return {
      ...baseProps,
      transition: {
        duration: duration,
        ease: ease,
        ...baseProps.transition
      },
      whileHover: deviceInfo.hasHover ? {
        scale: scale,
        rotateY: rotation,
        y: -translate,
        ...baseProps.whileHover
      } : baseProps.whileHover,
      whileTap: {
        scale: 0.95,
        ...baseProps.whileTap
      }
    };
  }, [optimalSettings, deviceInfo.hasHover]);

  // Get device-specific CSS classes
  const getDeviceClasses = useCallback((baseClasses = '') => {
    return `${baseClasses} ${optimalClasses}`.trim();
  }, [optimalClasses]);

  // Check if animations should be enabled
  const shouldAnimate = useCallback(() => {
    return optimalSettings.enableAnimations && !deviceInfo.hasReducedMotion;
  }, [optimalSettings.enableAnimations, deviceInfo.hasReducedMotion]);

  // Get optimal animation duration
  const getOptimalDuration = useCallback((baseDuration = 0.5) => {
    return shouldAnimate() ? optimalSettings.duration : 0.01;
  }, [shouldAnimate, optimalSettings.duration]);

  // Get optimal scale for hover effects
  const getOptimalScale = useCallback((baseScale = 1.05) => {
    return shouldAnimate() ? optimalSettings.scale : 1;
  }, [shouldAnimate, optimalSettings.scale]);

  // Get optimal rotation for hover effects
  const getOptimalRotation = useCallback((baseRotation = 10) => {
    return shouldAnimate() ? optimalSettings.rotation : 0;
  }, [shouldAnimate, optimalSettings.rotation]);

  // Get device-specific text size
  const getOptimalTextSize = useCallback((baseSize = 'base') => {
    if (deviceInfo.isMobile) return 'sm';
    if (deviceInfo.isTablet) return 'base';
    if (deviceInfo.isDesktop) return 'lg';
    if (deviceInfo.isWideScreen) return 'xl';
    return baseSize;
  }, [deviceInfo]);

  // Get device-specific spacing
  const getOptimalSpacing = useCallback((baseSpacing = 4) => {
    if (deviceInfo.isMobile) return Math.max(2, baseSpacing - 2);
    if (deviceInfo.isTablet) return baseSpacing;
    if (deviceInfo.isDesktop) return baseSpacing + 2;
    if (deviceInfo.isWideScreen) return baseSpacing + 4;
    return baseSpacing;
  }, [deviceInfo]);

  // Get device-specific padding
  const getOptimalPadding = useCallback((basePadding = 'p-4') => {
    if (deviceInfo.isMobile) return 'p-2';
    if (deviceInfo.isTablet) return 'p-4';
    if (deviceInfo.isDesktop) return 'p-6';
    if (deviceInfo.isWideScreen) return 'p-8';
    return basePadding;
  }, [deviceInfo]);

  // Get device-specific margin
  const getOptimalMargin = useCallback((baseMargin = 'm-4') => {
    if (deviceInfo.isMobile) return 'm-2';
    if (deviceInfo.isTablet) return 'm-4';
    if (deviceInfo.isDesktop) return 'm-6';
    if (deviceInfo.isWideScreen) return 'm-8';
    return baseMargin;
  }, [deviceInfo]);

  // Check if device can handle heavy animations
  const canHandleHeavyAnimations = useCallback(() => {
    return performanceOptimization.canHandleHeavyAnimations();
  }, []);

  // Get animation complexity level
  const getAnimationComplexity = useCallback(() => {
    return animationComplexity;
  }, [animationComplexity]);

  // Check if current breakpoint matches
  const isBreakpoint = useCallback((breakpoint) => {
    return responsiveUtils.isBreakpoint(breakpoint);
  }, [currentBreakpoint]);

  // Check if current breakpoint is above
  const isAboveBreakpoint = useCallback((breakpoint) => {
    return responsiveUtils.isAboveBreakpoint(breakpoint);
  }, [currentBreakpoint]);

  // Check if current breakpoint is below
  const isBelowBreakpoint = useCallback((breakpoint) => {
    return responsiveUtils.isBelowBreakpoint(breakpoint);
  }, [currentBreakpoint]);

  return {
    // Device info
    deviceInfo,
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet,
    isDesktop: deviceInfo.isDesktop,
    isWideScreen: deviceInfo.isWideScreen,
    isTouchDevice: deviceInfo.isTouchDevice,
    hasHover: deviceInfo.hasHover,
    hasReducedMotion: deviceInfo.hasReducedMotion,
    isHighDPI: deviceInfo.isHighDPI,
    isDarkMode: deviceInfo.isDarkMode,
    isLandscape: deviceInfo.isLandscape,
    isPortrait: deviceInfo.isPortrait,
    
    // Animation settings
    optimalSettings,
    shouldAnimate: shouldAnimate(),
    animationComplexity,
    
    // Utility functions
    getMotionProps,
    getDeviceClasses,
    getOptimalDuration,
    getOptimalScale,
    getOptimalRotation,
    getOptimalTextSize,
    getOptimalSpacing,
    getOptimalPadding,
    getOptimalMargin,
    canHandleHeavyAnimations,
    getAnimationComplexity,
    
    // Breakpoint utilities
    currentBreakpoint,
    isBreakpoint,
    isAboveBreakpoint,
    isBelowBreakpoint,
    
    // Performance utilities
    throttle: performanceOptimization.throttle,
    debounce: performanceOptimization.debounce
  };
};

export default useDeviceOptimization;


