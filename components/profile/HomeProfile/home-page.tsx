"use client";
import { Card, CardBody, CardHeader, Divider, User } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";
import { useState } from "react";
import { LuFlagTriangleRight } from "react-icons/lu";
import { ProfilePosts } from "../post/profile-post";
import { StudentLib } from "@/types";
import { ProfilePostsList } from "../post/profile-posts-list";
import { ComponentListSave } from "@/components/Component-Profile/listSave";
import { ComponentEvent } from "@/components/Component-Profile/event";
import { ComponentMessenger } from "@/components/Component-Profile/messeger";
import { ComponentListLike } from "@/components/Component-Profile/listLike";
interface Props {
  student: StudentLib;
}
export const HomePage = ({ student }: Props) => {
  const [state1, setState1] = useState(true);
  const [state2, setState2] = useState(false);
  const [state3, setState3] = useState(false);
  const [state4, setState4] = useState(false);
  const [state5, setState5] = useState(false);
  if (
    state1 == false &&
    state2 == false &&
    state3 == false &&
    state4 == false &&
    state5 == false
  ) {
    setState1(true);
  }

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
    "hover:cursor-pointer font-bold text-black/85 border-b-[2px] border-b-black  dark:text-white";

  const handleAllert = () => {};
  return (
    <>
      <div className="w-[30%]">
        {/* My User */}
        <div className="dark:border-#cccc h-fit w-fit min-w-[200px] rounded-xl  shadow-xl dark:border dark:bg-background">
          <div className="px-[20px] py-[20px]">
            <User
              name={student.account.name!}
              description={student.studentCode}
              avatarProps={{
                isBordered: true,
                fallback: (
                  <CameraIcon className="size-6 animate-pulse text-default-500" />
                ),
                src: `student.cover`,
              }}
              classNames={{
                name: "text-primary font-semibold",
              }}
            />
            <Divider
              onClick={handleAllert}
              className="mt-3 h-[3px] w-[300px] rounded-sm"
            />
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
                  List Like
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
                  List Saved
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
        {/* List Friend  */}
        <Card className="mt-7 h-[300px] w-fit min-w-[200px] rounded-xl border shadow-2xl dark:bg-background ">
          <CardBody className="hidden:overflow-y-scroll w-[340px] scroll-m-2 px-[20px] py-[20px] hover:overflow-y-scroll ">
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
      {/* Post */}
      {state1 && (
        <div className="h-full w-[70%] bg-white px-[5px] text-black dark:bg-background dark:text-white">
          <ProfilePosts
            name={student.account.name}
            image={student.account.image || ""}
          />
          {student.profile.posts.length > 0 && (
            <div className="space-y-4">
              <ProfilePostsList
                posts={student.profile.posts}
                logo={student.account.image}
                profileId={student.profile.id}
                name={student.account.name}
              />
            </div>
          )}
        </div>
      )}
      {/* List like */}

      {state2 && (
        <div className="border-#cccc h-full w-[70%] border px-[5px] py-[5px] text-black dark:bg-background dark:text-white">
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg  dark:bg-background">
            <ComponentListLike />
          </div>
        </div>
      )}

      {/* List Save */}
      {state3 && (
        <div className="border-#cccc h-full w-[70%] border px-[5px] py-[5px] text-black dark:bg-background dark:text-white">
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg  dark:bg-background">
            <ComponentListSave />
          </div>
        </div>
      )}
      {/* Event  */}
      {state4 && (
        <div className="border-#cccc h-full w-[70%] border px-[5px] py-[5px] text-black dark:bg-background dark:text-white">
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg  dark:bg-background">
            <ComponentEvent />
          </div>
        </div>
      )}
      {/* Messeger  */}
      {state5 && (
        <div className="border-#cccc h-full w-[70%] border px-[5px] py-[5px] text-black dark:bg-background dark:text-white">
          <div className="mx-auto mt-[10px] h-[400px] w-[90%] rounded-lg  dark:bg-background">
            <ComponentMessenger />
          </div>
        </div>
      )}
    </>
  );
};
