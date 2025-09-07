"use server";

import { prisma } from "@/lib/prisma";

interface GetAdminPostProps {
  postIdx: number;
}

const getAdminPost = async ({ postIdx }: GetAdminPostProps) => {
  return prisma.post.findFirst({
    where: {
      postIdx: postIdx,
      isDeleted: false,
      category: {
        isDeleted: false,
      },
    },
  });
};

export default getAdminPost;
