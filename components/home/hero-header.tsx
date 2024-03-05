"use client";

import { SchoolLib } from "@/types";
import { Button, Card, CardBody } from "@nextui-org/react";
import Autoplay from "embla-carousel-autoplay";
import Autoscroll from "embla-carousel-auto-scroll";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { cn } from "@/lib/utils";

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
      <div className="absolute bottom-6 right-14 z-50 w-4/12 text-primary">
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
            {schools.map((school, index) => (
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
                    <h1 className="absolute bottom-3 left-3 z-10 break-words text-2xl font-semibold text-white">
                      {school.name}
                    </h1>
                    <Image
                      fill
                      priority
                      quality={100}
                      alt="school_image"
                      src={school.backgroundUrl}
                      className="object-cover"
                    />
                  </CardBody>
                </Card>
              </CarouselItem>
            ))}
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
            const color = school.colorValue;
            return (
              <CarouselItem key={school.name} className="rounded-none pl-0 ">
                <Card className="h-[calc(100vh-86px)] rounded-none">
                  <CardBody className="relative flex h-full flex-col justify-center gap-8 overflow-hidden p-0">
                    <h1 className="z-10 line-clamp-2 w-1/2 pl-32 text-7xl font-bold text-white">
                      {school.name}
                    </h1>
                    <p className="z-10 line-clamp-3 w-1/2 pl-32 font-semibold text-white">
                      {school.short}
                    </p>
                    <div className="z-10 ml-32 flex items-center gap-x-6">
                      <Button
                        variant="shadow"
                        color="primary"
                        size="lg"
                        className="min-w-[200px] font-semibold text-white"
                        style={{ background: color }}
                      >
                        Explore
                      </Button>
                      <div
                        className="flex size-12 items-center justify-center rounded-full"
                        style={{ background: color }}
                      >
                        <Bookmark className="size-6 text-white" />
                      </div>
                    </div>
                    <div
                      className="absolute inset-0"
                      style={{ background: color }}
                    >
                      <Image
                        fill
                        priority
                        quality={100}
                        alt="school_image"
                        src={school.backgroundUrl}
                        className="opacity-70"
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
