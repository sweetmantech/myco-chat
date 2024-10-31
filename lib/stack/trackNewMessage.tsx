import { Address } from "viem";
import getStackClient from "./getStackClient";
import {
  CHAT_POINT_SYSTEM_ID,
  MESSAGE_SENT_EVENT,
  MESSAGE_SENT_POINT,
} from "../consts";
import { Message } from "ai";

const trackNewMessage = async (
  address: Address,
  message: Message,
  conversationId: string,
) => {
  const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
  const eventName = `${MESSAGE_SENT_EVENT}-${conversationId}`;
  await stackClient.track(eventName, {
    points: MESSAGE_SENT_POINT,
    account: address,
    uniqueId: `${address}-${Date.now()}`,
    metadata: {
      ...message,
      conversationId,
    },
  });
};

export default trackNewMessage;
