"use server";

import { prisma } from "@/lib/prisma";

const getAdminCategoryList = async () => {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: { where: { isDeleted: false } },
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });
};

export default getAdminCategoryList;
