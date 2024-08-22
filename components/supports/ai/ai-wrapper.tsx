"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/textarea";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconArrowElbowLeft, IconBrandOpenai } from "@tabler/icons-react";
import Image from "next/image";
import { format } from "date-fns";

const formSchema = z.object({
  content: z.string({
    required_error: "Vui lòng nhập tin nhắn",
  }),
});

type Prompt = z.infer<typeof formSchema>;

export const AIWrapper = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
    api: "/api/ai",
  });

  const form = useForm<Prompt>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      content: "",
    },
  });

  const { control, watch } = form;
  const content = watch("content");

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.code !== "Enter" || content.length === 0) {
      return;
    }

    handleSubmit(event);
    event.preventDefault();
  };

  let messageEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <div className="flex h-[500px] flex-col">
      <div className="flex-1 overflow-y-auto text-main dark:text-white">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 flex gap-3 ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.role !== "user" && (
                <div className="relative h-8 w-8">
                  <IconBrandOpenai className="size-8" />
                </div>
              )}

              <div className="max-w-xs rounded-lg bg-gray-200 p-2 dark:bg-gray-800">
                <div className="text-sm font-semibold">
                  {message.role === "user" ? "Bạn" : "Trợ lý ảo"}{" "}
                  <span className="text-xs text-gray-500">
                    {format(message.createdAt ?? new Date(), "HH:mm")}
                  </span>
                </div>
                <div className="text-sm">{message.content.length > 0 ? 
                  message.content : <span className="italic font-light">
                  {"Đang đồng bộ dữ liệu: " + message?.toolInvocations?.[0].toolName}
                </span>  
              }</div>
              </div>

              {message.role === "user" && (
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
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2"
        >
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    autoFocus
                    onKeyDown={handleKeyPress}
                    placeholder="Nhập tin nhắn..."
                    className="min-h-12"
                    {...field}
                    value={input}
                    onChange={(event) => {
                      handleInputChange(event);
                      field.onChange(event.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button disabled={content === ""} type="submit" size="icon">
            <IconArrowElbowLeft />
            <span className="sr-only">Gửi</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
