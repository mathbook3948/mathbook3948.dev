"use server";

import { prisma } from "@/lib/prisma";

interface GetAdminPostDraftProps {
  postDraftIdx: number;
}

const getAdminPostDraft = async ({ postDraftIdx }: GetAdminPostDraftProps) => {
  return prisma.postDraft.findFirst({
    where: {
      postDraftIdx: postDraftIdx,
    },
  });
};

export default getAdminPostDraft;
