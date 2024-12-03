"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import PrivyProvider from "./PrivyProvider";
import WagmiProvider from "./WagmiProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <QueryClientProvider client={queryClient}>
      <PrivyProvider>
        <ChatProvider>{children}</ChatProvider>
      </PrivyProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
