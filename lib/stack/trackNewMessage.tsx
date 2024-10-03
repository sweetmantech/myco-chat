import { Address } from "viem";
import getStackClient from "./getStackClient";
import {
  CHAT_POINT_SYSTEM_ID,
  USER_MESSAGE_SENT_EVENT,
  USER_MESSAGE_SENT_POINT,
} from "../consts";

const trackNewMessage = async (address: Address, message: string) => {
  const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
  console.log("TRACK CHAT_POINT_SYSTEM_ID", CHAT_POINT_SYSTEM_ID);
  await stackClient.track(USER_MESSAGE_SENT_EVENT, {
    points: USER_MESSAGE_SENT_POINT,
    account: address,
    uniqueId: `${address}-${Date.now().toLocaleString()}`,
    metadata: {
      message,
    },
  });
};

export default trackNewMessage;
