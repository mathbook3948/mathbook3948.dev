"use server";

import { prisma } from "@/lib/prisma";

interface RegistAdminCategoryProps {
  name: string;
}

const registAdminCategory = async ({ name }: RegistAdminCategoryProps) => {
  await prisma.category.create({
    data: {
      name,
    },
  });
};

export default registAdminCategory;
