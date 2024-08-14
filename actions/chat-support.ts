"use server";

import { ChatSupportFormValues, ChatSupportSchema } from "@/schemas";
import { ChatSessionLib } from "@/types";
import { ChatSessionMessage } from "@prisma/client";

export const sendChatSupport = async (values: ChatSupportFormValues) => {
  try {
    const validatedValues = ChatSupportSchema.safeParse(values);

    if (!validatedValues.success) {
      return { error: "Dữ liệu không hợp lệ." };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/chat-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedValues.data),
    }).then((res) => res.json());

    return res;
  } catch (error) {
    console.log("SEND CHAT SUPPORT ERROR", error);

    return { error: "Lỗi khi tạo phiên hỗ trợ." };
  }
};

export const getChatSessionMessages = async (
  clientId?: string,
  accountId?: string,
) => {
  let chatMessages: ChatSessionMessage[] = [];

  if (!clientId && !accountId) {
    return chatMessages;
  }

  const url = `${process.env.NEXT_PUBLIC_API}/api/chat-session/${clientId}/${accountId}`;

  const req = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const res: ChatSessionLib = await req.json();

  if (!res) {
    return chatMessages;
  }

  return (chatMessages = res.messages);
};

export const deleteChatMessages = async (
  clientId: string,
  accountId?: string,
) => {
  try {
    if (!clientId && !accountId) {
      return { error: "Không tìm thấy mã máy khách và mã người dùng." };
    }

    const url = `${process.env.NEXT_PUBLIC_API}/api/chat-session/${clientId}/${accountId}`;

    const req = await fetch(url, {
      method: "DELETE",
      cache: "no-cache",
    });

    const res = await req.json();

    if (res.error) {
      return { error: res.error };
    }

    return { success: "Hội thoại đã được xóa." };
  } catch (error) {
    console.log("DELETE CHAT MESSAGES ERROR", error);

    return { error: "Lỗi khi xóa hội thoại." };
  }
};
