import { GetNews } from "@/lib/news";
import type { News } from "@/types";
import NewsHome from "../news-home/news-home";

const News = async () => {
  const news = await GetNews();

  if (!news || news.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <p>Danh sách tin tức trống</p>
      </div>
    );
  }
  return (
    <>
      <NewsHome news={news} />
    </>
  );
};
export default News;
