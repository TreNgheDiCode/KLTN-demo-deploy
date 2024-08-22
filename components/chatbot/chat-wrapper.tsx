"use client";

import { AI } from "@/actions/chatbot";
import { useUIState } from "ai/rsc";
import { ReactNode } from "react";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { ChatList } from "./chat-list";
import { EmptyScreen } from "./empty-screen";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export default function ChatWrapper() {
  const [conversation, setConversation] = useUIState<typeof AI>();

  const { scrollRef } = useScrollAnchor();

  return (
    <>
      <div className="flex-grow overflow-y-auto">
        <div className="h-px w-full" ref={scrollRef} />
        {conversation.length ? (
          <ChatList messages={conversation} isShared={false} />
        ) : (
          <EmptyScreen />
        )}
      </div>
    </>
  );
}
