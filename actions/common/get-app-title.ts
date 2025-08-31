"use server";

import { prisma } from "@/lib/prisma";

const getAppTitle = async (): Promise<string> => {
  const appTitle = await prisma.config.findFirst({
    where: {
      key: "APP_TITLE",
    },
  });

  return appTitle?.value ?? process.env.DEFAULT_APP_TITLE ?? "Blog";
};

export default getAppTitle;
