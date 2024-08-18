"use client";

import { toast } from "sonner";
import { ChatBox } from "./chat-box";
import { useEffect, useRef } from "react";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

type Props = {
  clientId: string | undefined;
};

const Chat = ({ clientId }: Props) => {
  const client = new Ably.Realtime({
    authUrl: "/api/ably",
    authMethod: "POST",
  });

  const retry = useRef(0);

  useEffect(() => {
    if (!clientId && retry.current <= 3) {
      setTimeout(() => {
        retry.current++;
        console.log("Đang tải ", retry.current++);
      }, 1000);
    } else if (retry.current > 3)
      toast.error(
        "Không thể tạo phiên hỗ trợ. Vui lòng kiểm tra lại trình duyệt web (có thể do chế độ ẩn danh) hoặc liên hệ với chúng tôi để được hỗ trợ.",
      );
  }, [clientId]);

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={`support:${clientId}`}>
        <ChatBox clientId={clientId} />
      </ChannelProvider>
    </AblyProvider>
  );
};

export default Chat;
