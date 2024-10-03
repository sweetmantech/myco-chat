import { Address } from "viem";
import getStackClient from "./getStackClient";
import {
  ASSISTANT_MESSAGE_SENT_EVENT,
  CHAT_POINT_SYSTEM_ID,
  MESSAGE_SENT_POINT,
  USER_MESSAGE_SENT_EVENT,
} from "../consts";
import { Message } from "ai";

const trackNewMessage = async (address: Address, message: Message) => {
  const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
  const pointSystemId =
    message.role === "user"
      ? USER_MESSAGE_SENT_EVENT
      : ASSISTANT_MESSAGE_SENT_EVENT;
  await stackClient.track(pointSystemId, {
    points: MESSAGE_SENT_POINT,
    account: address,
    uniqueId: `${address}-${Date.now()}`,
    metadata: message,
  });
};

export default trackNewMessage;
