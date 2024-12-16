"use client";

import { useDevice } from '@/hooks/useMobileDevice';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';


export function AppDownloadModal() {
  const { isMobile } = useDevice();
  const { isInstallable, promptToInstall, setIsInstallable } = useInstallPrompt();
  

  if (!isMobile || !isInstallable) {
    return null;
  }

  return (
    <div className='fixed !top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-4  w-8/12 bg-background'>
      <div className='rounded-3xl shadow-lg border border-black p-4 flex flex-col space-y-10'>
        <div className='flex flex-col space-y-2'>
          <h2 className='text-2xl font-bold'>Download the app</h2>
          <p className='text-lg font-semibold'>For the best experience, download the app.</p>
        </div>
        <button
          onClick={promptToInstall}
          className=" bg-black text-white px-6 py-3 font-bold rounded-full"
        >
          Download
        </button>
      </div>
      <button onClick={() => setIsInstallable(false)} className='text-black rounded-full border border-black px-6 py-3 font-bold shadow-lg'>Not Now</button>
    </div>
  );
} 