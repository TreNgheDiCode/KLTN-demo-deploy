import { useTranslation } from "react-i18next";
import { GlareCard } from "./ui/glare-card";

export function GlareCardDemo() {
  const { t } = useTranslation();
  return (
    <GlareCard className="flex flex-col items-center justify-center">
      <p className="mt-4 text-xl font-bold text-white">{t("loading")}...</p>
    </GlareCard>
  );
}
