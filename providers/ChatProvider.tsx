"use client";

import useNewChat from "@/hooks/useNewChat";
import React, { createContext, useContext, useMemo } from "react";

const ChatContext = createContext<ReturnType<typeof useNewChat>>(
  {} as ReturnType<typeof useNewChat>
);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const chat = useNewChat();

  const value = useMemo(() => ({ ...chat }), [chat]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

const useChatProvider = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatProvider must be used within a ChatProvider");
  }
  return context;
};

export { ChatProvider, useChatProvider };
