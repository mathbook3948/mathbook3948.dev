import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
      key: "APP_TITLE",
    },
  });

  if (!appTitle) {
    await prisma.config.create({
      data: {
        key: "APP_TITLE",
        value: process.env.DEFAULT_APP_TITLE ?? "Blog",
      },
    });
  }
};
