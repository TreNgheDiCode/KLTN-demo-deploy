"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RegisterFormValues } from "@/schemas";
import { SchoolAuth } from "@/types/school";
import { Country } from "@prisma/client";
import { IconExclamationMark } from "@tabler/icons-react";
import Image from "next/image";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { SchoolFloatingDock } from "../school-floating-dock";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  setValue: UseFormSetValue<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  schools: SchoolAuth[];
};

const countryLabelMap: Record<Country, string> = {
  [Country.CANADA]: "Canada",
  [Country.AUSTRALIA]: "Australia",
  [Country.KOREA]: "Hàn Quốc",
};

export const SchoolInput = ({ setValue, watch, errors, schools }: Props) => {
  const country = watch("country") as Country;
  const school = watch("schoolName") as string;
  const schoolItems = schools.map((school) => ({
    name: school.name,
    icon: <SchoolLogo src={school.logo} />,
  }));
  const selectedSchool = schools.find((s) => s.name === school);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig,
  );

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-lg font-semibold text-main dark:text-main-foreground md:text-xl lg:text-3xl xl:text-5xl">
        Chọn một trường học cho Quốc gia: {countryLabelMap[country]}
      </h1>
      {!school && errors.schoolName && (
        <div className="my-4 flex items-center gap-2.5 rounded-sm bg-rose-300 p-2 text-sm font-semibold text-rose-700 ring-1 ring-inset">
          <IconExclamationMark className="size-6" />
          Vui lòng chọn một trường học bên dưới để chuyển sang bước kế tiếp
        </div>
      )}
      <div className="mx-auto my-4 h-1 w-[30vw] bg-main dark:bg-main-foreground" />
      <SchoolFloatingDock items={schoolItems} setValue={setValue} />
      {school && (
        <div
          ref={ref}
          className="relative flex h-[150vh] flex-col self-auto overflow-hidden py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]"
        >
          <Header
            logo={selectedSchool?.logo}
            name={school}
            short={selectedSchool?.short}
          />
          <motion.div
            style={{
              rotateX,
              rotateZ,
              translateY,
              opacity,
            }}
            className=""
          >
            <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
              {selectedSchool &&
                selectedSchool.locations.length > 0 &&
                selectedSchool.locations
                  .slice(5)
                  .map((location, index) => (
                    <LocationItem
                      key={index}
                      translate={translateX}
                      location={location}
                    />
                  ))}
            </motion.div>
            <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
              {selectedSchool &&
                selectedSchool.locations.length > 0 &&
                selectedSchool.locations
                  .slice(-5)
                  .map((location, index) => (
                    <LocationItem
                      key={index}
                      translate={translateXReverse}
                      location={location}
                    />
                  ))}
            </motion.div>
            <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
              {selectedSchool &&
                selectedSchool.locations.length > 0 &&
                selectedSchool.locations
                  .slice(5)
                  .map((location, index) => (
                    <LocationItem
                      key={index}
                      translate={translateX}
                      location={location}
                    />
                  ))}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const SchoolLogo = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt="school logo" />
      <AvatarFallback className="size-6">
        <Image src={src} alt="school logo" fill />
      </AvatarFallback>
    </Avatar>
  );
};

const Header = ({
  logo,
  name,
  short,
}: {
  logo?: string;
  name: string;
  short?: string | null;
}) => {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-20 md:py-40">
      <Avatar className="mx-auto size-60">
        <AvatarImage src={logo} alt="school logo" />
        <AvatarFallback className="size-60">
          <Image src={"/logo_icon_light.png"} alt="school logo" fill />
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold text-main dark:text-main-foreground md:text-7xl">
        {name}
      </h1>
      {short && (
        <p className="mt-8 max-w-2xl text-base text-neutral-500 dark:text-neutral-800 md:text-xl">
          {short}
        </p>
      )}
    </div>
  );
};

export const LocationItem = ({
  location,
  translate,
}: {
  location: {
    name: string;
    cover: string;
    description: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={location.name}
      className="group/location relative h-96 w-[30rem] flex-shrink-0"
    >
      <div className="block group-hover/location:shadow-2xl">
        <Image
          src={location.cover}
          height="600"
          width="600"
          className="absolute inset-0 h-full w-full object-cover object-left-top"
          alt={location.name}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center bg-black opacity-0 group-hover/location:opacity-80">
        <p className="line-clamp-4 p-8 text-white opacity-0 group-hover/location:opacity-100">
          {location.description}
        </p>
      </div>
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/location:opacity-100">
        {location.name}
      </h2>
    </motion.div>
  );
};
