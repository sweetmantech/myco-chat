"use client";

import useToolCall from "@/hooks/useToolCall";
import { Message } from "ai";
import React, { createContext, useContext, useMemo } from "react";

type ToolCallContextType = ReturnType<typeof useToolCall> & {
  scrollDown: () => void;
};

const ToolCallContext = createContext<ToolCallContextType | undefined>(
  undefined,
);

const ToolCallProvider = ({
  children,
  message,
  scrollDown,
}: {
  children: React.ReactNode;
  message: Message;
  scrollDown: () => void;
}) => {
  const toolCall = useToolCall(message);

  const value = useMemo(() => ({ ...toolCall, scrollDown }), [toolCall]);

  return (
    <ToolCallContext.Provider value={value}>
      {children}
    </ToolCallContext.Provider>
  );
};

const useToolCallProvider = () => {
  const context = useContext(ToolCallContext);
  if (!context) {
    throw new Error(
      "useToolCallProvider must be used within a ToolCallProvider",
    );
  }
  return context;
};

export { ToolCallProvider, useToolCallProvider };
