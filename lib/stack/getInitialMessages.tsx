import { Message } from "ai";
import { Address, getAddress } from "viem";
import { CHAT_POINT_SYSTEM_ID, MESSAGE_SENT_EVENT } from "../consts";
import getStackClient from "./getStackClient";
import { StackMessage } from "../conversation.types";

const getInitialMessages = async (
  walletAddress: Address,
  conversationId: string,
) => {
  const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);

  const events = await stackClient.getEvents({
    query: stackClient
      .eventsQuery()
      .where({
        eventType: `${MESSAGE_SENT_EVENT}-${conversationId}`,
      })
      .build(),
  });
  
  const messages: StackMessage[] = events
    .filter(event => 
      event.metadata.conversationId === conversationId &&
      (!event.metadata.role || event.metadata.role === "assistant" || 
       event.metadata.associatedAccount === getAddress(walletAddress))
    )
    .map((event) => {
      const data = {
        id: event.metadata.id,
        content: event.metadata.content,
        role: event.metadata.role as Message["role"],
        createdAt: new Date(event.timestamp),
      } as StackMessage;
      if (event.metadata.role === "assistant")
        data.questionId = event.metadata.questionId;
      return data;
    });
    
  messages.sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
  return messages;
};

export default getInitialMessages;
