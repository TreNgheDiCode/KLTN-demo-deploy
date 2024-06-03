"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Link color="foreground" href={href} className="mt-2 hover:underline">
      {label}
    </Link>
  );
};
