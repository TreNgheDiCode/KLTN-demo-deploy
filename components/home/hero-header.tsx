"use client";

import { cn } from "@/lib/utils";
import { SchoolLib } from "@/types";
import { Button, Card, CardBody } from "@nextui-org/react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

interface HeroHeaderProps {
  schools: SchoolLib[];
}

export const HeroHeader = ({ schools }: HeroHeaderProps) => {
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
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", (e) => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, current]);

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
        stiffness: 20,
      },
    },
  };

  const title = {
    offScreen: {
      x: "-100vw",
      opacity: 0,
    },
    onScreen: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 20,
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
        stiffness: 20,
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
          staggerDirection: -1,
        }}
        viewport={{ once: false }}
        className="absolute bottom-6 right-14 z-10 w-6/12 overflow-x-hidden text-primary"
      >
        <Carousel
          className="w-full text-primary"
          opts={{ align: "center", loop: true }}
          setApi={setApi}
        >
          <CarouselContent className="] h-full w-full rounded-lg ease-in-out">
            {schools.map((school, index) => {
              const colors = school.color.split("rgba("); // Split to isolate color definitions
              const color1 = colors[1].replace(/,\s+/g, "").split(")"); // Remove spaces and store first color
              const color2 = colors[2].replace(/,\s+/g, "").split(")"); // Remove spaces and store second color
              const rotatedColor = `linear-gradient(0deg, rgba(${color1[0]})${color1[1]}, rgba(${color2[0]})${color2[1]})`;

              return (
                <CarouselItem
                  onClick={() => onClick(index)}
                  key={school.name}
                  className={cn(
                    "basis-1/3 pl-4 opacity-40",
                    index === current && "opacity-100",
                  )}
                >
                  <motion.div variants={item} viewport={{ once: false }}>
                    <Card className="h-[calc(50vh-86px)]" shadow="lg">
                      <CardBody className="relative">
                        <motion.h1
                          variants={title}
                          className="absolute bottom-3 left-3 z-10 break-words text-2xl font-semibold uppercase text-white"
                        >
                          {school.name}
                        </motion.h1>
                        <Image
                          fill
                          quality={100}
                          alt="school_image"
                          src={school.background}
                          className="object-cover"
                        />
                        <div
                          style={{ background: rotatedColor }}
                          className="absolute inset-0 opacity-20"
                        />
                      </CardBody>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
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
                        staggerChildren: 0.1,
                        staggerDirection: -1,
                      }}
                      className="relative z-10 !flex h-full flex-col justify-center gap-8"
                    >
                      <motion.h1
                        variants={main}
                        className="z-10 line-clamp-3 w-6/12 break-words pl-32 text-6xl font-bold uppercase text-white"
                      >
                        {school.name}
                      </motion.h1>
                      <motion.p
                        variants={main}
                        className="z-10 line-clamp-5 w-5/12 pl-32 font-semibold text-white"
                      >
                        {school.short}
                      </motion.p>
                      <motion.div
                        whileHover={{ scaleY: 1.1 }}
                        whileTap={{ scaleY: 0.95 }}
                        variants={main}
                        className="z-10 ml-32 flex items-center gap-x-6"
                      >
                        <Button
                          variant="shadow"
                          color="primary"
                          size="md"
                          className="min-w-[230px] bg-white font-semibold text-[#7D1F1F] dark:bg-background dark:text-primary"
                        >
                          Explore
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
                        className="opacity-100"
                      />
                      <div
                        className="absolute inset-0 opacity-20"
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
