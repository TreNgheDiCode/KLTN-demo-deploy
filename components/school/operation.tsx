"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";
import Image from "next/image";
import { Operation2 } from "./operation2";
import { Operation1 } from "./operation1";
import { useTranslation } from "react-i18next";

export function Operation() {
  const { t } = useTranslation("school");

  return (
    <>
      <h3 className="text-center text-4xl font-extrabold text-black dark:text-primary sm:text-5xl lg:text-6xl">
        {t("Headquarters")}
      </h3>
      <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-8 md:space-y-0">
        <Operation1 />
        <Operation2 />
      </div>
    </>
  );
}
export default Operation;
