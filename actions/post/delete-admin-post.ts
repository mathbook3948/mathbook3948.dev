"use server";

import { prisma } from "@/lib/prisma";

interface DeleteAdminPostProps {
  postIdx: number;
}

const deleteAdminPost = async ({ postIdx }: DeleteAdminPostProps) => {
  await prisma.post.update({
    data: {
      isDeleted: true,
    },
    where: {
      postIdx: postIdx,
    },
  });
};

export default deleteAdminPost;
