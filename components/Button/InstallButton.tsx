"use client";

import { useDevice } from '@/hooks/useMobileDevice';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { useEffect } from 'react';

export function InstallButton() {
  const { isMobile } = useDevice();
  const { isInstallable, promptToInstall } = useInstallPrompt();

  useEffect(() => {
  }, [isMobile, isInstallable]);

  if (!isMobile || !isInstallable) {
    return null;
  }

  return (
      <button
        onClick={promptToInstall}
        className="fixed !top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-background px-6 py-3 rounded-lg shadow-lg font-bold"
      >
        Add to Home Screen
      </button>
  );
} 