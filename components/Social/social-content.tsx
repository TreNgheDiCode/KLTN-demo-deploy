"use client";
import { Card, CardBody, Divider, User } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { LuFlagTriangleRight } from "react-icons/lu";
import { Friend, StudentLib } from "@/types";
import { ComponentListSave } from "@/components/Component-Profile/listSave";
import { ComponentEvent } from "@/components/Component-Profile/event";
import { ComponentListLike } from "@/components/Component-Profile/listLike";
import { ProfilePosts } from "../profile/post/profile-post";
import { ProfilePostsList } from "../profile/post/profile-posts-list";
import { ComponentMessenger } from "../Component-Profile/messeger";
import Link from "next/link";

const SocialContent = ({ student }: { student: StudentLib }) => {
  const [friend, setFriend] = useState<Friend[]>();
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  useEffect(() => {
    async function fetchListFriend() {
      if (student.school.name) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API}/api/message/school/${student.school.name}`;
          const response = await fetch(url);
          const resJson = await response.json();
          setFriend(resJson);
        } catch (e) {}
      }
    }
    fetchListFriend();
  }, [student.school.name]);

  const cssText =
    "hover:cursor-pointer font-bold text-black/85 border-b-2 border-black dark:text-white";

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Sidebar */}
      <div className="mb-4 w-full lg:mb-0 lg:w-1/4 lg:pr-4">
        {/* My User */}
        <div className="rounded-xl shadow-xl dark:border dark:bg-background">
          <div className="p-5">
            <User
              name={student.account.name!}
              description={student.studentCode}
              avatarProps={{
                isBordered: true,
                fallback: (
                  <CameraIcon className="size-6 animate-pulse text-default-500" />
                ),
                src: `${student.account.image}`,
              }}
              classNames={{ name: "text-primary font-semibold" }}
            />
            <Divider className="mt-3 h-0.5 w-full rounded-sm" />
            {/* Tác vụ */}
            <div className="py-5">
              {["posts", "likes", "saved", "events", "messages"].map(
                (tab, index) => (
                  <div key={index} className="flex items-center pb-1.5">
                    {activeTab === tab && (
                      <LuFlagTriangleRight className="text-black dark:text-white" />
                    )}
                    {tab === "messages" ? (
                      <Link href={`/messenger/${student.studentCode}`}>
                        <div
                          className={
                            activeTab === tab
                              ? cssText
                              : "text-primary hover:cursor-pointer hover:underline"
                          }
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </div>
                      </Link>
                    ) : (
                      <div
                        onClick={() => {
                          if (tab === "posts") {
                            setSelectedFriend(null);
                          }
                          setActiveTab(tab);
                        }}
                        className={
                          activeTab === tab
                            ? cssText
                            : "text-primary hover:cursor-pointer hover:underline"
                        }
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        {/* List Friend */}
        <Card className="mt-7 h-80 rounded-xl border shadow-2xl dark:bg-background">
          <h1 className="pl-3 pt-2 font-bold">List Friend</h1>
          <CardBody className="w-full overflow-y-scroll p-5">
            {friend?.map((fen, index) => {
              if (fen.studentCode === student.studentCode) return null;
              return (
                <div
                  key={index}
                  className="cursor-pointer pb-3.5"
                  onClick={() => {
                    setSelectedFriend(fen);
                    setActiveTab("friendPosts");
                  }}
                >
                  <User
                    name={fen.account.name}
                    avatarProps={{
                      isBordered: true,
                      fallback: (
                        <CameraIcon className="size-6 animate-pulse text-default-500" />
                      ),
                      src: fen.account.image,
                    }}
                    classNames={{ name: "text-primary font-semibold" }}
                  />
                  <Divider className="my-2" />
                </div>
              );
            })}
          </CardBody>
        </Card>
      </div>

      {/* Main Content */}
      <div className="ml-4 w-full lg:w-3/4">
        {activeTab === "posts" && !selectedFriend && (
          <div className="h-full bg-white px-1.5 text-black dark:bg-background dark:text-white">
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
        {activeTab === "friendPosts" && selectedFriend && (
          <div className="h-full bg-white px-1.5 text-black dark:bg-background dark:text-white">
            <ProfilePosts
              name={selectedFriend.account.name}
              image={selectedFriend.account.image || ""}
            />
            {selectedFriend.profile.posts.length > 0 && (
              <div className="space-y-4">
                <ProfilePostsList
                  posts={selectedFriend.profile.posts}
                  logo={selectedFriend.account.image}
                  profileId={selectedFriend.profile.id}
                  name={selectedFriend.account.name}
                />
              </div>
            )}
          </div>
        )}
        {activeTab === "likes" && (
          <div className="border-#cccc h-full w-full border px-1.5 py-1.5 text-black dark:bg-background dark:text-white">
            <div className="mx-auto mt-2.5 h-96 w-[90%] rounded-lg dark:bg-background">
              <ComponentListLike />
            </div>
          </div>
        )}
        {activeTab === "saved" && (
          <div className="border-#cccc h-full w-full border px-1.5 py-1.5 text-black dark:bg-background dark:text-white">
            <div className="mx-auto mt-2.5 h-96 w-[90%] rounded-lg dark:bg-background">
              <ComponentListSave />
            </div>
          </div>
        )}
        {activeTab === "events" && (
          <div className="border-#cccc h-full w-full border px-1.5 py-1.5 text-black dark:bg-background dark:text-white">
            <div className="mx-auto mt-2.5 h-96 w-[90%] rounded-lg dark:bg-background">
              <ComponentEvent />
            </div>
          </div>
        )}
        {activeTab === "messages" && (
          <div className="border-#cccc h-full w-full border px-1.5 py-1.5 text-black dark:bg-background dark:text-white">
            <div className="mx-auto mt-2.5 h-96 w-[90%] rounded-lg dark:bg-background">
              <ComponentMessenger />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialContent;
