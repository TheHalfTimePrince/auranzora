'use client';

import { useSyncExternalStore } from 'react';

function subscribeMediaQuery(query: string, callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQuery = window.matchMedia(query);
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  } else {
    // Fallback for older browsers
    mediaQuery.addListener(callback);
    return () => mediaQuery.removeListener(callback);
  }
}

function getMediaQuerySnapshot(query: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(query).matches;
}

export const useMediaQuery = (query: string): boolean => {
  return useSyncExternalStore(
    (callback) => subscribeMediaQuery(query, callback),
    () => getMediaQuerySnapshot(query),
    () => false // SSR fallback
  );
};

export const useIsMobile = (breakpoint: number = 768): boolean => {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
};
