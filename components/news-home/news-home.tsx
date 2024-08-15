"use client";

import { useState } from "react";
import { News } from "@/types";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface Props {
  news: News[];
}

const NewsHome = ({ news }: Props) => {
  const { t } = useTranslation("home");
  const [showAll, setShowAll] = useState(false);
  const mainNews = news[0];
  const sideNews = news.slice(1);
  const displayedNews = showAll ? sideNews : sideNews.slice(0, 3);
  const router = useRouter();
  if (!news || news.length === 0) {
    return (
      <div className="mt-10 px-4 text-center md:px-8 lg:px-16 xl:px-24">
        <h2 className="text-2xl font-bold text-[#FF8811] md:text-3xl">
          {t("NewsAndEvent")}
        </h2>
        <p className="mt-4 text-lg text-primary dark:text-white">
          {t("NoNewsAvailable")}
        </p>
      </div>
    );
  }
  const handleClicknewsId = (newsId: string) => {
    router.push(`news/${newsId}`);
  };
  const handleNews = () => {
    router.push(`news`);
  };

  return (
    <div className="mt-10 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="mb-8 flex flex-col items-center justify-between sm:flex-row">
        <h2 className="mb-4 text-2xl font-bold text-[#FF8811] sm:mb-0 md:text-3xl">
          {t("NewsAndEvent")}
        </h2>
        <button
          className="group flex items-center text-lg font-bold text-[#7D1F1F] transition-colors duration-300 hover:text-[#FF8811] md:text-xl"
          onClick={handleNews}
        >
          {t("ViewMore")}
          <ChevronRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
          <ChevronRight className="ml-[-10px] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div
          className="lg:w-2/3"
          onClick={() => handleClicknewsId(mainNews.id)}
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg hover:cursor-pointer">
            <Image
              src={mainNews.cover}
              alt={mainNews.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h3 className="mt-4 line-clamp-2 text-xl font-bold text-primary transition-colors duration-300 hover:text-[#FF8811] dark:text-white md:text-2xl">
            {mainNews.title}
          </h3>
        </div>
        <div className="space-y-6 hover:cursor-pointer lg:w-1/3">
          {displayedNews.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-4"
              onClick={() => handleClicknewsId(item.id)}
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl shadow-md">
                <Image
                  src={item.cover}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="line-clamp-3 text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-[#FF8811] dark:text-white md:text-base">
                {item.title}
              </h4>
            </div>
          ))}
          {sideNews.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex w-full items-center justify-center rounded-lg bg-[#FF8811] px-4 py-2 font-semibold text-white shadow-md transition-colors duration-300 hover:bg-[#E67300]"
            >
              {showAll ? `${t("hide")}` : `${t("ViewMore")}`}
              <ChevronDown
                className={`ml-2 ${showAll ? "rotate-180" : ""} transition-transform duration-300`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsHome;
