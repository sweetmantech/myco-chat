"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import ProfileProvider from "./ProfileProvider";
import { PaymasterProvider } from "./PaymasterProvider";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import CollectionProvider from "./CollectionProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <CollectionProvider>
          <PaymasterProvider>
            <ZoraCreateProvider>
              <ChatProvider>{children}</ChatProvider>
            </ZoraCreateProvider>
          </PaymasterProvider>
        </CollectionProvider>
      </ProfileProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
