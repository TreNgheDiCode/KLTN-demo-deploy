"use client";
import { ChatBotPlus, Sidebar, SidebarBody } from "@/components/ui/sidebar";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ChatBotSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col">
          {open ? <Logo /> : <LogoIcon />}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mb-4 flex items-center rounded-lg border-main bg-white px-2 py-3 text-sm font-normal text-main shadow-md dark:bg-main-component dark:text-white"
    >
      <Image
        src="/logo_icon_light.png"
        className="mr-2 bg-transparent dark:mr-0 dark:hidden"
        alt="logo"
        width={43}
        height={43}
      />
      <Image
        src="/logo_icon_dark.png"
        className="mr-0 hidden bg-transparent dark:mr-2 dark:block"
        alt="logo"
        width={43}
        height={43}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-semibold"
      >
        CEMC Co,. Ltd
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center py-1 text-sm font-normal text-black"
    >
      <Image
        src="/logo_icon_light.png"
        className="bg-transparent dark:hidden"
        alt="logo"
        width={50}
        height={50}
      />
      <Image
        src="/logo_icon_dark.png"
        className="hidden bg-transparent dark:block"
        alt="logo"
        width={50}
        height={50}
      />
    </Link>
  );
};
