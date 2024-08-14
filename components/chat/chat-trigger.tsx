"use client";

import { IconBrandWechat, IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ChatAction } from "./chat-action";

const Chat = dynamic(() => import("@/components/chat/chat"), { ssr: false });

type Props = {
  clientId: string;
};

const ChatTrigger = ({ clientId }: Props) => {
  const [open, setOpen] = useState(false);

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
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Hỗ trợ trực tuyến</div>
              <ChatAction clientId={clientId} />
            </div>
            <div className="flex flex-col gap-2">
              <Chat clientId={clientId} />
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
