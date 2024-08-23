import { ClientMessage } from "@/actions/chatbot";
import { Separator } from "@/components/ui/separator";
import { IconExclamationCircle } from "@tabler/icons-react";
import Link from "next/link";
import Loading from "../loading";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { useSession } from "next-auth/react";

export interface ChatList {
  messages: ClientMessage[];
  isShared: boolean;
}

export function ChatList({ messages, isShared }: ChatList) {
  const session = useSession();
  const { messagesRef, visibilityRef } = useScrollAnchor();

  if (!messages.length) {
    return null;
  }

  return (
    <div
      ref={visibilityRef}
      className="relative mx-auto max-w-4xl px-4 bg-grid-black/[0.05] dark:bg-grid-white/[0.05]"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white opacity-15 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {!isShared && !session ? (
        <>
          <div className="group relative mb-4 flex items-start md:-ml-12">
            <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
              <IconExclamationCircle />
            </div>
            <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
              <p className="leading-normal text-muted-foreground">
                Vui lòng{" "}
                <Link href="/login" className="underline">
                  đăng nhập
                </Link>{" "}
                hoặc{" "}
                <Link href="/signup" className="underline">
                  đăng ký
                </Link>{" "}
                để lưu và truy cập các đoạn hội thoại khác nhau!
              </p>
            </div>
          </div>
          <Separator className="my-4" />
        </>
      ) : null}

      <div ref={messagesRef}>
        {messages.map((message, index) => (
          <div key={message.id}>
            {message.display}
            {index < messages.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}
