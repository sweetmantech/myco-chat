"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import { PrivyProvider } from "@privy-io/react-auth";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

if (!PRIVY_APP_ID) {
  throw new Error(
    "Privy App ID is missing. Please set NEXT_PUBLIC_PRIVY_APP_ID in your .env file."
  );
}

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PrivyProvider appId={PRIVY_APP_ID}>
    <WagmiProvider>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>{children}</ChatProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </PrivyProvider>
);

export default Providers;
