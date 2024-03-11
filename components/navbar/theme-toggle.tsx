"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme === "light" ? (
        <Sun
          className="size-6 text-[#7D1F1F]"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <Moon className="size-6" onClick={() => setTheme("light")} />
      )}
    </>
  );
}
