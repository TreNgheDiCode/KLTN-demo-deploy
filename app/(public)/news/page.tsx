"use client";

import { News } from "@/types";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const NewsPage = () => {
  const [listNews, setListNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleNewsId = (newsId: string) => {
    router.push(`news/${newsId}`);
  };

  useEffect(() => {
    async function fetchListNews() {
      try {
        const Url = `${process.env.NEXT_PUBLIC_API}/api/news`;
        const rqUrl = await fetch(Url);
        const res = await rqUrl.json();
        setListNews(res);
      } catch (e) {
        toast.error("Lỗi lấy thông tin danh sách tin tức");
      } finally {
        setLoading(false);
      }
    }
    fetchListNews();
  }, []); // Add empty dependency array to prevent infinite loop

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
        Danh sách Tin Tức
      </h1>
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listNews.map((news, index) => (
            <div
              key={index}
              className="transform overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer dark:bg-black dark:text-white"
              onClick={() => handleNewsId(news.id)}
            >
              <Image
                src={news.cover}
                alt={news.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                  {news.title}
                </h2>
                <p
                  className="mb-4 line-clamp-3 text-gray-600"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
                <p className="text-sm text-gray-500">
                  Ngày đăng:{" "}
                  {new Date(news.creatAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
