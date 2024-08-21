"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { IconArrowDownFromArc } from "@tabler/icons-react";
import Link from "next/link";
import MagicButton from "./magic-button";

export const RegisterHero = () => {
  return (
    <div className="min-h-screen pb-20 pt-36">
      <div>
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="orange"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="left-full top-28 h-[80vh] w-[50vw]" fill="red" />
        <Spotlight className="left-60 top-28 h-[80vh] w-[50vw]" fill="blue" />
        <Spotlight
          className="right-60 top-28 h-[80vh] w-[50vw]"
          fill="yellow"
        />
      </div>

      <div className="bg-grid-black/[0.05] dark:bg-black-100 dark:bg-grid-white/[0.05] absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-white">
        <div className="dark:bg-black-100 pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative z-10 my-20 flex justify-center">
        <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
          <h2 className="max-w-80 text-center text-xs uppercase tracking-widest text-main-component dark:text-neutral-500">
            Chắp cánh ước mơ du học của bạn cùng CEMC Co!
          </h2>

          <TextGenerateEffect
            words="Đăng ký du học ngay hôm nay!"
            className="text-center text-[40px] text-main dark:text-main-foreground md:text-3xl lg:text-4xl"
          />

          <p className="mb-4 text-center text-sm text-main-component dark:text-neutral-500 md:text-lg md:tracking-wider lg:text-xl">
            Công ty TNHH tư vấn giáo dục và y tế Canada (CEMC CO.,LTD) chuyên về
            dịch vụ tư vấn du học. Công ty cung cấp thông tin và hỗ trợ sinh
            viên trong quá trình tìm kiếm các chương trình du học, đăng ký nhập
            học, xử lý thủ tục visa, tìm kiếm chỗ ở, và cung cấp hỗ trợ về cuộc
            sống và học tập sau khi sinh viên đã đến quốc gia du học.
          </p>

          <Link href="#register-form">
            <MagicButton
              title="Tạo hồ sơ đăng ký"
              icon={<IconArrowDownFromArc />}
              position="right"
              className="bg-main dark:bg-main-foreground"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
