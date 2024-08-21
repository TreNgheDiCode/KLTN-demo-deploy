"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  className?: string;
  btnClass?: string;
};

const MagicButton = ({
  title,
  icon: Icon,
  position,
  handleClick,
  className,
  btnClass,
}: Props) => {
  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative inline-flex h-12 w-full overflow-hidden rounded-md p-[1px] focus:outline-none md:mt-10 md:w-60",
        btnClass,
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl",
          className,
        )}
      >
        {position === "left" && Icon}
        {title}
        {position === "right" && Icon}
      </span>
    </button>
  );
};

export default MagicButton;
