"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface RegistAdminCategoryProps {
  name: string;
}

const registAdminCategory = async ({ name }: RegistAdminCategoryProps) => {
  await prisma.category.create({
    data: {
      name,
    },
  });

  revalidatePath("/admin/config");
};

export default registAdminCategory;
