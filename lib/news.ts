import { News } from "@/types";

export const GetNews = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/news`, {
      method: "GET",
      cache: "no-cache",
    });

    const news: News[] = await res.json();

    return news;
  } catch (error) {
    return null;
  }
};
