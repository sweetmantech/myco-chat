"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import PrivyProvider from "./PrivyProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PrivyProvider>
    <WagmiProvider>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>{children}</ChatProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </PrivyProvider>
);

export default Providers;
