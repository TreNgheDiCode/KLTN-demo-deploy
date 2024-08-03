"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export const VideoSection = () => {
  const { t } = useTranslation("home");
  const router = useRouter();
  const handRegis = () => {
    router.push("/auth/register");
  };
  const itemVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const view = useRef(null);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{
        staggerChildren: 0.2,
        type: "spring",
        stiffness: 10,
      }}
      viewport={{ once: false, amount: "all", margin: "85px" }}
      className="container mt-[-60px] flex h-screen flex-col items-center justify-center gap-6 bg-white dark:bg-background"
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl font-bold text-[#7D1F1F] dark:text-primary"
      >
        {t("Title")}
      </motion.h1>
      <motion.div variants={itemVariants} className="aspect-video h-[400px]">
        <video autoPlay loop muted playsInline>
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-[#7D1F1F] dark:text-primary"
      >
        {t("DesTitle")}
      </motion.p>
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="shadow"
          size="md"
          radius="full"
          color="warning"
          className="text-white"
          onClick={handRegis}
        >
          {t("ButtonJoin")}
        </Button>
      </motion.div>
    </motion.div>
  );
};
