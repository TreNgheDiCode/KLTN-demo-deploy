import { getDictionary } from "@/data/dictionaries";
import { metadata } from "../layout";
import { HeroHeader } from "@/components/home/hero-header";
import { GetSchoolLib } from "@/lib/school";

export default async function Home({
  params: { lang },
}: {
  params: { lang: "en" | "vi" };
}) {
  const dict = await getDictionary(lang);
  metadata.title = dict.Home.Title;
  const schools = await GetSchoolLib();
  return (
    <main>
      <HeroHeader schools={schools || []} />
      <div className="flex h-screen items-center justify-center bg-rose-500 text-primary">
        Meomeo
      </div>
      <div className="flex h-screen items-center justify-center bg-orange-500 text-primary">
        Meomeo
      </div>
    </main>
  );
}
