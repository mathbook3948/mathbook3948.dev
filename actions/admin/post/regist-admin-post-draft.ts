"use server";

import { prisma } from "@/lib/prisma";
import { AdminWriteSchemaType } from "@/schemas/admin-write-schema";

const registAdminPostDraft = async ({
  categoryIdx,
  title,
  content,
  thumbnail,
  isPublic,
}: AdminWriteSchemaType) => {
  return await prisma.postDraft.create({
    data: {
      categoryIdx: categoryIdx,
      title,
      content,
      thumbnail,
      isPublic,
    },
  });
};

export default registAdminPostDraft;
