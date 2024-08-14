"use client";

import { sendChatSupport } from "@/actions/chat-support";
import { useChatMessages } from "@/hooks/use-chat-messages";
import { ChatSupportFormValues, ChatSupportSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatSessionRole } from "@prisma/client";
import { IconArrowElbowLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { KeyboardEventHandler, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

type Props = {
  clientId: string;
};

export const ChatBox = ({ clientId }: Props) => {
  const {
    messages: receivedMessages,
    setMessages,
    loading,
    channel,
  } = useChatMessages(clientId);

  const { data } = useSession();

  let messageEnd = useRef<HTMLDivElement>(null);

  const sendChatMessage = (messageText: string) => {
    if (!messageText) {
      return;
    }
    channel.publish({ name: "support", data: messageText });
  };

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.code !== "Enter" || message.length === 0) {
      return;
    }

    handleSubmit(onSubmit)();
    event.preventDefault();
  };

  const form = useForm<ChatSupportFormValues>({
    resolver: zodResolver(ChatSupportSchema),
    mode: "onBlur",
    defaultValues: {
      role: ChatSessionRole.USER,
      message: "",
      clientId,
      userId: data?.user.id,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (values: ChatSupportFormValues) => {
    sendChatMessage(values.message);
    form.reset();
    await sendChatSupport(values).then((res) => {
      if (res?.error) {
        toast.error(res.error);
      } else if (typeof res?.success === "string") {
        toast.success(res?.success);
      }
    });
  };

  const message = form.watch("message");

  return (
    <div className="flex h-[500px] flex-col">
      <div className="flex-1 overflow-y-auto text-main dark:text-white">
        {loading ? (
          <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200"></div>
        ) : receivedMessages.length > 0 ? (
          receivedMessages.map((message, index) => (
            <div
              key={index}
              className={`my-2 flex gap-3 ${
                message.role === ChatSessionRole.USER
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.role === ChatSessionRole.ADMIN && (
                <div className="relative h-8 w-8">
                  <Image
                    src="/logo_icon_light.png" // Replace with the actual path to the admin avatar
                    alt="Admin Avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              )}

              <div className="max-w-xs rounded-lg bg-gray-200 p-2 dark:bg-gray-800">
                <div className="text-sm font-semibold">
                  {message.name}{" "}
                  <span className="text-xs text-gray-500">
                    {format(message.createdAt, "HH:mm")}
                  </span>
                </div>
                <div className="text-sm">{message.message}</div>
              </div>

              {message.role === ChatSessionRole.USER && (
                <div className="relative h-8 w-8">
                  <Image
                    src={"/logo_icon_light.png"} // Replace with the actual path to the user avatar
                    alt="User Avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              )}
              <div ref={messageEnd} />
            </div>
          ))
        ) : (
          <div className="text-center">Không có tin nhắn nào.</div>
        )}
      </div>
      <div className="flex items-center p-4">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full items-center gap-2"
          >
            <FormField
              control={control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      autoFocus
                      onKeyDown={handleKeyPress}
                      placeholder="Nhập tin nhắn..."
                      className="min-h-12"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={message === ""} type="submit" size="icon">
              <IconArrowElbowLeft />
              <span className="sr-only">Gửi</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
