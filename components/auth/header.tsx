"use client";

import { cn } from "@nextui-org/react";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  subLabel?: string;
}

export const Header = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1
        className={cn(
          "text-center text-3xl font-semibold text-[#7D1F1F] dark:text-white",
          font.className,
        )}
      ></h1>
    </div>
  );
};
