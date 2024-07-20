"use client";
import React, { useRef, useState } from "react";
import Card from "./card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export const Blogs = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    const current = scrollRef.current;
    if (current) {
      const cardWidth = current.offsetWidth / 4; // Assuming 4 cards are visible at once
      const newPosition =
        direction === "left"
          ? Math.max(scrollPosition - cardWidth, 0)
          : Math.min(
              scrollPosition + cardWidth,
              current.scrollWidth - current.offsetWidth,
            );

      setScrollPosition(newPosition);
      current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  const dataCard = [
    {
      avatar: "/card/avatar1.jpg",
      background: "/card/background1.jpg",
      time: "66",
      name: "Thanh Tuyền",
      des: "Một món ăn thật là ngon miệng và dân giã, các bạn nhớ ăn món này nha!! chứ tui ăn là thấy mê lun á.",
    },
    {
      avatar: "/card/avatar2.jpg",
      background: "/card/background2.jpg",
      time: "98",
      name: "Thảo Vy",
      des: "Bánh mì việt nam ngon quá trời lun ăn 3 ổ lun nè :>.",
    },
    {
      avatar: "/card/avatar3.jpg",
      background: "/card/background3.jpg",
      time: "59",
      name: "Sinh Hương",
      des: "Nem rán ninh thuận ngon quá trời lun đó.",
    },
    {
      avatar: "/card/avatar4.jpg",
      background: "/card/background4.jpg",
      time: "32",
      name: "Tèo Con",
      des: "Ngày anh mất em là ngày trời đổ cơn mưa ToT",
    },
    {
      avatar: "/card/avatar5.jpg",
      background: "/card/background5.jpg",
      time: "22",
      name: "Jonny",
      des: "Quán trung nè ăn siêu ngon lun nha, đồ ăn vừa ngon nhân viên còn dễ thương nữa chứ hứa sẽ quay lại.",
    },
    {
      avatar: "/card/avatar6.jpg",
      background: "/card/background6.jpg",
      time: "8",
      name: "Hữu Lộc",
      des: "Thích cái vibe tối tối này nha nó chill thì thôi lun á.",
    },
    {
      avatar: "/card/avatar7.jpg",
      background: "/card/background7.jpg",
      time: "12",
      name: "Huy Khang",
      des: "Cuộc sống này nêu như chèo thuyền ngược thác không tiến ắt lùi, vì vậy nên hãy nổ lực từng ngày lên bạn nhé.",
    },
    {
      avatar: "/card/avatar8.jpg",
      background: "/card/background8.jpg",
      time: "103",
      name: "Gia Huy",
      des: "Thành phố về đêm nè cả nhà ơi, siêu đẹp lun á nha Q1 mãi đĩn !!! .",
    },
  ];

  return (
    <section className="bg-gray-100 px-6 py-20 text-black dark:bg-black dark:text-primary sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-16 text-center text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          BLOGS
        </h1>

        <div className="relative overflow-hidden">
          <button
            onClick={() => scroll("left")}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md dark:bg-gray-800"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex transition-transform duration-300 ease-in-out"
            style={{ width: "calc(100% + 1rem)" }}
          >
            {dataCard.map((item, index) => (
              <div
                key={index}
                className="w-full flex-none px-2 sm:w-1/2 lg:w-1/4"
              >
                <Card
                  name={item.name}
                  des={item.des}
                  avatar={item.avatar}
                  background={item.background}
                  time={item.time}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-[4px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md dark:bg-gray-800"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
