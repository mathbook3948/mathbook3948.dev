"use server";

import { prisma } from "@/lib/prisma";
import { getGridData } from "@/utils/get-grid-data";
import { Prisma } from "@prisma/client";
import { PostDraftWithCategory } from "@/types/post-draft-interface";
import PostDraftOrderByWithRelationInput = Prisma.PostDraftOrderByWithRelationInput;

interface GetAdminPostDraftsProps {
  categoryIdx?: number;
  perPage: number;
  page: number;
}

const getAdminPostDrafts = async ({ categoryIdx, page, perPage }: GetAdminPostDraftsProps) => {
  const select = {
    postDraftIdx: true,
    categoryIdx: true,
    category: true,
    title: true,
    thumbnail: true,
    isPublic: true,
    createdAt: true,
  };

  const where: Prisma.PostDraftWhereInput = {};

  if (categoryIdx) {
    where.categoryIdx = categoryIdx;
  }

  const skip = (page - 1) * perPage;
  const take = perPage;

  const orderBy: PostDraftOrderByWithRelationInput[] = [{ createdAt: "desc" }];

  const [posts, totalCount] = await prisma.$transaction([
    prisma.postDraft.findMany({
      select,
      where,
      skip,
      take,
      orderBy,
    }),
    prisma.postDraft.count({ where }),
  ]);

  return getGridData({
    data: posts as unknown as PostDraftWithCategory[],
    page,
    perPage,
    totalCount,
  });
};

export default getAdminPostDrafts;
