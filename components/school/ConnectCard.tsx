import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { ChevronRight } from "lucide-react";

interface ConnectcardProps {
  imageSrc: string;
  title: string;
  description: string;
  action: string;
  bgColor: string;
  iconColor: string;
}

const Connectcard = ({
  imageSrc,
  title,
  description,
  action,
  bgColor,
  iconColor,
}: ConnectcardProps) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center rounded-b-3xl border shadow-lg">
      <div className="relative h-[279px] w-full">
        <Image alt="/" src={imageSrc} fill className="absolute object-cover" />
      </div>

      <div>
        <h2 className="text-2xl font-bold capitalize">{title}</h2>
      </div>
      <h3 className="w-full px-3 pb-12">{description}</h3>
      <button
        className={cn(
          "absolute -bottom-5 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          bgColor,
        )}
      >
        <div className="flex items-center justify-between gap-x-2">
          {action}
          <div className="m-4 mr-auto flex items-center justify-center rounded-md bg-white">
            <ChevronRight className={cn("mx-2 my-1 h-4 w-4", iconColor)} />
          </div>
        </div>
      </button>
    </div>
  );
};

export default Connectcard;
