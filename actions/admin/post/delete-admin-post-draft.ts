"use server";

import { prisma } from "@/lib/prisma";

interface DeleteAdminPostDraftProps {
  postDraftIdx: number;
}

const deleteAdminPostDraft = async ({ postDraftIdx }: DeleteAdminPostDraftProps) => {
  await prisma.postDraft.delete({
    where: {
      postDraftIdx,
    },
  });
};

export default deleteAdminPostDraft;
