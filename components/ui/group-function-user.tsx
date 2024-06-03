"use client";
import { Card, CardBody, CardHeader, Divider, User } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";
import { useState } from "react";
import { LuFlagTriangleRight } from "react-icons/lu";

export const NavLeft = () => {
  const [state1, setState1] = useState(true);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);
  const [state5, setState5] = useState(false);

  const handleTextareaChange1 = () => {
    setState1((prev) => !prev);
    setState2(false);
    setState3(false);
    setState4(false);
    setState5(false);
  };
  const handleTextareaChange2 = () => {
    setState2((prev) => !prev);
    setState1(false);
    setState3(false);
    setState4(false);
    setState5(false);
  };
  const handleTextareaChange3 = () => {
    setState3((prev) => !prev);
    setState2(false);
    setState1(false);
    setState4(false);
    setState5(false);
  };
  const handleTextareaChange4 = () => {
    setState4((prev) => !prev);
    setState2(false);
    setState3(false);
    setState1(false);
    setState5(false);
  };
  const handleTextareaChange5 = () => {
    setState5((prev) => !prev);
    setState2(false);
    setState3(false);
    setState4(false);
    setState1(false);
  };
  const cssText =
    "hover:cursor-pointer font-bold text-black/85 border-b-[2px] border-b-black ";

  return (
    <>
      <div className="w-[30%]">
        <div className="h-fit w-fit min-w-[200px] rounded-xl  bg-white shadow-xl ">
          <div className="px-[20px] py-[20px]">
            <User
              name={"hello"}
              description={"cc"}
              avatarProps={{
                isBordered: true,
                fallback: (
                  <CameraIcon className="size-6 animate-pulse text-default-500" />
                ),
                src: undefined,
              }}
              classNames={{
                name: "text-primary font-semibold",
              }}
            />

            <Divider className="mt-3 h-[3px] w-[300px] rounded-sm" />

            <div className="py-[20px] ">
              <div className="flex items-center pb-[5px]">
                {state1 && <LuFlagTriangleRight />}
                <div
                  onClick={handleTextareaChange1}
                  className={
                    state1
                      ? cssText
                      : `text-primary hover:cursor-pointer hover:underline`
                  }
                >
                  Posts
                </div>
              </div>

              <div className="flex items-center pb-[5px]">
                {state2 && <LuFlagTriangleRight />}
                <div
                  onClick={handleTextareaChange2}
                  className={
                    state2
                      ? cssText
                      : `text-primary hover:cursor-pointer hover:underline`
                  }
                >
                  List Saves
                </div>
              </div>

              <div className="flex items-center pb-[5px]">
                {state3 && <LuFlagTriangleRight />}
                <div
                  onClick={handleTextareaChange3}
                  className={
                    state3
                      ? cssText
                      : `text-primary hover:cursor-pointer hover:underline`
                  }
                >
                  Groups
                </div>
              </div>

              <div className="flex items-center pb-[5px]">
                {state4 && <LuFlagTriangleRight />}
                <div
                  onClick={handleTextareaChange4}
                  className={
                    state4
                      ? cssText
                      : `text-primary hover:cursor-pointer hover:underline`
                  }
                >
                  Events
                </div>
              </div>

              <div className="flex items-center pb-[5px]">
                {state5 && <LuFlagTriangleRight />}
                <div
                  onClick={handleTextareaChange5}
                  className={
                    state5
                      ? cssText
                      : `text-primary hover:cursor-pointer hover:underline`
                  }
                >
                  Messages
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="mt-7 h-[300px] w-fit min-w-[200px] rounded-xl bg-white shadow-2xl">
          <CardBody className="hidden:overflow-y-scroll w-[340px] scroll-m-2 px-[20px] py-[20px] hover:overflow-y-scroll">
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="pb-[15px]">
              <User
                name={"hello"}
                avatarProps={{
                  isBordered: true,
                  fallback: (
                    <CameraIcon className="size-6 animate-pulse text-default-500" />
                  ),
                  src: undefined,
                }}
                classNames={{
                  name: "text-primary font-semibold",
                }}
              />
            </div>
            <div className="h-[3px] w-[285px] rounded-sm" />
          </CardBody>
        </Card>
      </div>

      {state1 && (
        <div className="h-full w-[70%] bg-black px-[5px] text-red-600">
          <Card className="mx-auto w-[90%]">Create a Post here</Card>
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg bg-white">
            dasdhsajhdas dasjdhasjkd dasjdhks
          </div>
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg bg-white">
            dasdhsajhdas dasjdhasjkd dasjdhks
          </div>
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg bg-white">
            dasdhsajhdas dasjdhasjkd dasjdhks
          </div>
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg bg-white">
            dasdhsajhdas dasjdhasjkd dasjdhks
          </div>
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg bg-white">
            dasdhsajhdas dasjdhasjkd dasjdhks
          </div>
        </div>
      )}

      {state2 && (
        <div className="h-full w-[70%] bg-black px-[5px] text-red-600">
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg bg-white">
            dasdhsajhdas dasjdhasjkd dasjdhks
          </div>
        </div>
      )}
    </>
  );
};
