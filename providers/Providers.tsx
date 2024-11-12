"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import ProfileProvider from "./ProfileProvider";
import { FileUploadProvider } from "./FileUploadProvider";
import CollectionProvider from "./CollectionProvider";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <WagmiProvider>
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <CollectionProvider>
          <FileUploadProvider>
            <ChatProvider>{children}</ChatProvider>
          </FileUploadProvider>
        </CollectionProvider>
      </ProfileProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default Providers;
