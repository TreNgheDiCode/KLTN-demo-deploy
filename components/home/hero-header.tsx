"use client";

import { cn } from "@/lib/utils";
import { SchoolLib } from "@/types";
import { Button, Card, CardBody } from "@nextui-org/react";
import Autoscroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
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

  return (
    <div className="relative">
      <div className="absolute bottom-6 right-14 z-10 w-4/12 text-primary">
        <Carousel
          className="w-full text-primary"
          opts={{ align: "center", loop: true }}
          plugins={[
            Autoscroll({
              speed: 1,
              stopOnInteraction: false,
              startDelay: 100,
            }),
          ]}
          setApi={setApi}
        >
          <CarouselContent className="] h-full w-full rounded-lg ease-in-out ">
            {schools.map((school, index) => {
              const colors = school.color.split("rgba("); // Split to isolate color definitions
              const color1 = colors[1].replace(/,\s+/g, "").split(")"); // Remove spaces and store first color
              const color2 = colors[2].replace(/,\s+/g, "").split(")"); // Remove spaces and store second color
              const rotatedColor = `linear-gradient(0deg, rgba(${color1[0]})${color1[1]}, rgba(${color2[0]})${color2[1]})`;

              console.log(rotatedColor);
              return (
                <CarouselItem
                  onClick={() => onClick(index)}
                  key={school.name}
                  className={cn(
                    "basis-1/2 pl-4 opacity-40 ",
                    index === current && "opacity-100",
                  )}
                >
                  <Card className="h-[calc(50vh-86px)]" shadow="lg">
                    <CardBody className="relative">
                      <h1 className="absolute bottom-3 left-3 z-10 break-words text-2xl font-semibold uppercase text-white">
                        {school.name}
                      </h1>
                      <Image
                        fill
                        priority
                        quality={100}
                        alt="school_image"
                        src={school.background}
                        className="object-cover"
                      />
                      <div
                        style={{ background: rotatedColor }}
                        className="absolute inset-0"
                      />
                    </CardBody>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
      <Carousel
        className=" w-full text-primary"
        opts={{ align: "center", loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent className="ml-0 h-full w-full ">
          {schools.map((school) => {
            const color = school.color;
            return (
              <CarouselItem key={school.name} className="rounded-none pl-0 ">
                <Card className="h-[calc(100vh-86px)] rounded-none">
                  <CardBody className="relative flex h-full flex-col justify-center gap-8 overflow-hidden p-0">
                    <h1 className="z-10 line-clamp-3 w-1/2 pl-32 text-7xl font-bold uppercase text-white">
                      {school.name}
                    </h1>
                    <p className="z-10 line-clamp-3 w-1/2 pl-32 font-semibold text-white">
                      {school.short}
                    </p>
                    <div className="z-10 ml-32 flex items-center gap-x-6">
                      <Button
                        variant="shadow"
                        color="primary"
                        size="md"
                        className="min-w-[230px] bg-white font-semibold text-[#7D1F1F] dark:bg-background dark:text-primary"
                      >
                        Explore
                      </Button>
                    </div>
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
                        className="absolute inset-0"
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
