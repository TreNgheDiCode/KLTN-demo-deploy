import { auth } from "@/auth";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Providers } from "@/components/providers/providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { EdgeStoreProvider } from "@/hooks/use-edgestore";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Montserrat } from "next/font/google";
import "react-day-picker/dist/style.css";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canadian Student Management Center",
  description: "Generated by CEMC Co., Ltd.",
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
      <html lang={params.lang || "en"}>
        <head>
          {/* Thêm các thẻ meta hoặc link cần thiết ở đây */}
          <GoogleAnalytics gaId="G-0V5PG7FTX1" />
        </head>
        <body className={montserrat.className}>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider />
              <Providers>{children}</Providers>
              <Toaster richColors closeButton />
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
