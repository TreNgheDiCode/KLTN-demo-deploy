"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function Operation2() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center">
      <PinContainer
        title="cơ sở 2 chi nhánh sư vạn hạnh"
        href="https://www.google.com/maps/place/C%C3%B4ng+vi%C3%AAn+du+l%E1%BB%8Bch+sinh+th%C3%A1i+H%C3%B3c+M%C3%B4n/@10.8666927,106.5770064,15z/data=!4m15!1m8!3m7!1s0x31752a63958a5d71:0xfca94835ba3d131!2z4bqkcCBYdcOibiBUaOG7m2kgxJDDtG5nIDEsIHjDoyBUw6JuIFh1w6JuLCBIw7NjIE3DtG4sIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!3b1!8m2!3d10.8678732!4d106.5864049!16s%2Fg%2F11gk8pz4bs!3m5!1s0x31752bc1df649201:0x481db1e94e761443!8m2!3d10.857752!4d106.5817266!16s%2Fg%2F11ty4t_9j7?entry=ttu"
      >
        <div className="flex h-[20rem] w-[20rem] basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2">
          <h3 className="!m-0 max-w-xs !pb-2 text-base font-bold text-black dark:text-primary">
            Cơ sở 2
          </h3>
          <div className="!m-0 !p-0 text-base font-normal">
            <span className="text-black dark:text-primary">
              Sư vạn hạnh, quận 10 gần ngã tư.
            </span>
          </div>
          <div className="mt-4 flex w-full flex-1 rounded-lg">
            <Image
              alt="dsad"
              src={"/coso/map1.png"}
              width={400}
              height={340}
              className="rounded-lg"
            />
          </div>
        </div>
      </PinContainer>
    </div>
  );
}
