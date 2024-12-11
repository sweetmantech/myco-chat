import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT, MOBILE_REGEX } from '@/lib/consts';

export function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      const isMobileByUserAgent = MOBILE_REGEX.test(navigator.userAgent);
      const isMobileByWidth = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileByUserAgent || isMobileByWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

 
  return {
    isMobile: isClient ? isMobile : false,
    isClient
  };
}