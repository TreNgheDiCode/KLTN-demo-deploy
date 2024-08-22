"use client";

import { Vortex } from "@/components/ui/vortex";

export const CountriesSkeleton = () => {
  return (
    <Vortex
      backgroundColor="black"
      className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
    >
      <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
        Đang tải thông tin...
      </h2>
      <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm sm:flex-row">
        <div className="flex h-[60px] w-full cursor-pointer flex-row gap-2 rounded-lg bg-zinc-800 p-2 text-left hover:bg-zinc-800 sm:w-[208px]"></div>
        <div className="flex h-[60px] w-full cursor-pointer flex-row gap-2 rounded-lg bg-zinc-800 p-2 text-left hover:bg-zinc-800 sm:w-[208px]"></div>
        <div className="flex h-[60px] w-full cursor-pointer flex-row gap-2 rounded-lg bg-zinc-800 p-2 text-left hover:bg-zinc-800 sm:w-[208px]"></div>
      </div>
    </Vortex>
  );
};
