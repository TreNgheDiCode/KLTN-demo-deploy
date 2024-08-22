"use client";

import { SchoolData, SchoolLib } from "@/types";
import { Button, Card, CardBody } from "@nextui-org/react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { cn } from "@/lib/utils";

interface HeroHeaderProps {
  schools?: SchoolLib | null;
}

export const HeroHeader = ({ schools }: HeroHeaderProps) => {
  const { t } = useTranslation("home");

  const router = useRouter();
  const handShowSchool = (id: string) => {
    router.push(`schools/${id}`);
  };
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  const onClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api],
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, current]);
  if (!schools || !Array.isArray(schools) || schools.length === 0) {
    return <div>Không có trường học</div>;
  }

  const item = {
    offScreen: {
      x: "-100vw",
      opacity: 0,
    },
    onScreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 10,
      },
    },
  };

  const main = {
    offScreen: {
      y: "-100vh",
      opacity: 0,
    },
    onScreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative">
      <motion.div
        initial="offScreen"
        whileInView="onScreen"
        transition={{
          staggerChildren: 0.2,
          type: "spring",
          stiffness: 60,
          damping: 10,
        }}
        viewport={{ once: false }}
        className="absolute bottom-6 right-14 z-10 w-full overflow-x-hidden text-primary md:w-6/12"
      >
        <Carousel
          className="w-full text-primary"
          opts={{ align: "center", loop: true }}
          setApi={setApi}
        >
          {/* <CarouselContent className="h-full w-full rounded-lg ease-in-out">
            {schools.map((school, index) => {
              const colors = school.color.split("rgba(");
              const color1 = colors[1].replace(/,\s+/g, "").split(")");
              const color2 = colors[2].replace(/,\s+/g, "").split(")");
              const rotatedColor = `linear-gradient(0deg, rgba(${color1[0]})${color1[1]}, rgba(${color2[0]})${color2[1]})`;

              return (
                <CarouselItem
                  onClick={() => onClick(index)}
                  key={school.name}
                  className={cn(
                    "basis-1/3 pl-4 opacity-50 transition-opacity duration-300",
                    index === current && "opacity-100",
                  )}
                >
                  <motion.div
                    variants={item}
                    viewport={{ once: false, amount: 0.2 }}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.98 }}
                    className="transition-transform duration-500 ease-in-out"
                  >
                    <Card className="h-[calc(50vh-86px)] rounded-lg shadow-2xl">
                      <CardBody className="relative overflow-hidden">
                        <motion.h1
                          variants={item}
                          className="absolute bottom-3 left-3 z-10 text-3xl font-semibold uppercase text-white"
                        >
                          {school.name}
                        </motion.h1>
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          style={{ background: rotatedColor }}
                          initial={{ opacity: 0.4 }}
                          animate={{ opacity: 0.2 }}
                          transition={{ duration: 1.5 }}
                        />
                        <motion.div
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 1,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 z-0"
                        >
                          <Image
                            fill
                            quality={100}
                            alt="school_image"
                            src={school.background}
                            className="rounded-lg object-cover"
                          />
                        </motion.div>
                      </CardBody>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent> */}
        </Carousel>
      </motion.div>

      <Carousel
        className="w-full text-primary"
        opts={{ align: "center", loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 h-full w-full">
          {schools.map((school) => {
            const color = school.color;
            return (
              <CarouselItem key={school.name} className="rounded-none pl-0">
                <Card className="h-screen rounded-none">
                  <CardBody className="p-0">
                    <motion.div
                      initial="offScreen"
                      whileInView="onScreen"
                      viewport={{ once: false }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 10,
                        staggerChildren: 0.2,
                      }}
                      className="relative z-10 flex h-full flex-col justify-center gap-8 px-4 md:px-32"
                    >
                      <motion.h1
                        variants={main}
                        className="z-10 w-full text-5xl font-bold uppercase text-white md:w-6/12 md:text-7xl"
                      >
                        {school.name}
                      </motion.h1>
                      <motion.p
                        variants={main}
                        className="z-10 w-full font-semibold text-white md:w-5/12"
                      >
                        {school.short}
                      </motion.p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variants={main}
                        className="z-10 flex items-center gap-x-6"
                      >
                        <Button
                          variant="shadow"
                          color="primary"
                          size="md"
                          onClick={() => handShowSchool(school.id)}
                          className="min-w-[230px] bg-white font-semibold text-[#7D1F1F] dark:bg-background dark:text-primary"
                        >
                          {t("ButtonView")}
                        </Button>
                      </motion.div>
                    </motion.div>

                    <div className="absolute inset-0">
                      <Image
                        fill
                        priority
                        quality={100}
                        alt="school_image"
                        src={school.background}
                        className="rounded-lg object-cover opacity-90"
                      />
                      <div
                        className="absolute inset-0 rounded-lg opacity-30"
                        style={{ background: color }}
                      />
                    </div>
                  </CardBody>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
