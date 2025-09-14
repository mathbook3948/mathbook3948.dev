"use server";

import { prisma } from "@/lib/prisma";
import { AdminWriteSchemaType } from "@/schemas/admin-write-schema";

const registAdminPost = async ({
  categoryIdx,
  title,
  content,
  thumbnail,
  isPublic,
}: AdminWriteSchemaType) => {
  await prisma.post.create({
    data: {
      categoryIdx: categoryIdx,
      title,
      content,
      thumbnail,
      isPublic,
    },
  });
};

export default registAdminPost;
