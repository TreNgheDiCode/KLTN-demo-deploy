import { auth } from "@/auth";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Providers } from "@/components/providers/providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/hooks/use-edgestore";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Montserrat } from "next/font/google";
import "react-day-picker/dist/style.css";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={params.lang} suppressHydrationWarning>
        <body className={montserrat.className}>
          <EdgeStoreProvider>
            <ThemeProvider
              storageKey="theme"
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <ModalProvider />
              <Providers>
                <main className="h-full w-full bg-white dark:bg-background">
                  {children}
                  <SpeedInsights />
                </main>
                <Toaster richColors closeButton />
              </Providers>
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
