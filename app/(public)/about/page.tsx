"use client";
import Information from "@/components/about/infomation";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const About = () => {
  const people = [
    {
      name: "Phan Thị Ngọc Hân",
      title: "Tổng giám đốc / Thành viên HĐQT/Đại diện pháp lý cty",
      phone: "(+84) 984122837",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Liêu Tuấn Đức",
      title: "Phó Tổng giám đốc / Thành viên hội đồng quản trị",
      phone: "(+84) 914008545",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Trương Thiện Tùng ",
      title: "Phó Tổng giám đốc / Thành viên hội đồng quản trị",
      phone: "(+84) 914008545",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Trần Chánh Huy",
      title: "Thành viên hội đồng quản trị",
      phone: "(+84) 981861057",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Lưu Tường Bách",
      title: "Thành viên hội đồng quản trị",
      phone: "(+84) 91 3770088",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Liêu Vũ Uyên Chi",
      title: "Trưởng phòng Marketing ",
      phone: "(+84) 764130709",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
    {
      name: "Lưu Tường Giai ",
      title: "Phó Chủ Tịch hội đồng quản trị",
      phone: "(+84) 91 3907517",
      email: "Services@mecltd.edu.vn",
      address: "25/20 Tái Thiết, Phường 11, Quận Tân Bình, TP Hồ Chí Minh ",
    },
  ];
  const { t } = useTranslation("aboutUs");
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex justify-center sm:justify-start">
          <Image
            width={120}
            height={120}
            src={"/logo.png"}
            alt="logo"
            className="h-24 w-24 sm:h-32 sm:w-32"
          />
        </div>
        <h1 className="mt-8 text-center text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
          {t("title")}
        </h1>
        <div className="mt-10 space-y-2 text-lg font-bold text-primary sm:text-xl md:text-2xl">
          <div>{t("desTitle")}</div>
          <div>{t("taxCode")}: 0317892172</div>
          <div>{t("address")}</div>
          <div>{t("phone")}: 0984122837</div>
          <div>Email: Services@mecltd.edu.vn</div>
          <div>Facebook : https://www.facebook.com/mecltd.edu/</div>
        </div>
        <p className="mt-8 text-base font-medium leading-7 text-primary sm:text-lg">
          {t("content")}
        </p>
        <h2 className="mt-10 text-xl font-bold text-primary">
          {t("Listmember")}
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {people.map((p, index) => (
          <div key={index}>
            <Information
              name={p.name}
              title={p.title}
              phone={p.phone}
              email={p.email}
              address={p.address}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
