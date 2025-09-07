import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { Config } from "@/constants/config-constant";
import getAppTitle from "@/actions/common/get-app-title";
import Navbar from "@/views/shared/navbar";
import localFont from "next/font/local";
import RootProvider from "@/views/shared/root-provider";
import { Toaster } from "@/components/ui/sonner";

const pretendard = localFont({
  src: [
    { path: "../fonts/Pretendard-Thin.woff2", weight: "100", style: "normal" },
    { path: "../fonts/Pretendard-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../fonts/Pretendard-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Pretendard-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Pretendard-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Pretendard-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../fonts/Pretendard-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const appTitle = await getAppTitle();

  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <main className="antialiased min-h-screen">
          <div className="w-full lg:max-w-4xl px-4 mx-auto">
            <Navbar appTitle={appTitle} />
            <RootProvider>{children}</RootProvider>
            <Toaster position="top-center" />
          </div>
        </main>
      </body>
    </html>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await prisma.config.findFirst({
    where: { key: Config.APP_TITLE },
  });

  return {
    title: siteConfig?.value ?? "",
    description: "Description",
    icons: {
      icon: "/api/favicon",
    },
  };
}

export default RootLayout;
