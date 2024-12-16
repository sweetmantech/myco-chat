import React from 'react';
import useIsIOS from '@/hooks/useIsIOS';

const IOSInstallPrompt: React.FC = () => {
  const isIOS = useIsIOS();

  if (!isIOS) return null;

  return (
    <div className="fixed w-11/12 max-w-md mx-auto !top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-black px-6 py-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-2 text-lg">Install Myco-Chat on your iPhone</h3>
      <p className="text-sm text-black">
        1. Tap the share button <span className="inline-block">
          <svg className="w-4 h-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </span>
      </p>
      <p className="text-sm text-black">
        2. Select &quot;Add to Home Screen&quot;
      </p>
    </div>
  );
};

export default IOSInstallPrompt; 