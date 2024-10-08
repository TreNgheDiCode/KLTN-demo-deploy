import { ListLike } from "@/types";
import { User } from "@nextui-org/react";
import { CameraIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ResponsiveDialog from "./alertDeleteLike";

export const ComponentListLike = () => {
  const sesion = useSession();
  const [postLikes, setPostLikes] = useState<ListLike[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListLike() {
      try {
        setLoading(true);
        const Url = `${process.env.NEXT_PUBLIC_API}/api/accounts/students/profiles/${sesion.data?.user.student.studentCode}/like`;
        const rqUrl = await fetch(Url);
        const res = await rqUrl.json();
        setPostLikes(res);
      } catch (error) {
        toast.error("Lỗi lấy danh sách thích");
      } finally {
        setLoading(false);
      }
    }

    fetchListLike();
  }, [sesion.data?.user.student.studentCode]);

  return (
    <>
      <div>
        <div className="font-bold">Danh Sách Thích</div>
        {loading ? (
          <div className="container flex items-center justify-center text-xl font-bold">
            Đang tải dữ liệu...
          </div>
        ) : (
          postLikes.length > 0 &&
          postLikes.map((like) => (
            <div key={like.id} className="px-[10px] py-[10px]">
              <div className="flex">
                <div className="">
                  <User
                    className="size-14"
                    name={""}
                    description={""}
                    avatarProps={{
                      isBordered: true,
                      fallback: <CameraIcon className="size-14" />,
                      src: `${like.post.images[0]?.url || "undefined"} `,
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
          ))
        )}
      </div>
    </>
  );
};
