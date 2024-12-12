"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./ChatProvider";
import WagmiProvider from "./WagmiProvider";
import PrivyProvider from "./PrivyProvider";
import { ToolCallProvider } from "./ToolCallProvider";
import { Message } from "ai";
import { ZoraCreateProvider } from "./ZoraCreateProvider";
import { PaymasterProvider } from "./PaymasterProvider";

const queryClient = new QueryClient();

// Create an empty message for initial state
const emptyMessage: Message = { id: "", role: "assistant", content: "" };

const Providers = ({ children }: { children: React.ReactNode }) => (
  <PrivyProvider>
    <WagmiProvider>
      <QueryClientProvider client={queryClient}>
        <PaymasterProvider>
          <ZoraCreateProvider>
            <ToolCallProvider message={emptyMessage} scrollTo={() => {}}>
              <ChatProvider>{children}</ChatProvider>
            </ToolCallProvider>
          </ZoraCreateProvider>
        </PaymasterProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </PrivyProvider>
);

export default Providers;
