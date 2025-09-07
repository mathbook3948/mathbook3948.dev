"use server";

import { prisma } from "@/lib/prisma";
import * as jose from "jose";

import { AdminLoginSchemaType } from "@/schemas/admin-login-schema";
import { Config } from "@/constants/config-constant";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const adminLogin = async ({ id, password }: AdminLoginSchemaType): Promise<boolean> => {
  const admin = await prisma.admin.findFirst({
    where: {
      id,
    },
  });

  if (!admin) {
    return false;
  }

  const same = await bcrypt.compare(password, admin.password);

  if (!same) {
    return false;
  }

  const jwtSecret = await prisma.config.findFirst({
    where: {
      key: Config.JWT_SECRET,
    },
  });

  const secret = new TextEncoder().encode(jwtSecret?.value);

  const token = await new jose.SignJWT({ name: admin.name, adminIdx: admin.adminIdx })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .setSubject(admin.id)
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set({
    name: "access_token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return true;
};

export default adminLogin;
