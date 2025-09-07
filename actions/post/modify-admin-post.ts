"use server";

import { prisma } from "@/lib/prisma";
import { AdminWriteSchemaType } from "@/schemas/admin-write-schema";

const modifyAdminPost = async ({
  postIdx,
  categoryIdx,
  title,
  content,
  thumbnail,
  isPublic,
}: AdminWriteSchemaType) => {
  await prisma.post.update({
    data: {
      categoryIdx: categoryIdx,
      title,
      content,
      thumbnail,
      isPublic,
      updatedAt: new Date(),
    },
    where: {
      postIdx: postIdx!,
    },
  });
};

export default modifyAdminPost;
