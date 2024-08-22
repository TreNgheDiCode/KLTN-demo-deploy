"use client";

import AblyClient from "@/hooks/use-ably";
import { currentAccount } from "@/lib/account";
import { AblyProvider, ChannelProvider } from "ably/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ChatBox } from "./chat-box";

type Props = {
  clientId: string | undefined;
  session: Awaited<ReturnType<typeof currentAccount>>;
};

const Chat = ({ clientId, session }: Props) => {
  const client = AblyClient.getInstance();

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

  if (!client) {
    return null;
  }

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={`support:${clientId}`}>
        <ChatBox clientId={clientId} session={session} />
      </ChannelProvider>
    </AblyProvider>
  );
};

export default Chat;
