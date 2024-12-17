import Suggestions from "./Suggestions";
import ChatInput from "../Chat/ChatInput";
import { AppDownloadModal } from "../Button/AppDownloadModal";
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { useDevice } from '@/hooks/useMobileDevice';

export default function LandingPage() {
  const { isInstallable } = useInstallPrompt();
  const { isMobile } = useDevice();
  const showModal = isMobile && isInstallable;

  return (
    <div className="flex font-nounish flex-col h-[100vh] bg-background border border-black">
      <main className="flex-1 flex flex-col justify-center p-4">
        <div className="flex flex-col items-center mt-8 space-y-4">
          {!showModal && <Suggestions />}
        </div>
      </main>

      <footer className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <ChatInput />
        </div>
        <p className="text-md text-gray-500 text-center">
          MycoChat can make mistakes. Check important info.
        </p>
      </footer>
      <AppDownloadModal />
    </div>
  );
}
