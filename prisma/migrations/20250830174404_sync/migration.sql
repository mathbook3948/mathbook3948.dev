/*
  Warnings:

  - You are about to drop the column `board_idx` on the `t_post` table. All the data in the column will be lost.
  - You are about to drop the `t_board` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_idx` to the `t_post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."t_post" DROP CONSTRAINT "t_post_board_idx_fkey";

-- AlterTable
ALTER TABLE "public"."t_post" DROP COLUMN "board_idx",
ADD COLUMN     "category_idx" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."t_board";

-- CreateTable
CREATE TABLE "public"."t_category" (
    "category_idx" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_category_pkey" PRIMARY KEY ("category_idx")
);

-- AddForeignKey
ALTER TABLE "public"."t_post" ADD CONSTRAINT "t_post_category_idx_fkey" FOREIGN KEY ("category_idx") REFERENCES "public"."t_category"("category_idx") ON DELETE RESTRICT ON UPDATE CASCADE;
