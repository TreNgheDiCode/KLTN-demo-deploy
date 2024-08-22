import { getChatSession } from "@/actions/chat-support";
import { currentAccount } from "@/lib/account";
import { ChatSessionRole } from "@prisma/client";
import * as Ably from "ably";
import { useChannel } from "ably/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export class ChatSessionMessage {
  name: string;
  message: string;
  role: ChatSessionRole;
  createdAt: Date;

  constructor(
    name: string,
    message: string,
    role: ChatSessionRole,
    createdAt: Date,
  ) {
    this.name = name;
    this.message = message;
    this.role = role;
    this.createdAt = createdAt;
  }
}

/**
 *
 * @param clientId: Mã máy khách
 * @returns: Trả về danh sách tin nhắn với kiểu dữ liệu ChatSessionMessage
 */

export const useChatMessages = (
  session: Awaited<ReturnType<typeof currentAccount>>,
  clientId?: string,
) => {
  const [receivedMessages, setMessages] = useState<ChatSessionMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [senderName, setSenderName] = useState<string>("Bạn");

  const { channel } = useChannel(
    `support:${clientId}`,
    (message: Ably.Message) => {
      const history = receivedMessages.slice(-50);

      const messageExists = history.some(
        (m) =>
          m.message === message.data &&
          new Date(m.createdAt).getTime() ===
            new Date(message.timestamp!).getTime(),
      );

      if (!messageExists) {
        setMessages([
          ...history,
          new ChatSessionMessage(
            message.clientId === clientId ? senderName : "Hỗ trợ viên",
            message.data,
            message.clientId === clientId
              ? ChatSessionRole.USER
              : ChatSessionRole.ADMIN,
            new Date(message.timestamp ?? new Date()),
          ),
        ]);
      }
    },
  );

  const getMessages = async () => {
    const chatSession = await getChatSession(clientId, session?.id);
    if (session && session.name) {
      setSenderName(session.name);
    }

    const messages = chatSession?.messages ?? [];
    const newMessages = messages.map(
      (message) =>
        new ChatSessionMessage(
          message.role === ChatSessionRole.USER
            ? (chatSession?.name ?? senderName)
            : "Hỗ trợ viên",
          message.message,
          message.role,
          message.createdAt,
        ),
    );
    setMessages(newMessages);
    return newMessages;
  };

  useEffect(() => {
    const fetchMessagesAndHistory = async () => {
      setLoading(true);
      // First, fetch the messages from the server
      const messages = await getMessages();

      // Then, load the history from Ably
      let history: Ably.PaginatedResult<Ably.Message> | null =
        await channel.history();
      do {
        const newHistoryMessages: ChatSessionMessage[] = [];

        history.items
          .sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0))
          .forEach((message) => {
            const existingMessage = messages.find(
              (m) =>
                m.message === message.data &&
                new Date(m.createdAt).getTime() ===
                  new Date(message.timestamp!).getTime(),
            );
            if (!existingMessage) {
              newHistoryMessages.push(
                new ChatSessionMessage(
                  message.clientId === clientId ? senderName : "Hỗ trợ viên",
                  message.data,
                  message.clientId === clientId
                    ? ChatSessionRole.USER
                    : ChatSessionRole.ADMIN,
                  new Date(message.timestamp!),
                ),
              );
            }
          });

        if (newHistoryMessages.length > 0) {
          setMessages((prevMessages) => [
            ...prevMessages,
            ...newHistoryMessages,
          ]);
        }

        history = await history.next();
      } while (history);
    };

    fetchMessagesAndHistory();
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId, session?.id]);

  return { messages: receivedMessages, setMessages, loading, channel };
};
