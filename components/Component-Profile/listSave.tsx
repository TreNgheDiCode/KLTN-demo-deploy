"use client";

import { onDeleteListSave } from "@/actions/profile/save";
import { ListSave } from "@/types";
import { Image, User } from "@nextui-org/react";
import { CameraIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ResponsiveDialog from "./alertDeleteSave";

export const ComponentListSave = () => {
  const sesion = useSession();
  const [postSaves, setPostSave] = useState<ListSave[]>([]);

  useEffect(() => {
    async function fetchListSave() {
      try {
        const requestUrl = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${sesion.data?.user.studentCode}/save`;
        const respone = await fetch(requestUrl);
        const responeJson = await respone.json();
        setPostSave(responeJson);
      } catch (error) {
        toast.error("Loi lay save");
      }
    }

    fetchListSave();
  }, [sesion.data?.user.studentCode]);

  return (
    <>
      <div>
        <div className="font-bold ">Danh Sách Lưu</div>
        {postSaves.length > 0 &&
          postSaves.map((save) => (
            <div key={save.id} className="px-[10px] py-[10px]">
              <div className="flex ">
                <div className="">
                  <User
                    className="size-14"
                    name={""}
                    description={""}
                    avatarProps={{
                      isBordered: true,
                      fallback: <CameraIcon className="size-14" />,
                      src: `${save.post.images[0]}`,
                    }}
                    classNames={{
                      name: "text-primary font-semibold",
                    }}
                  />
                </div>
                <div>
                  <div className="flex">
                    Bạn đã lưu bài viết của
                    <div className="ml-1 text-[14px] font-bold">
                      {save.profile.student.account.name}
                    </div>
                  </div>
                  <div className="text-[12px]">
                    Nội dung: {save.post.content}
                  </div>
                  <div className="text-[12px]">
                    Trạng thái: {save.post.status}
                  </div>
                </div>
                <ResponsiveDialog id={save.id} />
              </div>
            </div>
          ))}
        {postSaves.length == 0 && (
          <div className="container flex items-center justify-center text-xl font-bold">
            Danh sách trống
          </div>
        )}
      </div>
    </>
  );
};
