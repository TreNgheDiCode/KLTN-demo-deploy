"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { ChatBox } from "./chat-box";

type Props = {
  clientId: string;
};

const Chat = ({ clientId }: Props) => {
  return <ChatBox clientId={clientId} />;
};

export default Chat;
