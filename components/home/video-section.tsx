"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRef } from "react";

export const VideoSection = () => {
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
      className="container flex h-screen flex-col items-center justify-center gap-6 bg-white dark:bg-background"
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl font-bold text-[#7D1F1F] dark:text-primary"
      >
        CONTINUE YOUR DREAM
      </motion.h1>
      <motion.div variants={itemVariants} className="aspect-video">
        <video src=""></video>
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-[#7D1F1F] dark:text-primary"
      >
        Enter an experience of relational learning and discover all that Christ
        has for your life. Online or on campus, there’s an atmosphere that
        inspires your intellect and strives to ensure your success.
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
        >
          Get to know us
        </Button>
      </motion.div>
    </motion.div>
  );
};
