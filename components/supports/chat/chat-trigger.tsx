"use client";

import {
  IconArrowLeftBar,
  IconBrandOpenai,
  IconBrandWechat,
  IconInfoSquare,
  IconX,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ChatAction } from "./chat-action";
import { currentAccount } from "@/lib/account";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { AIWrapper } from "../ai/ai-wrapper";

const Chat = dynamic(() => import("@/components/supports/chat/chat"), {
  ssr: false,
});

type Props = {
  clientId: string | undefined;
  session: Awaited<ReturnType<typeof currentAccount>>;
};

enum SUPPORT_VARIANT {
  AI = "AI",
  FEEDBACK = "FEEDBACK",
  CHAT = "CHAT",
}

const supportVariantLabelMap: Record<SUPPORT_VARIANT, string> = {
  [SUPPORT_VARIANT.AI]: "Trợ lý ảo",
  [SUPPORT_VARIANT.FEEDBACK]: "Gửi phản hồi",
  [SUPPORT_VARIANT.CHAT]: "Chat trực tuyến",
};

const supportVariantIconMap: Record<SUPPORT_VARIANT, JSX.Element> = {
  [SUPPORT_VARIANT.AI]: <IconBrandOpenai className="mr-2.5 h-6 w-6" />,
  [SUPPORT_VARIANT.FEEDBACK]: <IconInfoSquare className="mr-2.5 h-6 w-6" />,
  [SUPPORT_VARIANT.CHAT]: <IconBrandWechat className="mr-2.5 h-6 w-6" />,
};

const ChatTrigger = ({ clientId, session }: Props) => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<SUPPORT_VARIANT | null>(null);
  const iconCls = "w-12 h-12 text-primary-500 m-2";
  const icon = open ? (
    <IconX className={iconCls} />
  ) : (
    <IconBrandWechat className={iconCls} />
  );

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-6 z-[9999] w-[300px] rounded-lg bg-white text-main shadow-lg dark:bg-main-component dark:text-white md:w-[35%] lg:w-[25%]">
          <div className="flex flex-col gap-2 p-4">
            <div
              className={cn(
                "flex items-center justify-between",
                variant ? "justify-between" : "justify-center",
              )}
            >
              <div className="flex items-center gap-2.5 text-lg font-semibold">
                {variant && (
                  <IconArrowLeftBar
                    className="size-4 cursor-pointer"
                    onClick={() => setVariant(null)}
                  />
                )}
                {variant && <span className="flex items-center gap-2.5">{supportVariantLabelMap[variant]}
                    {supportVariantIconMap[variant]}
                  </span>}
                {!variant && (
                  <div className="flex w-full flex-col items-center gap-6">
                    <Button
                      onClick={() => setVariant(SUPPORT_VARIANT.AI)}
                      className="w-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl dark:bg-blue-700 dark:text-white dark:shadow-md dark:hover:bg-blue-800 dark:hover:shadow-xl"
                    >
                      <IconBrandOpenai className="mr-2.5 h-6 w-6" />
                      Trợ lý ảo
                    </Button>
                    <Button
                      onClick={() => setVariant(SUPPORT_VARIANT.FEEDBACK)}
                      className="w-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:shadow-xl dark:bg-green-700 dark:text-white dark:shadow-md dark:hover:bg-green-800 dark:hover:shadow-xl"
                    >
                      <IconInfoSquare className="mr-2.5 h-6 w-6" />
                      Tạo phiếu phản hồi
                    </Button>
                    <Button
                      onClick={() => setVariant(SUPPORT_VARIANT.CHAT)}
                      className="w-full bg-purple-500 text-white shadow-lg hover:bg-purple-600 hover:shadow-xl dark:bg-purple-700 dark:text-white dark:shadow-md dark:hover:bg-purple-800 dark:hover:shadow-xl"
                    >
                      <IconBrandWechat className="mr-2.5 h-6 w-6" />
                      Chat trực tuyến
                    </Button>
                  </div>
                )}
              </div>
              {clientId && variant === SUPPORT_VARIANT.CHAT && (
                <ChatAction clientId={clientId} />
              )}
            </div>
            <div className="flex flex-col gap-2">
              {variant === SUPPORT_VARIANT.AI && <AIWrapper />}
              {variant === SUPPORT_VARIANT.CHAT && (
                <Chat clientId={clientId} session={session} />
              )}
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-6 right-6 z-[9999] rounded-full bg-white shadow-lg dark:bg-main-component">
        <div
          className="flex h-12 w-12 cursor-pointer items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {icon}
        </div>
      </div>
    </>
  );
};

export default ChatTrigger;
