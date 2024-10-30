"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <QueryClientProvider client={queryClient}>
      <ChatProvider>{children}</ChatProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
