import { GetNews } from "@/lib/news";
import type { News } from "@/types";
import NewsHome from "../news-home/new-home";

const News = async () => {
  const news: News[] | null = await GetNews();
  return (
    <>
      <NewsHome news={news!} />
    </>
  );
};
export default News;
