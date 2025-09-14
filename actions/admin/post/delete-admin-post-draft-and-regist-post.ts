"use server";

import { prisma } from "@/lib/prisma";
import { AdminWriteSchemaType } from "@/schemas/admin-write-schema";

interface DeleteAdminPostDraftAndRegistPostProps extends AdminWriteSchemaType {
  postDraftIdx: number;
}

const deleteAdminPostDraftAndRegistPost = async ({
  postDraftIdx,
  categoryIdx,
  title,
  content,
  thumbnail,
  isPublic,
}: DeleteAdminPostDraftAndRegistPostProps) => {
  await prisma.$transaction([
    prisma.postDraft.delete({
      where: { postDraftIdx },
    }),
    prisma.post.create({
      data: { categoryIdx, title, content, thumbnail, isPublic },
    }),
  ]);
};

export default deleteAdminPostDraftAndRegistPost;
