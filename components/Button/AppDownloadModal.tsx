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
    <div className='fixed font-nounish text-black !top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-4  w-[90%] mx-auto bg-transparent'>
      <div className='rounded-3xl border border-black p-4 flex flex-col space-y-10 shadow-[2px_2px_2px_rgba(0,0,0,0.8)]'>
        <div className='flex flex-col space-y-2'>
          <h2 className='text-lg'>Download the app</h2>
          <p className='text-2xl'>For the best experience, download the app.</p>
        </div>
        <button
          onClick={promptToInstall}
          className=" bg-black text-white px-6 py-3 w-[260px] rounded-full mx-auto"
        >
          Download
        </button>
      </div>
      

      <button onClick={() => setIsInstallable(false)} className='text-black rounded-full border border-black px-6 py-3  shadow-[2px_2px_2px_rgba(0,0,0,0.8)] w-[260px] mx-auto'>Not Now</button>
    
    </div>
  );
} 