"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Category } from "@/types/category-interface";

interface ModifyAdminCategoryProps {
  categoryList: Category[];
}

const modifyAdminCategory = async ({ categoryList }: ModifyAdminCategoryProps) => {
  await Promise.all(
    categoryList.map((c) =>
      prisma.category.update({
        where: { categoryIdx: c.categoryIdx },
        data: {
          sortOrder: c.sortOrder,
          updatedAt: new Date(),
        },
      }),
    ),
  );

  revalidatePath("/admin/config");
};

export default modifyAdminCategory;
