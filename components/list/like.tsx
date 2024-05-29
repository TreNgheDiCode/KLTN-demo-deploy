import { PostLib } from "@/types";
import { ComponentListLike } from "./ListLike";

interface PropPost {
  posts: PostLib[];
}

export const ListLike = ({ posts }: PropPost) => {
  return (
    <>
      <div className="text-[24px] font-bold">Danh sách like</div>
      <ComponentListLike />
    </>
  );
};
