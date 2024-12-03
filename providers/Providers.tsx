"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import { PrivyProvider } from "@privy-io/react-auth";

const PRIVY_APP_ID = "cm46y5zd8012byzh6hdqcvvvg";

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
