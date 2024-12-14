"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import PrivyProvider from "./PrivyProvider";
import { ToolCallProvider } from "./ToolCallProvider";
import { Message } from "ai";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import { PaymasterProvider } from "./PaymasterProvider";
import { ConversationsProvider } from "./ConverstaionsProvider";

const queryClient = new QueryClient();

// Create an empty message for initial state
const emptyMessage: Message = { id: "", role: "assistant", content: "" };

const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <PrivyProvider>
      <WagmiProvider>
        <PaymasterProvider>
          <ZoraCreateProvider>
            <ToolCallProvider message={emptyMessage} scrollTo={() => { }}>
              <ConversationsProvider>
                <ChatProvider>{children}</ChatProvider>
              </ConversationsProvider>
            </ToolCallProvider>
          </ZoraCreateProvider>
        </PaymasterProvider>
      </WagmiProvider>
    </PrivyProvider>
  </QueryClientProvider>
);

export default Providers;
