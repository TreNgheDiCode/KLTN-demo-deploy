"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import { ChatBox } from "./chat-box";

type Props = {
  clientId: string;
};

const Chat = ({ clientId }: Props) => {
  const client = new Ably.Realtime({
    authUrl: "/api/ably",
    authMethod: "POST",
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="support">
        <ChatBox clientId={clientId} />
      </ChannelProvider>
    </AblyProvider>
  );
};

export default Chat;
