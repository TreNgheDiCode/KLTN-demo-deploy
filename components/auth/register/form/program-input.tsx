"use client";

import { RegisterFormValues } from "@/schemas";
import { SchoolAuth } from "@/types/school";
import { IconExclamationMark } from "@tabler/icons-react";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useEffect, useId, useRef, useState } from "react";

type Programs = SchoolAuth["programs"];

type Props = {
  programs?: Programs;
  setValue: UseFormSetValue<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

export const ProgramInput = ({ programs, setValue, watch, errors }: Props) => {
  const program = watch("programName") as string;

  if (!programs || !programs.length) {
    return (
      <div className="container mx-auto mt-10">
        <h1 className="text-center text-lg font-semibold text-main dark:text-main-foreground md:text-xl lg:text-3xl xl:text-5xl">
          Trường học này chưa có chương trình đào tạo nào
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-lg font-semibold text-main dark:text-main-foreground md:text-xl lg:text-3xl xl:text-5xl">
        Chọn chương trình đào tạo
      </h1>
      {!program && errors.programName && (
        <div className="my-4 flex items-center gap-2.5 rounded-sm bg-rose-300 p-2 text-sm font-semibold text-rose-700 ring-1 ring-inset">
          <IconExclamationMark className="size-6" />
          Vui lòng chọn chương trình đào tạo bên dưới để chuyển sang bước kế
          tiếp
        </div>
      )}
      <div className="mx-auto my-4 h-1 w-[30vw] bg-main dark:bg-main-foreground" />
      <ExpandableProgramCards programs={programs} setValue={setValue} />
    </div>
  );
};

const ExpandableProgramCards = ({
  programs,
  setValue,
}: {
  programs: Programs;
  setValue: UseFormSetValue<RegisterFormValues>;
}) => {
  const programItems = programs.map((program) => ({
    name: program.name,
    src: program.cover,
    ctaText: "Xem chi tiết",
    content: () => {
      return (
        <div>
          <div className="flex items-center justify-center">
            {program.images &&
              program.images.length > 0 &&
              program.images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <Image
                    src={image.url}
                    alt="bali images"
                    width="500"
                    height="500"
                    quality={100}
                    priority
                    className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
                  />
                </motion.div>
              ))}
          </div>
          <p>{program.description}</p>
        </div>
      );
    },
  }));

  const [active, setActive] = useState<
    (typeof programItems)[number] | boolean | null
  >(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.div
              layoutId={`program-${active.name}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <Image
                  priority
                  quality={100}
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.name}
                  className="h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div>
                <div className="flex items-start justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`name-${active.name}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.name}
                    </motion.h3>
                  </div>
                  <motion.button
                    onClick={() => {
                      setActive(null);
                      setValue("programName", active.name);
                    }}
                    layoutId={`button-${active.name}-${id}`}
                    className="rounded-full bg-main px-4 py-3 text-sm font-bold text-white dark:bg-main-component"
                  >
                    Chọn chương trình đào tạo
                  </motion.button>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] dark:text-neutral-400 md:h-fit md:text-sm lg:text-base"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto w-full max-w-2xl gap-4">
        {programItems.map((program) => (
          <motion.div
            layoutId={`program-${program.name}-${id}`}
            key={`program-${program.name}-${id}`}
            onClick={() => setActive(program)}
            className="flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 md:flex-row"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <motion.div layoutId={`image-${program.name}-${id}`}>
                <Image
                  priority
                  quality={100}
                  width={100}
                  height={100}
                  src={program.src}
                  alt={program.name}
                  className="h-40 w-40 rounded-lg object-cover object-top md:h-14 md:w-14"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`name-${program.name}-${id}`}
                  className="text-center font-medium text-neutral-800 dark:text-neutral-200 md:text-left"
                >
                  {program.name}
                </motion.h3>
              </div>
            </div>
            <motion.button
              layoutId={`button-${program.name}-${id}`}
              className="mt-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-black hover:bg-main hover:text-white dark:bg-main-component md:mt-0"
            >
              {program.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
};
