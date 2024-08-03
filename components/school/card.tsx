"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  des: string;
  avatar: string;
  background: string;
  time: string;
}

export const Card = ({ name, des, avatar, background, time }: Props) => {
  const { t } = useTranslation("school");
  return (
    <div className="group/card w-full max-w-xs">
      <div
        className={cn(
          "card relative mx-auto flex h-96 max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded-md p-4 shadow-xl",
          "bg-cover bg-center", // Thêm bg-center để đảm bảo hình nền được căn giữa
        )}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 transition duration-300 group-hover/card:opacity-75"></div>
        <div className="relative z-10 flex flex-row items-center space-x-4">
          <Image
            height={40}
            width={40}
            alt={`Avatar of ${name}`}
            src={avatar}
            className="h-10 w-10 rounded-full border-2 border-white object-cover"
          />
          <div className="flex flex-col">
            <p className="text-base font-semibold text-white">{name}</p>
            <p className="text-sm text-gray-300">
              {time} {t("time")}
            </p>
          </div>
        </div>
        <div className="text-content relative z-10">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            {t("Content")}
          </h2>
          <p className="mt-2 text-sm text-gray-200">{des}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
