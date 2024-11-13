"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import ProfileProvider from "./ProfileProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <ChatProvider>{children}</ChatProvider>
      </ProfileProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
