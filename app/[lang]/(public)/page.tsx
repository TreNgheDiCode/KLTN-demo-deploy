import { HeroHeader } from "@/components/home/hero-header";
import { VideoSection } from "@/components/home/video-section";
import { getDictionary } from "@/data/dictionaries";
import { GetSchoolLib } from "@/lib/school";
import { metadata } from "../layout";
import AutoViewLogo from "@/components/home/auto-view-logo";
import LifeUniversity from "@/components/home/life-university";
import News from "@/components/home/news";
import { CrispProvider } from "@/scripts/crisp-provider";

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
      <AutoViewLogo />
      <div className="pl-[99px] pr-[110px]">
        <LifeUniversity />
      </div>
      <News />
      <CrispProvider />
    </main>
  );
}
