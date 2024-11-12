"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import ProfileProvider from "./ProfileProvider";
import CollectionProvider from "./CollectionProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <CollectionProvider>
          <ZoraCreateProvider>
            <ChatProvider>{children}</ChatProvider>
          </ZoraCreateProvider>
        </CollectionProvider>
      </ProfileProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
