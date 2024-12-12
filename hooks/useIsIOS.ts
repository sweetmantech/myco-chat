/* eslint-disable @typescript-eslint/no-explicit-any */
const useIsIOS = () => {
  const isIos = () => {
    if (typeof window === 'undefined') return false;
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isIPadOS = userAgent.includes('macintosh') && navigator.maxTouchPoints > 1;
    
    const isStandalone = 'standalone' in window.navigator && (window.navigator as any).standalone === true;
    
    return (isIOS || isIPadOS) && !isStandalone;
  };

  return isIos();
};

export default useIsIOS;
  