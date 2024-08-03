"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const logos = [
  { src: "/logotruong/CICC_Logo.png", alt: "logo trường UCW" },
  { src: "/logotruong/hanyang.jpg", alt: "logo trường UCW" },
  { src: "/logotruong/MCC.png", alt: "logo trường UCW" },
  { src: "/logotruong/Sejong_University.png", alt: "logo trường UCW" },
  {
    src: "/logotruong/Sprott_Shaw_College_Newest_Logo_as_of_Jan_2013.png",
    alt: "logo trường UCW",
  },
  {
    src: "/logotruong/TOORAKCOLLEGE.png",
    alt: "logo trường UCW",
  },
  {
    src: "/logotruong/ucw2.png",
    alt: "logo trường UCW",
  },
  {
    src: "/logotruong/ufv.png",
    alt: "logo trường UCW",
  },
  {
    src: "/logotruong/wesley_college.jpg",
    alt: "logo trường UCW",
  },
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
                fill // Thay thế layout="fill"
                style={{ objectFit: "contain" }} // Thay thế objectFit="contain"
                sizes="100vw" // Thêm thuộc tính sizes để xác định kích thước hình ảnh
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoViewLogo;
