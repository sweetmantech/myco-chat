import { XCircle } from 'lucide-react';

export default function Offline() {
  return (
    <div className="flex font-nounish flex-col h-[100vh] bg-background border border-black">
      <main className="flex-1 flex flex-col justify-center p-4">
        <div className="flex flex-col items-center mt-8 space-y-6">
          <XCircle className="w-16 h-16 text-gray-400" />
          <h1 className="text-2xl font-bold text-center">No Internet Connection</h1>
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              Please check your internet connection and try again.
            </p>
            <p className="text-gray-500 text-sm">
              Some features may be available offline, but you will need to reconnect for full functionality.
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>

      <footer className="p-4">
        <p className="text-md text-gray-500 text-center">
          MycoChat - Currently Offline
        </p>
      </footer>
    </div>
  );
}
