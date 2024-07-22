import React from "react";
import Connectcard from "./ConnectCard";

export const Connect = () => {
  return (
    <div className="relative h-full w-full">
      <div className="mt-12 text-center">
        <h1 className="text-5xl font-bold capitalize">
          Quy trình kết nối Homestay
        </h1>
      </div>
      <div className="mx-auto grid w-full grid-cols-1 gap-x-6 gap-y-10 p-20 md:grid-cols-3">
        <Connectcard
          imageSrc="/Truong1/truong7.png"
          title="Cho o cua gia dinh"
          description="Một trong số các loại chỗ ở là lựa chọn Homestay, mà học sinh/cha mẹ
          học sinh có thể đăng ký trước khi đến Vancouver. Việc đăng ký Homestay
          có thể được thực hiện thông qua Facebook, Airbnb và trang web
          Homestay. Một số công ty cung cấp dịch vụ này bao gồm Homadorma,
          VanMates, Cypress và HomeSweet, HomeStay."
          action="Dang ki ngay"
          bgColor="bg-emerald-500 text-white font-semibold hover:bg-emerald-500/90"
          iconColor="text-emerald-500 font-semibold"
        />
        <Connectcard
          imageSrc="/Truong1/truong8.png"
          title="Cho o cua gia dinh"
          description="Một trong số các loại chỗ ở là lựa chọn Homestay, mà học sinh/cha mẹ
          học sinh có thể đăng ký trước khi đến Vancouver. Việc đăng ký Homestay
          có thể được thực hiện thông qua Facebook, Airbnb và trang web
          Homestay. Một số công ty cung cấp dịch vụ này bao gồm Homadorma,
          VanMates, Cypress và HomeSweet, HomeStay."
          action="Dang ki ngay"
          bgColor="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          iconColor="text-emerald-500 font-bold"
        />
        <Connectcard
          imageSrc="/Truong1/truong9.png"
          title="Cho o cua gia dinh"
          description="Một trong số các loại chỗ ở là lựa chọn Homestay, mà học sinh/cha mẹ
          học sinh có thể đăng ký trước khi đến Vancouver. Việc đăng ký Homestay
          có thể được thực hiện thông qua Facebook, Airbnb và trang web
          Homestay. Một số công ty cung cấp dịch vụ này bao gồm Homadorma,
          VanMates, Cypress và HomeSweet, HomeStay."
          action="Dang ki ngay"
          bgColor="bg-yellow-500 text-white hover:bg-yellow-500/90"
          iconColor="text-yellow-500 font-bold"
        />
      </div>
      <div className="absolute bottom-0 h-[40px] w-full bg-blue-950" />
      <div className="absolute bottom-0 right-0 h-[40px] w-[55%] border-b-[40px] border-l-[75px] border-b-transparent border-l-blue-950 bg-yellow-500" />
    </div>
  );
};
