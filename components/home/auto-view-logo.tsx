"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const logos = [
  { src: "/UCW.png", alt: "logo trường UCW" },
  { src: "/Cor.png", alt: "logo trường UCW" },
  { src: "/cornerstone.png", alt: "logo trường UCW" },
  { src: "/MTR.png", alt: "logo trường UCW" },
  { src: "/Sport.png", alt: "logo trường UCW" },
  { src: "/UFV.png", alt: "logo trường UCW" },
];

const AutoViewLogo = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000); // Chuyển đổi mỗi 3 giây

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="mt-[-20px] w-full overflow-hidden">
      <div
        className="flex items-center transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${startIndex * 20}%)` }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex w-[20%] flex-shrink-0 items-center justify-center px-2"
            style={{ height: "100px" }}
          >
            <div className="relative h-full w-full">
              <Image
                alt={logo.alt}
                src={logo.src}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoViewLogo;
