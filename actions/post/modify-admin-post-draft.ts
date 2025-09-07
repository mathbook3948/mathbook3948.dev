"use server";

import { prisma } from "@/lib/prisma";
import { AdminWriteSchemaType } from "@/schemas/admin-write-schema";

interface ModifyAdminPostDraftProps extends AdminWriteSchemaType {
  postDraftIdx: number;
}

const modifyAdminPostDraft = async ({
  postDraftIdx,
  categoryIdx,
  title,
  content,
  thumbnail,
  isPublic,
}: ModifyAdminPostDraftProps) => {
  await prisma.postDraft.update({
    data: {
      categoryIdx,
      title,
      content,
      thumbnail,
      isPublic,
    },
    where: {
      postDraftIdx: postDraftIdx,
    },
  });
};

export default modifyAdminPostDraft;
