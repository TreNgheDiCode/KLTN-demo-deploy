// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const viewportsScrolled = Math.round(window.scrollY / window.innerHeight);

      if (e.deltaY > 0) {
        // Scroll down
        window.scrollTo({
          top: (viewportsScrolled + 1) * window.innerHeight,
          behavior: "smooth",
        });
      } else {
        // Scroll up
        window.scrollTo({
          top: (viewportsScrolled - 1) * window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  });

  return (
    <NextUIProvider className="h-full w-full" navigate={router.push}>
      {children}
    </NextUIProvider>
  );
}
