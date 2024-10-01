import Chat from "../Chat";

export default function Component() {
  return (
    <div className="flex font-nounish flex-col h-[100vh] bg-[#f5efd7] border border-black">
      <main className="flex-1 flex flex-col justify-center p-4">
        <div className="flex flex-col items-center mt-8 space-y-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/myco-logo.png?height=80&width=80"
            alt="Mushroom logo"
            className="w-20 h-20 rounded-full"
          />
        </div>
      </main>

      <footer className="p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Chat />
        </div>
        <p className="text-sm text-gray-500 text-center">
          MycoChat can make mistakes. Check important info.
        </p>
      </footer>
    </div>
  );
}
