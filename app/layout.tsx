import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/views/shared/navbar";
import getAppTitle from "@/actions/common/get-app-title";
import { prisma } from "@/lib/prisma";

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <Navbar appTitle={appTitle} />
        <div className="w-full max-w-4xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
};

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await prisma.config.findFirst({
    where: { key: "APP_TITLE" },
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
