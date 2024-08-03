"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import ReactCountryFlag from "react-country-flag";

interface LanguageToggleProps {
  className?: string;
}

const locales = ["/en", "/vi"];

export function LanguageToggle({ className }: LanguageToggleProps) {
  const pathname = usePathname();

  const redirectPathname = (path: string) => {
    let cutPath;
    if (path.startsWith(locales[0])) {
      cutPath = path.slice(locales[0].length);
      return `${locales[1]}${cutPath}`;
    } else {
      cutPath = path.slice(locales[1].length);
      return `${locales[0]}${cutPath}`;
    }
  };

  const isEnglish = pathname.startsWith(locales[0]);
  const isVietnamese = pathname.startsWith(locales[1]);

  const newPathname = redirectPathname(pathname);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button
          variant="outline"
          size="icon"
          className="z-[101] block rounded-[10px]"
        >
          <ReactCountryFlag
            className="emojiFlag text-2xl"
            countryCode={isEnglish ? "US" : "VN"}
            svg
            alt="lang"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={newPathname}
            color={isEnglish ? "success" : "foreground"}
            underline="hover"
          >
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={newPathname}
            color={isVietnamese ? "success" : "foreground"}
            underline="hover"
          >
            Việt Nam
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
