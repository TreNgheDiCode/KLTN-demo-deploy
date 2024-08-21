"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEdgeStore } from "@/hooks/use-edgestore";
import { RegisterFormValues } from "@/schemas";
import { SchoolAuth } from "@/types/school";
import { Country, Gender } from "@prisma/client";
import { IconCamera } from "@tabler/icons-react";
import { format, set } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  data: RegisterFormValues;
  school: SchoolAuth;
  setValue: UseFormSetValue<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
};

const countryCodeMap: Record<Country, string> = {
  [Country.CANADA]: "CA",
  [Country.AUSTRALIA]: "AU",
  [Country.KOREA]: "KR",
};

export const PreviewRegister = ({ data, school, setValue, watch }: Props) => {
  const [disabled, setDisabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  const image = watch("image") as string;

  const onChange = async (file: File) => {
    if (disabled) return;
    setDisabled(true);
    setUploading(true);
    try {
      await edgestore.publicFiles
        .upload({
          file,
        })
        .then((res) => {
          if (res.url) {
            setValue("image", res.url);
          }
          if (!res.url) {
            toast.error("Có lỗi xảy ra khi tải ảnh lên");
          }
        })
        .finally(() => {
          setDisabled(false);
          setUploading(false);
        });
    } catch (error) {
      console.log(error);

      toast.error("Lỗi khi tải ảnh lên, vui lòng thử lại sau");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    disabled,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        void onChange?.(file);
      }
    },
  });
  return (
    <div className="container mx-auto mt-10">
      <h1 className="my-2 text-center text-lg font-semibold text-main dark:text-main-foreground md:text-xl lg:text-3xl xl:text-5xl">
        Hồ sơ tư vấn du học
      </h1>
      <div className="mx-auto my-4 h-1 w-[30vw] bg-main dark:bg-main-foreground" />
      <div className="border shadow-sm">
        <div id="printableArea" className="grid grid-cols-1 font-sans">
          <div className="flex flex-col">
            {/* SCHOOL HEADER */}
            <div className="relative h-72">
              <Image
                src={school.background}
                alt="logo"
                className="object-cover object-center blur-md"
                fill
                quality={100}
                priority
              />
              <div className="absolute inset-0 left-1/2 top-full flex -translate-x-1/2 -translate-y-14 flex-col items-center gap-2">
                <Avatar className="size-28">
                  <AvatarImage
                    src={school.logo}
                    alt="school logo"
                    className="size-28"
                  />
                </Avatar>
                <h1 className="text-base font-bold text-main dark:text-main-foreground md:text-lg lg:text-xl xl:text-2xl">
                  {school.name}
                </h1>
              </div>
            </div>
            <div className="mt-28 h-1 w-full bg-main dark:bg-main-foreground" />
            <div className="my-4 px-6">
              <h2 className="text-sm font-semibold text-main dark:text-main-foreground md:text-lg lg:text-2xl">
                1. Thông tin du học sinh
              </h2>
              <ul className="my-2 grid list-inside list-disc grid-cols-[1fr,300px] gap-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                    Họ và tên: {data.name}
                  </li>
                  <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                    Ngày sinh:{" "}
                    {format(new Date(data.dob), "dd/MM/yyyy", { locale: vi })}
                  </li>
                  <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                    Giới tính: {data.gender === Gender.MALE ? "Nam" : "Nữ"}
                  </li>
                  <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                    CCCD/CMND: {data.idCardNumber}
                  </li>
                  <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                    Email: {data.email}
                  </li>
                  <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                    Điện thoại: {data.phoneNumber}
                  </li>
                  <li className="col-span-1 text-sm text-main dark:text-main-foreground md:col-span-2 md:text-base lg:text-lg">
                    Địa chỉ:{" "}
                    {data.addressLine +
                      ", " +
                      data.ward +
                      ", " +
                      data.district +
                      ", " +
                      data.city}
                  </li>
                </div>
                <div className="relative flex flex-col items-center justify-center">
                  <Avatar className="size-24">
                    {image && (
                      <AvatarImage
                        src={image}
                        alt="avatar"
                        className="size-24"
                      />
                    )}
                    <AvatarFallback className="size-24">
                      <Image
                        src={"/logo_icon_light.png"}
                        alt="avatar"
                        className="size-24"
                        quality={100}
                        priority
                        fill
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    {...getRootProps({})}
                    className="absolute bottom-0 -translate-y-8 cursor-pointer rounded-full bg-gray-400 text-black dark:bg-gray-800 dark:text-white"
                  >
                    <input {...getInputProps()} />
                    <IconCamera className="size-6" />
                  </div>
                  <span className="mt-6 flex items-center gap-2.5 text-sm font-medium text-main dark:text-main-foreground">
                    ẢNH ĐẠI DIỆN
                    {uploading && (
                      <span className="ml-2 animate-pulse text-xs">
                        Đang tải...
                      </span>
                    )}
                  </span>
                </div>
              </ul>
            </div>
            <div className="my-2 h-1 w-full bg-main dark:bg-main-foreground" />
            <div className="my-4 px-6">
              <h2 className="text-sm font-semibold text-main dark:text-main-foreground md:text-lg lg:text-2xl">
                2. Thông tin du học
              </h2>
              <ul className="my-2 grid list-inside list-disc grid-cols-3 gap-y-2">
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  <span className="inline-flex items-center gap-2.5">
                    Quốc gia: {school.country}
                    <ReactCountryFlag
                      countryCode={countryCodeMap[school.country as Country]}
                      className="text-xl"
                      svg
                    />
                  </span>
                </li>
                <li className="col-span-1 text-sm text-main dark:text-main-foreground md:col-span-2 md:text-base lg:text-lg">
                  Trường: {school.name}
                </li>
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Chương trình đào tạo: {data.programName}
                </li>
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Trình độ: {data.degreeType}
                </li>
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Chứng chỉ ngoại ngữ: {data.certificateType}
                </li>
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Điểm trung bình tích lũy: {data.gradeScore} ({data.gradeType})
                </li>
              </ul>
            </div>
            <div className="my-2 h-1 w-full bg-main dark:bg-main-foreground" />
            <div className="my-4 px-6">
              <h2 className="text-sm font-semibold text-main dark:text-main-foreground md:text-lg lg:text-2xl">
                3. Phụ lục hồ sơ
              </h2>
              <ol className="my-2 list-inside list-decimal space-y-2">
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Hồ sơ được lập bởi <strong>{data.name}</strong> vào{" "}
                  <strong>{format(new Date(), "PPP", { locale: vi })}</strong>,
                  lúc <strong>{format(new Date(), "p", { locale: vi })}</strong>
                </li>
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Cam kết thông tin trên là đúng sự thật và chịu trách nhiệm về
                  sự sai lệch thông tin nếu có xảy ra trong quá trình xét duyệt
                  hồ sơ du học của trường học và cơ quan chức năng.
                </li>
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Hồ sơ này được lưu trữ tại trường học và chỉ được phép chỉnh
                  sửa sau khi đã gửi đi và nhận phản hồi từ công ty hoặc trường
                  học.
                </li>
                <li className="text-sm text-main dark:text-main-foreground md:text-base lg:text-lg">
                  Sau khi gửi hồ sơ, bạn sẽ nhận được thông báo qua email để xác
                  nhận hồ sơ đã được gửi đi và xác thực tài khoản đăng nhập.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
