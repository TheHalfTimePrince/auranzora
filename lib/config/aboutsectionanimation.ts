export const aboutSectionAnimation = {
  // Fixed logo initial state
  fixedLogo: {
    initialScale: 1.8,
    xPercent: -50,
    yPercent: -50,
    transformOrigin: 'center center',
  },

  // Fixed logo overlay animation
  logoOverlay: {
    duration: 0.8,
    delay: 0,
    ease: 'power2.in',
    targetScale: 1,
    // Scale animation settings
    scale: {
      duration: 0.8,
      ease: 'power2.in',
    },
    // Move animation settings
    move: {
      duration: 1,
      ease: 'power2.in',
      startOffset: 0, // Multiplier for scaleDuration to start move before scale completes
    },
  },

  // Text logo and paragraph fade-in animation
  textLogo: {
    opacity: {
      duration: 0.2,
      delay: -0.85,
      ease: 'power2.in',
      initial: 0,
    },
  },

  // Master timeline configuration
  timeline: {
    paused: true,
  },

  // ScrollTrigger configuration
  scrollTrigger: {
    start: 'top top',
    scrub: true,
    invalidateOnRefresh: true,
    scrollDistanceMultiplier: 1, // Multiplied by window.innerHeight * totalDuration
    fallbackScrollDistance: 100, // Used when window is undefined
  },

  // Snap points configuration
  snap: {
    duration: {
      min: 0.2,
      max: 0.5,
    },
    delay: 0.1,
    inertia: false,
  },

  // IntersectionObserver configuration
  intersectionObserver: {
    threshold: 0.5,
    rootMargin: '0px',
  },

  // Layout and timing delays
  timing: {
    layoutStableDelay: 100,
  },

  // Gradient weight text animation settings
  gradientText: {
    // Scale settings
    scale: {
      min: 0.6, // Scale at edges
      max: 1.3, // Scale at middle
      range: 0.7, // Range multiplier (max - min)
    },
    // Letter spacing
    letterSpacing: {
      max: 0.15, // Maximum letter spacing in em
    },
    // Color gradient settings
    color: {
      hueStart: 280, // Purple
      hueRange: 60, // Range to pink (340)
      saturationMin: 60, // Minimum saturation %
      saturationRange: 30, // Saturation range %
      lightnessBase: 50, // Base lightness %
      lightnessRange: 10, // Lightness range %
    },
    // Shadow settings
    shadow: {
      countMultiplier: 12, // Maximum shadow count multiplier
      spreadMultiplier: 0.6, // Shadow spread multiplier
      glowIntensityMultiplier: 1.5, // Glow intensity multiplier
      glowSizes: [8, 4, 2], // Glow sizes in pixels
      glowOpacities: ['80', '60', ''], // Glow opacities (hex without #)
    },
    // Brightness filter
    brightness: {
      boost: 0.2, // Brightness boost multiplier in middle
    },
  },
} as const;

export const logoIconAnimation = {
  // Timeline configuration
  timeline: {
    delay: 0,
    defaultEase: 'power2.inOut',
  },

  // Morph animation
  morph: {
    duration: 0.6,
    ease: 'power2.inOut',
  },
} as const;
