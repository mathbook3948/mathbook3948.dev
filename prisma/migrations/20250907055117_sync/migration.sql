-- CreateTable
CREATE TABLE "public"."t_port_draft" (
    "post_draft_idx" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "t_port_draft_pkey" PRIMARY KEY ("post_draft_idx")
);
