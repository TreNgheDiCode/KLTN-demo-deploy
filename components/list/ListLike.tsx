"use client";

import { onDeleteListLike } from "@/actions/profile/list-like";
import { ListLike } from "@/types";
import { Image, User } from "@nextui-org/react";
import { CameraIcon, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const ComponentListLike = () => {
  const sesion = useSession();
  const router = useRouter();
  const [postLikes, setPostLikes] = useState<ListLike[]>([]);
  const onDelete = async (likeId: string) => {
    await onDeleteListLike(likeId).then((res) => {
      console.log(res);
      if (res.success) {
        toast.success(res.success);
        router.refresh();
        window.location.reload();
      } else {
        toast.error(res);
      }
    });
  };
  useEffect(() => {
    async function fetchListLike() {
      try {
        const requestUrl = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${sesion.data?.user.studentCode}/likes`;
        const respone = await fetch(requestUrl);
        const responeJson = await respone.json();
        setPostLikes(responeJson);
      } catch (error) {
        toast.error("Loi lay likes");
      }
    }

    fetchListLike();
  }, [sesion.data?.user.studentCode]);

  return (
    <>
      <div>
        {postLikes.length > 0 &&
          postLikes.map((like) => (
            <div key={like.id} className="px-[10px] py-[10px]">
              <div className="flex ">
                <div className="">
                  <User
                    className="size-14"
                    name={""}
                    description={""}
                    avatarProps={{
                      isBordered: true,
                      fallback: <CameraIcon className="size-14" />,
                      src: `${like.post.images[0]}`,
                    }}
                    classNames={{
                      name: "text-primary font-semibold",
                    }}
                  />
                </div>
                <div>
                  <div className="flex">
                    Bạn đã thích bài viết của
                    <div className="ml-1 text-[14px] font-bold">
                      {like.profile.student.account.name}
                    </div>
                  </div>
                  <div className="text-[12px]">
                    Nội dung: {like.post.content}
                  </div>
                  <div className="text-[12px]">
                    Trạng thái: {like.post.status}
                  </div>
                </div>
                <Trash2 onClick={() => onDelete(like.id)} color="red" />
              </div>
            </div>
          ))}
        {postLikes.length == 0 && (
          <div className="container flex items-center justify-center text-xl font-bold">
            Danh sach trong
          </div>
        )}
      </div>
    </>
  );
};
