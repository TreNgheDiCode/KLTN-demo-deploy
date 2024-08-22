"use server";

import { currentAccount } from "@/lib/account";
import { ChatSupportFormValues, ChatSupportSchema } from "@/schemas";
import { ChatSessionLib } from "@/types";
import { ChatSessionMessage } from "@prisma/client";
import { cookies } from "next/headers";

export const sendChatSupport = async (values: ChatSupportFormValues) => {
  try {
    const validatedValues = ChatSupportSchema.safeParse(values);

    if (!validatedValues.success) {
      return { error: "Dữ liệu không hợp lệ." };
    }

    console.log(values);

    const res = await fetch(`${process.env.API_URL}/api/chat-session`, {
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

export const getChatSession = async (clientId?: string, accountId?: string) => {
  if (!clientId && !accountId) {
    return null;
  }

  const url = `${process.env.NEXT_PUBLIC_API}/api/chat-session/${clientId}/${accountId}`;

  const req = await fetch(url, {
    method: "GET",
    cache: "no-cache",
  });

  const res: ChatSessionLib = await req.json();

  const cookieStore = cookies();
  cookieStore.set("ably_clientId", res?.clientId!, {
    path: "/",
    secure: true,
  });

  if (!res) {
    return null;
  }

  return res;
};

export const deleteChatMessages = async (clientId: string) => {
  try {
    if (!clientId) {
      return { error: "Không tìm thấy mã máy khách và mã người dùng." };
    }

    const account = await currentAccount();
    let accountId = undefined;
    if (account && account.id) {
      accountId = account.id;
    }

    const url = `${process.env.NEXT_PUBLIC_API}/api/chat-session/${clientId}/${accountId}`;
    console.log("DELETE CHAT MESSAGES URL", url);

    await fetch(url, {
      method: "DELETE",
      cache: "no-cache",
    });

    return { success: "Hội thoại đã được xóa." };
  } catch (error) {
    console.log("DELETE CHAT MESSAGES ERROR", error);

    return { error: "Lỗi khi xóa hội thoại." };
  }
};
