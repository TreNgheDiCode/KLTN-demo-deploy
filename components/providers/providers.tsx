// app/providers.tsx
"use client";

import { I18nProvider } from "@/app/i18n/i18nContext";
import { NextUIProvider } from "@nextui-org/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider className="h-full w-full" navigate={router.push}>
      <I18nProvider>
        <main className="h-full w-full bg-white dark:bg-background">
          {children}
          <SpeedInsights />
        </main>
      </I18nProvider>
    </NextUIProvider>
  );
}
