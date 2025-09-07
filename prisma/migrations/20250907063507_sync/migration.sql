/*
  Warnings:

  - Added the required column `category_idx` to the `t_port_draft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."t_port_draft" ADD COLUMN     "category_idx" INTEGER NOT NULL;
