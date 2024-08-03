"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { News } from "@/types";

const NewsIDPage = ({ params }: { params: { newsId: string } }) => {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewsDetail() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API}/api/news/${params.newsId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin tin tức");
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        toast.error("Lỗi khi lấy thông tin chi tiết tin tức");
      } finally {
        setLoading(false);
      }
    }

    fetchNewsDetail();
  }, [params.newsId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-[#7D1F1F]">
          Không tìm thấy tin tức
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="overflow-hidden rounded-lg bg-white text-primary shadow-lg dark:bg-black">
        <div className="p-6">
          <h1 className="mb-4 text-3xl font-bold text-[#7D1F1F]">
            {news.title}
          </h1>
          <div
            className="mb-4 text-primary dark:text-white"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-white">
            <p>
              Ngày đăng: {new Date(news.creatAt).toLocaleDateString("vi-VN")}
            </p>
            <p>ID: {params.newsId}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsIDPage;
