'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { HorizontalScrollTitle } from './HorizontalScrollTitle';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Scrolling title text
const TITLE_TEXT = "We craft bold digital experiences that captivate audiences and elevate brands — from concept to launch, we bring your vision to life.";

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  // Tile dimensions
  tile: {
    baseHeight: 16,           // Base height in vh
    expandedHeight: 32,       // Height when clicked in vh
    maxHeightBoost: 16,       // Max additional height from curve in vh
    baseWidth: 120,           // Base width in px
    expandedWidth: 220,       // Width when clicked in px
  },

  // Curve animation (controls how tiles scale based on scroll position)
  curve: {
    range: 5,                 // How many tiles are affected by the curve
    offset: 2,                // Offset for curve center
  },

  // Visual effects
  effects: {
    maxGrayscale: 0.8,        // Max grayscale when inactive (0-1)
    parallaxAmount: 10,       // Parallax movement percentage
    clickedParallax: 5,       // Parallax when clicked
  },

  // Minimap
  minimap: {
    baseHeight: 12,           // Base line height in px
    maxHeightBoost: 28,       // Max additional height in px
  },

  // Animation
  animation: {
    scrollDuration: 0.8,       // Duration for scroll-to animation
    scrollEase: 'power2.inOut',
  },

  // Image dimensions for Unsplash
  image: {
    width: 800,
    height: 1200,
  },
} as const;

// HD Unsplash images (curated collection)
const imageUrls = [
  'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', // Aurora
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // Mountains
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', // Foggy forest
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e', // Nature landscape
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d', // Forest path
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716', // Waterfall
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470', // Lake mountains
  'https://images.unsplash.com/photo-1518173946687-a4c036bc8ada', // Northern lights
  'https://images.unsplash.com/photo-1540206395-68808572332f', // Ocean sunset
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff', // Valley
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', // Green hills
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429', // Calm lake
  'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e', // Autumn forest
  'https://images.unsplash.com/photo-1439066615861-d1af74d74000', // Desert dunes
  'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8', // Night sky
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07', // Flowers
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', // Canyon
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8', // Sunset field
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a', // Stars
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', // Mountain peak
].map((url) => `${url}?w=${CONFIG.image.width}&h=${CONFIG.image.height}&fit=crop&q=80`);

// Helper to calculate curve value for an index at a given progress
const getCurveValue = (index: number, totalImages: number, progress: number) => {
  const itemProgress = index / totalImages;
  const range = CONFIG.curve.range / totalImages;
  const offset = CONFIG.curve.offset / totalImages;
  const adjustedProgress = progress - (itemProgress - offset);
  const normalized = Math.max(0, Math.min(1, adjustedProgress / range));
  return Math.sin(normalized * Math.PI);
};

export const HorizontalImageTiles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const minimapLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const triggerStartRef = useRef(0);
  const scrollProgressRef = useRef(0);
  
  // Title scroll tween - stored in state to pass to child component
  const [scrollTween, setScrollTween] = useState<gsap.core.Tween | null>(null);
  
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const clickedIndexRef = useRef<number | null>(null);
  const prevClickedIndexRef = useRef<number | null>(null);
  
  // Keep ref in sync with state for use in GSAP callbacks
  useEffect(() => {
    clickedIndexRef.current = clickedIndex;
  }, [clickedIndex]);

  // Update all tiles based on current scroll progress - called directly by GSAP
  const updateTiles = useCallback((progress: number) => {
    const totalImages = imageUrls.length;
    const clickedIdx = clickedIndexRef.current;
    
    tilesRef.current.forEach((tile, index) => {
      if (!tile) return;
      
      const isClicked = clickedIdx === index;
      const curveValue = getCurveValue(index, totalImages, progress);
      
      // Calculate properties
      const heightVh = isClicked 
        ? CONFIG.tile.expandedHeight 
        : CONFIG.tile.baseHeight + curveValue * CONFIG.tile.maxHeightBoost;
      
      const grayscale = isClicked 
        ? 0 
        : Math.max(0, (1 - curveValue) * CONFIG.effects.maxGrayscale);
      
      const parallaxY = isClicked 
        ? -CONFIG.effects.clickedParallax 
        : -curveValue * CONFIG.effects.parallaxAmount;
      
      const zIndex = isClicked ? 100 : Math.round(curveValue * 10);
      
      // Apply styles directly via GSAP (synchronous, no React re-render)
      gsap.set(tile, {
        height: `${heightVh}vh`,
        filter: `grayscale(${grayscale * 100}%)`,
        zIndex,
      });
      
      const img = tile.querySelector('img');
      if (img) {
        gsap.set(img, {
          y: `${parallaxY}%`,
        });
      }
    });
    
    // Update minimap
    minimapLinesRef.current.forEach((line, index) => {
      if (!line) return;
      const curveValue = getCurveValue(index, totalImages, progress);
      const height = CONFIG.minimap.baseHeight + curveValue * CONFIG.minimap.maxHeightBoost;
      gsap.set(line, { height: `${height}px` });
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Small delay to ensure DOM is fully ready
    const initTimeout = setTimeout(() => {
      const getScrollWidth = () => track.scrollWidth - container.clientWidth;

      // Create the horizontal scroll tween for the title text
      // This tween is passed to the HorizontalScrollTitle component for containerAnimation
      const titleTween = gsap.to('.horizontal-title-text', {
        xPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          scrub: 0.1,
        },
      });
      setScrollTween(titleTween);

      // Create the horizontal scroll animation for images
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        scrub: 0.1, // Very low value for near-instant response while still being smooth
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          
          // Directly update track position (synchronous)
          gsap.set(track, {
            x: -getScrollWidth() * self.progress,
          });
          
          // Directly update all tiles (synchronous, no React state)
          updateTiles(self.progress);
        },
        onRefresh: (self) => {
          triggerStartRef.current = self.start;
        },
      });

      // Initial update
      updateTiles(0);

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
        titleTween.kill();
      };
    }, 100);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [updateTiles]);

  // Animate tile height when clicked index changes
  useEffect(() => {
    const totalImages = imageUrls.length;
    const progress = scrollProgressRef.current;
    const prevIndex = prevClickedIndexRef.current;
    const currentIndex = clickedIndex;
    
    // Animate previously clicked tile back to curve-based height
    if (prevIndex !== null && prevIndex !== currentIndex) {
      const tile = tilesRef.current[prevIndex];
      if (tile) {
        const curveValue = getCurveValue(prevIndex, totalImages, progress);
        const targetHeight = CONFIG.tile.baseHeight + curveValue * CONFIG.tile.maxHeightBoost;
        const grayscale = Math.max(0, (1 - curveValue) * CONFIG.effects.maxGrayscale);
        
        gsap.to(tile, {
          height: `${targetHeight}vh`,
          filter: `grayscale(${grayscale * 100}%)`,
          duration: CONFIG.animation.scrollDuration,
          ease: CONFIG.animation.scrollEase,
        });
      }
    }
    
    // Animate newly clicked tile to expanded height
    if (currentIndex !== null) {
      const tile = tilesRef.current[currentIndex];
      if (tile) {
        gsap.to(tile, {
          height: `${CONFIG.tile.expandedHeight}vh`,
          filter: 'grayscale(0%)',
          duration: CONFIG.animation.scrollDuration,
          ease: CONFIG.animation.scrollEase,
        });
      }
    }
    
    // Update all other tiles instantly
    tilesRef.current.forEach((tile, index) => {
      if (!tile || index === prevIndex || index === currentIndex) return;
      
      const curveValue = getCurveValue(index, totalImages, progress);
      const heightVh = CONFIG.tile.baseHeight + curveValue * CONFIG.tile.maxHeightBoost;
      const grayscale = Math.max(0, (1 - curveValue) * CONFIG.effects.maxGrayscale);
      
      gsap.set(tile, {
        height: `${heightVh}vh`,
        filter: `grayscale(${grayscale * 100}%)`,
      });
    });
    
    prevClickedIndexRef.current = currentIndex;
  }, [clickedIndex]);

  const scrollToItem = useCallback((index: number) => {
    const track = trackRef.current;
    const container = containerRef.current;
    const scrollTrigger = scrollTriggerRef.current;
    
    if (!track || !container || !scrollTrigger) return;

    const totalImages = imageUrls.length;
    const targetProgress = index / (totalImages - 1);
    const scrollWidth = track.scrollWidth - container.clientWidth;
    const triggerStart = triggerStartRef.current;
    const targetScrollY = triggerStart + (scrollWidth * targetProgress);

    gsap.to(window, {
      scrollTo: { y: targetScrollY, autoKill: false },
      duration: CONFIG.animation.scrollDuration,
      ease: CONFIG.animation.scrollEase,
    });
  }, []);

  const handleItemClick = useCallback((index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
      scrollToItem(index);
    }
  }, [clickedIndex, scrollToItem]);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === trackRef.current) {
      setClickedIndex(null);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="horizontal-gallery-container bg-transparent"
      onClick={handleContainerClick}
    >
      {/* Gallery title at top */}
      {/* <h2 className="gallery-section-title">Gallery</h2> */}

      <div ref={trackRef} className="horizontal-gallery-track">
        {imageUrls.map((url, i) => (
          <div
            key={i}
            ref={(el) => { tilesRef.current[i] = el; }}
            className={`image-tile ${clickedIndex === i ? 'expanded' : ''}`}
            onClick={() => handleItemClick(i)}
            style={{
              width: `${clickedIndex === i ? CONFIG.tile.expandedWidth : CONFIG.tile.baseWidth}px`,
            }}
          >
            <img 
              src={url} 
              alt={`Gallery image ${i + 1}`} 
              draggable={false}
            />
          </div>
        ))}
      </div>
      <div className="minimap">
        {imageUrls.map((_, i) => (
          <div
            key={i}
            ref={(el) => { minimapLinesRef.current[i] = el; }}
            className="minimap-line"
          />
        ))}
      </div>
      <HorizontalScrollTitle text={TITLE_TEXT} scrollTween={scrollTween} />
    </div>
  );
};
