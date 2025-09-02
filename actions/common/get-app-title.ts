"use server";

import { prisma } from "@/lib/prisma";
import { Config } from "@/constants/config-constant";

const getAppTitle = async (): Promise<string> => {
  const appTitle = await prisma.config.findFirst({
    where: {
      key: Config.APP_TITLE,
    },
  });

  return appTitle?.value ?? process.env.DEFAULT_APP_TITLE ?? "Blog";
};

export default getAppTitle;
