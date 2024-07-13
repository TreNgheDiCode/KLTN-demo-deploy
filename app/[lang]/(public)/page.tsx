import { HeroHeader } from "@/components/home/hero-header";
import { VideoSection } from "@/components/home/video-section";
import { getDictionary } from "@/data/dictionaries";
import { GetSchoolLib } from "@/lib/school";
import { metadata } from "../layout";
import Image from "next/image";
import { Textarea } from "@nextui-org/react";

export default async function Home({
  params: { lang },
}: {
  params: { lang: "en" | "vi" };
}) {
  const dict = await getDictionary(lang);
  metadata.title = dict.Home.Title;
  const schools = await GetSchoolLib();
  return (
    <main className="flex flex-col">
      <HeroHeader schools={schools || []} />
      <VideoSection />
    </main>
  );
}
