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
    duration: 1.5,
    delay: 1.5,
    ease: 'power2.inOut',
    targetScale: 1,
    // Scale animation settings
    scale: {
      duration: 0.4,
      ease: 'back.out(1.7)',
    },
    // Move animation settings
    move: {
      duration: 0.5,
      ease: 'power2.inOut',
      startOffset: 0.6, // Multiplier for scaleDuration to start move before scale completes
    },
  },

  // Text logo and paragraph fade-in animation
  textLogo: {
    opacity: {
      duration: 0.8,
      delay: 3,
      ease: 'power2.out',
      initial: 0,
    },
  },

  // Master timeline configuration
  timeline: {
    totalDuration: 2.7,
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
} as const;

export const logoIconAnimation = {
  // Timeline configuration
  timeline: {
    delay: 0.5,
    defaultEase: 'power2.inOut',
  },

  // Morph animation
  morph: {
    duration: 1,
    ease: 'power2.inOut',
  },
} as const;
