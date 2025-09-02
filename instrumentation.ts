import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Config } from "@/constants/config-constant";

export function register() {
  init().then((_) => console.log("DB Initialized"));
}

/**
 * admin 사용자 초기화
 * */
const init = async () => {
  await initAdmin();
  await initConfig();
};

const initAdmin = async () => {
  const adminList = await prisma.admin.count();

  const id = process.env.DEFAULT_ROOT_ADMIN_ID ?? "admin";
  const name = process.env.DEFAULT_ROOT_ADMIN_NAME ?? "admin";

  const originalPassword = process.env.DEFAULT_ROOT_ADMIN_PASSWORD ?? "password";
  const password = await bcrypt.hash(originalPassword, 12);

  if (adminList === 0) {
    await prisma.admin.create({
      data: {
        id,
        name,
        password,
      },
    });
  }
};

const initConfig = async () => {
  const appTitle = await prisma.config.findFirst({
    where: {
      key: Config.APP_TITLE,
    },
  });

  if (!appTitle) {
    await prisma.config.create({
      data: {
        key: Config.APP_TITLE,
        value: process.env.DEFAULT_APP_TITLE ?? "Blog",
      },
    });
  }

  const appFavicon = await prisma.config.findFirst({
    where: {
      key: Config.APP_FAVICON,
    },
  });

  if (!appFavicon) {
    await prisma.config.create({
      data: {
        key: Config.APP_FAVICON,
        value:
          "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",
      },
    });
  }
};
