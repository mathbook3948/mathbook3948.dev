"use server";

import { prisma } from "@/lib/prisma";
import { getGridData } from "@/utils/get-grid-data";
import { Prisma } from "@prisma/client";
import { PostWithCategory } from "@/types/post-interface";
import PostOrderByWithRelationInput = Prisma.PostOrderByWithRelationInput;

interface GetUserPostsProps {
  categoryIdx?: number;
  perPage: number;
  page: number;
}

const getUserPosts = async ({ categoryIdx, page, perPage }: GetUserPostsProps) => {
  const select = {
    postIdx: true,
    categoryIdx: true,
    category: true,
    title: true,
    thumbnail: true,
    isPublic: true,
    createdAt: true,
    updatedAt: true,
  };

  let where: any = {
    isDeleted: false,
    isPublic: true,
    category: {
      isDeleted: false,
    },
  };
  if (categoryIdx) where = { ...where, categoryIdx: categoryIdx };

  const skip = (page - 1) * perPage;
  const take = perPage;

  const orderBy: PostOrderByWithRelationInput[] = [
    {
      createdAt: "desc",
    },
    {
      updatedAt: "desc",
    },
  ];

  const [posts, totalCount] = await prisma.$transaction([
    prisma.post.findMany({
      select,
      where,
      skip,
      take,
      orderBy,
    }),
    prisma.post.count({ where }),
  ]);

  return getGridData({ data: posts as unknown as PostWithCategory[], page, perPage, totalCount });
};

export default getUserPosts;
