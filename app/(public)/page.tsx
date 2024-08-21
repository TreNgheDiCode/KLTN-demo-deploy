import AutoViewLogo from "@/components/home/auto-view-logo";
import { HeroHeader } from "@/components/home/hero-header";
import LifeUniversity from "@/components/home/life-university";
import News from "@/components/home/news";
import { VideoSection } from "@/components/home/video-section";
import { GetSchoolLib } from "@/lib/school";
import { Suspense } from "react";
import "../i18n/i18n";
import Loading from "./loading";

export const metadata = {
  title: "Trang chủ",
};

export default async function Home() {
  const schools = await GetSchoolLib();

  return (
    <main className="flex flex-col">
      <HeroHeader schools={schools} />
      <VideoSection />
      <AutoViewLogo />
      <div className="pl-[99px] pr-[110px]">
        <LifeUniversity />
      </div>
      <Suspense fallback={<Loading />}>
        <News />
      </Suspense>
    </main>
  );
}
