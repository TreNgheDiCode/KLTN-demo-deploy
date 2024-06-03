import { ListLike } from "@/types";
import { User } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ResponsiveDialog from "./alertDeleteLike";

export const ComponentListLike = () => {
  const sesion = useSession();
  const router = useRouter();
  const [postLikes, setPostLikes] = useState<ListLike[]>([]);

  useEffect(() => {
    async function fetchListLike() {
      try {
        const Url = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${sesion.data?.user.studentCode}/like`;
        const rqUrl = await fetch(Url);
        const res = await rqUrl.json();
        setPostLikes(res);
      } catch (error) {
        toast.error("Lỗi lấy danh sách thích");
      }
    }

    fetchListLike();
  }, [sesion.data?.user.studentCode]);

  return (
    <>
      <div>
        <div className="font-bold ">Danh Sách Thích</div>
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
                <ResponsiveDialog id={like.id} />
              </div>
            </div>
          ))}
        {postLikes.length == 0 && (
          <div className="container flex items-center justify-center text-xl font-bold">
            Danh sách trống
          </div>
        )}
      </div>
    </>
  );
};
