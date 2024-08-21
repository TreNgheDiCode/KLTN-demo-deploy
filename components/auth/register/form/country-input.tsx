"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { RegisterFormValues } from "@/schemas";
import { Country } from "@prisma/client";
import { IconExclamationMark } from "@tabler/icons-react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

type Props = {
  setValue: UseFormSetValue<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
};

const schoolItems = [
  {
    value: Country.CANADA,
    name: "Canada",
    description:
      "Xứ sở lá phong đỏ với thiên nhiên hùng vĩ, là một bức tranh đa sắc tộc, nơi hòa quyện nhiều nền văn hóa khác nhau, tạo nên một xã hội cởi mở, thân thiện và phát triển.",
    src: "/canada-bg.jpg",
    flag: <ReactCountryFlag countryCode="CA" className="size-12" svg />,
  },
  {
    value: Country.AUSTRALIA,
    name: "Australia",
    description:
      "Xứ sở chuột túi với những bãi biển dài, nắng ấm quanh năm, là nơi lý tưởng cho những ai yêu thích văn hóa nước Úc, muốn trải nghiệm cuộc sống mới và học tập tại một trong những quốc gia phát triển hàng đầu thế giới.",
    src: "/australia-bg.jpg",
    flag: <ReactCountryFlag countryCode="AU" className="size-12" svg />,
  },
  {
    value: Country.KOREA,
    name: "Hàn Quốc",
    description:
      "Hàn Quốc - xứ sở của những bộ phim Hàn Quốc nổi tiếng, nơi đây còn có nền giáo dục phát triển, chất lượng cao và được đánh giá cao trên thế giới.",
    src: "/korea-bg.jpg",
    flag: <ReactCountryFlag countryCode="KR" className="size-12" svg />,
  },
];

export const CountryInput = ({ setValue, watch, errors }: Props) => {
  const country = watch("country") as Country;
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-lg font-semibold text-main dark:text-main-foreground md:text-xl lg:text-3xl xl:text-5xl">
        Chọn một quốc gia mà bạn muốn đến
      </h1>
      {!country && errors.country && (
        <div className="my-4 flex items-center gap-2.5 rounded-sm bg-rose-300 p-2 text-sm font-semibold text-rose-700 ring-1 ring-inset">
          <IconExclamationMark className="size-6" />
          Vui lòng chọn một quốc gia bên dưới để chuyển sang bước kế tiếp
        </div>
      )}
      <div className="mx-auto my-4 h-1 w-[30vw] bg-main dark:bg-main-foreground" />
      <div className="mt-10 grid grid-cols-1 gap-y-12 md:grid-cols-2">
        {schoolItems.map((item) => (
          <SchoolItem
            key={item.name}
            value={item.value}
            name={item.name}
            description={item.description}
            src={item.src}
            watch={watch}
            flag={item.flag}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );
};

type SchoolItem = {
  value: Country;
  name: string;
  description: string;
  src: string;
  watch: UseFormWatch<RegisterFormValues>;
  flag: React.ReactNode | JSX.Element;
  setValue: UseFormSetValue<RegisterFormValues>;
};

const SchoolItem = ({
  value,
  name,
  description,
  src,
  watch,
  flag,
  setValue,
}: SchoolItem) => {
  const country = watch("country") as Country;
  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
        <CardItem
          translateZ="50"
          className="flex w-full items-center justify-between gap-2.5 text-xl font-bold text-main dark:text-main-foreground"
        >
          {"Quốc gia: " + name}
          {flag}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 line-clamp-3 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src={src}
            height="1000"
            width="1000"
            priority
            quality={100}
            className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="mt-20 flex items-center justify-center">
          <CardItem
            translateZ={20}
            className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
          >
            <Button
              disabled={country === value}
              onClick={() => {
                setValue("country", value);
                setValue("schoolName", "");
              }}
              size="sm"
              className="bg-main text-white hover:bg-main/70 dark:bg-main-foreground dark:text-main-component dark:hover:bg-main-foreground/70"
            >
              Chọn quốc gia
            </Button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};
