/*
  Warnings:

  - Added the required column `thumbnail` to the `t_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."t_post" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "thumbnail" VARCHAR NOT NULL;
