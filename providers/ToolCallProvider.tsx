"use client";

import { Message } from "ai";
import React, { createContext, useContext, useMemo } from "react";
import useToolCall from "@/hooks/useToolCall";

type ToolCallContextType = ReturnType<typeof useToolCall>;

const ToolCallContext = createContext<ToolCallContextType | undefined>(
  undefined,
);

const ToolCallProvider = ({
  children,
  message,
}: {
  children: React.ReactNode;
  message: Message;
}) => {
  const toolCall = useToolCall(message);

  const value = useMemo(() => ({ ...toolCall }), [toolCall]);

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
