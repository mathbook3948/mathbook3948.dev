/*
  Warnings:

  - You are about to drop the `t_port_draft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."t_port_draft";

-- CreateTable
CREATE TABLE "public"."t_post_draft" (
    "post_draft_idx" SERIAL NOT NULL,
    "category_idx" INTEGER NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "thumbnail" VARCHAR,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "t_post_draft_pkey" PRIMARY KEY ("post_draft_idx")
);
