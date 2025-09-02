import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { Config } from "@/constants/config-constant";
import getAppTitle from "@/actions/common/get-app-title";
import Navbar from "@/views/shared/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const appTitle = await getAppTitle();

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <main className="antialiased min-h-screen p-4 pt-0">
          <div className="w-full max-w-4xl mx-auto">
            <Navbar appTitle={appTitle} />
            {children}
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
