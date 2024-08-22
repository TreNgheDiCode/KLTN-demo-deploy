"use client";

import { Vortex } from "./ui/vortex";

export default function Loading() {
  return (
    <div className="mx-auto h-screen w-[calc(100%-4rem)] overflow-hidden rounded-md">
      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10"
      >
        <h2 className="text-center text-2xl font-bold text-main dark:text-main-foreground md:text-6xl">
          Đang tải thông tin!
        </h2>
        <p className="mt-6 max-w-xl text-center text-sm text-main dark:text-main-foreground md:text-2xl">
          Nếu trên 10 giây không tải được, vui lòng kiểm tra kết nối mạng của
          bạn hoặc tải lại trang.
        </p>

        <button className="rounded-lg bg-main px-4 py-2 text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] transition duration-200 hover:bg-main/70 dark:bg-main-component dark:text-main-foreground dark:hover:bg-main/70">
          Tải lại trang
        </button>
      </Vortex>
    </div>
  );
}
