"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { ChevronRight, CircleDollarSign, MapPinIcon } from "lucide-react";
import { Modal, ModalBody, ModalContent, ModalFooter } from "../modals/Model";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const HomeStay = () => {
  const { t } = useTranslation("school");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [
    "/homestay/homestay1.png",
    "/homestay/homestay2.png",
    "/homestay/homestay3.png",
  ];

  const homestayDetails = [
    {
      img: "/homestay/homestay1.png",
      title: "Home stay Quỳnh Phương",
      description:
        "Một trong số các loại chỗ ở là lựa chọn Homestay, mà học sinh/cha mẹ học sinh có thể đăng ký trước khi đến Vancouver. Việc đăng ký Homestay có thể được thực hiện thông qua Facebook, Airbnb và trang web Homestay.",
    },
    {
      img: "/homestay/homestay2.png",
      title: "Home stay Phạm Văn Đồng",
      description:
        "Một lựa chọn tuyệt vời khác là Homestay Phạm Văn Đồng, nơi cung cấp dịch vụ tuyệt vời và giá cả hợp lý. Bạn có thể đăng ký thông qua các nền tảng phổ biến và tận hưởng một kỳ nghỉ thú vị tại Vancouver.",
    },
    {
      img: "/homestay/homestay3.png",
      title: "Home stay Hồ Chí Minh",
      description:
        "Homestay Hồ Chí Minh mang đến sự thoải mái và tiện nghi, là lựa chọn hoàn hảo cho những ai muốn có một kỳ nghỉ thoải mái. Đăng ký ngay để không bỏ lỡ cơ hội trải nghiệm tuyệt vời này.",
    },
  ];
  const VacationIcon = ({ className }: { className?: string }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
        <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
        <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
        <path d="M15 9l-3 5.196" />
        <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
      </svg>
    );
  };

  const FoodIcon = ({ className }: { className?: string }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
      </svg>
    );
  };

  const MicIcon = ({ className }: { className?: string }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
        <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
      </svg>
    );
  };

  const ParachuteIcon = ({ className }: { className?: string }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M22 12a10 10 0 1 0 -20 0" />
        <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
        <path d="M2 12l10 10l-3.5 -10" />
        <path d="M15.5 12l-3.5 10l10 -10" />
      </svg>
    );
  };
  return (
    <>
      <div className="relative flex flex-col items-center bg-gray-100 py-16 shadow-inner dark:bg-black">
        <h1 className="mb-16 text-center text-4xl font-extrabold text-black dark:text-primary sm:text-5xl lg:text-6xl">
          {t("TitleHomeStay")}
        </h1>
        <div className="z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-12 md:grid-cols-3">
          {homestayDetails.map((detail, index) => (
            <div
              key={index}
              className="relative flex w-full max-w-[400px] flex-col items-center"
            >
              <div className="w-full">
                <Image
                  alt={detail.title}
                  src={detail.img}
                  width={400}
                  height={340}
                  className="z-10 rounded-t-lg border-l-2 border-r-2 border-t-2 border-[#cccccc]"
                />
              </div>
              <div className="relative z-20 w-full rounded-b-lg border-2 border-[#cccccc] bg-white p-8 text-center text-black shadow-lg dark:border-white dark:bg-black dark:text-white">
                <h3 className="mb-4 text-xl font-bold">{detail.title}</h3>
                <p className="mb-8 mt-0 line-clamp-4 text-base">
                  {detail.description}
                </p>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform">
                  <Button
                    variant="contained"
                    color="primary"
                    className="bg-gradient-to-r from-[#3e6648] to-[#46c266] px-6 py-2 shadow-md shadow-black hover:shadow-none dark:shadow-[#cccccc]"
                    endIcon={<ChevronRight />}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span className="text-base font-bold">{t("Contact")}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="flex items-center justify-center py-40">
          <Modal>
            <ModalContent>
              <ModalBody
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                <ModalContent>
                  <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl">
                    {t("Book VinHome homestay now")}!! 🏠
                  </h4>
                  {/* images */}
                  <div className="flex items-center justify-center">
                    {images.map((image, idx) => (
                      <motion.div
                        key={"images" + idx}
                        style={{
                          rotate: Math.random() * 20 - 10,
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 0,
                          zIndex: 100,
                        }}
                        whileTap={{
                          scale: 1.1,
                          rotate: 0,
                          zIndex: 100,
                        }}
                        className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1 dark:border-neutral-700 dark:bg-neutral-800"
                      >
                        <Image
                          src={image}
                          alt="bali images"
                          width="500"
                          height="500"
                          className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
                        />
                      </motion.div>
                    ))}
                  </div>
                  {/* content */}
                  <div className="mx-auto flex max-w-sm flex-wrap items-start justify-start gap-x-4 gap-y-6 py-10">
                    <div className="flex items-center justify-center">
                      <MapPinIcon className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        phường 3 quận 1 thành phố Hồ chí minh
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <CircleDollarSign className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        120.000.000 VND
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <VacationIcon className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        2 hồ bơi
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <FoodIcon className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Nhiều đồ ăn ngon
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <MicIcon className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Karaoke
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <ParachuteIcon className="mr-1 h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300">
                        Nhảy dù
                      </span>
                    </div>
                  </div>
                </ModalContent>
                <ModalFooter className="gap-4">
                  <a href="https://justfly.vn/rooms/hanoi/d-hill-scent-house-soc-son">
                    <button className="w-28 rounded-md border-1 border-[#cccccc] bg-white px-2 py-1 text-sm text-black shadow-sm shadow-black hover:shadow-none dark:bg-black dark:text-white">
                      Đặt chỗ ngay
                    </button>
                  </a>
                </ModalFooter>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </>
  );
};
