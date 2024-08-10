"use client";
import React from "react";
import Image from "next/image";
import { School } from "@prisma/client";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

interface Props {
  school: School;
}
const Welcome = ({ school }: Props) => {
  const { t } = useTranslation("school");
  return (
    <>
      <div className="relative flex h-96 min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-slate-900">
        <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-slate-900 [mask-image:radial-gradient(transparent,white)]" />
        <Boxes />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
          className="flex justify-center"
        >
          <Image
            alt="logoTruong1"
            src={school.logo}
            width={200}
            height={150}
            className="mb-6 rounded-lg shadow-lg"
          />
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
          className={cn("relative z-20 text-xl text-white md:text-4xl")}
        >
          {school.name}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
          className="relative z-20 mt-2 text-center text-neutral-300"
        >
          {t("Community college")}
        </motion.p>
      </div>
      {/* History */}
      <div className="mt-1 bg-gray-100 dark:bg-black">
        <h1 className="ml-3 py-4 text-3xl font-extrabold text-black dark:text-primary md:text-5xl">
          {t("Information")}
        </h1>
        <div className="container px-2 py-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="relative h-[50vh] w-full overflow-hidden rounded-lg md:h-[65vh]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="relative rounded-lg bg-white p-6 text-black shadow-lg dark:border-2 dark:border-[#cccccc] dark:bg-black dark:text-primary md:col-span-2">
              <div className="font-semibold">
                {t("InformationAboutSchool")}:
              </div>
              <div className="mt-2">
                <div className="relative mb-12 pl-8">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        school?.history ??
                        "Đamg cập nhật thêm về thông tin của trường",
                    }}
                  />
                </div>
              </div>
              <div className="">
                <Image
                  src={school.logo}
                  alt="logoBottom"
                  width={130}
                  height={82}
                  className="absolute bottom-0 right-0 rounded-sm shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Welcome;
