/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { RegisterFormValues } from "@/schemas";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export const SchoolFloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  setValue,
}: {
  items: { name: string; icon: React.ReactNode }[];
  desktopClassName?: string;
  mobileClassName?: string;
  setValue: UseFormSetValue<RegisterFormValues>;
}) => {
  return (
    <>
      <SchoolFloatingDockDesktop
        items={items}
        className={desktopClassName}
        setValue={setValue}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        setValue={setValue}
      />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  setValue,
}: {
  items: { name: string; icon: React.ReactNode }[];
  className?: string;
  setValue: UseFormSetValue<RegisterFormValues>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <div
                  onClick={() => {
                    setValue("schoolName", item.name);
                    setValue("programName", "");
                  }}
                  key={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const SchoolFloatingDockDesktop = ({
  items,
  className,
  setValue,
}: {
  items: { name: string; icon: React.ReactNode }[];
  className?: string;
  setValue: UseFormSetValue<RegisterFormValues>;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end justify-center gap-4 rounded-2xl bg-gray-50 px-4 pb-3 dark:bg-neutral-900 md:flex",
        className,
      )}
    >
      {(!items || items.length === 0) && (
        <div className="text-neutral-500 dark:text-neutral-400">
          Quốc gia này không có trường học
        </div>
      )}
      {items.map((item) => (
        <SchoolIconContainer
          mouseX={mouseX}
          key={item.name}
          {...item}
          setValue={setValue}
        />
      ))}
    </motion.div>
  );
};

function SchoolIconContainer({
  mouseX,
  name,
  icon,
  setValue,
}: {
  mouseX: MotionValue;
  name: string;
  icon: React.ReactNode;
  setValue: UseFormSetValue<RegisterFormValues>;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={() => {
        setValue("schoolName", name);
        setValue("programName", "");
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-full bg-white shadow-md dark:bg-main-component"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-white px-2 py-0.5 text-xs text-neutral-700 shadow-md dark:border-neutral-900 dark:bg-main-component dark:text-white"
          >
            {name}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
