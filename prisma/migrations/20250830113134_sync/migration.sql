-- CreateTable
CREATE TABLE "public"."t_admin" (
    "admin_idx" SERIAL NOT NULL,
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_admin_pkey" PRIMARY KEY ("admin_idx")
);

-- CreateTable
CREATE TABLE "public"."t_board" (
    "board_idx" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_board_pkey" PRIMARY KEY ("board_idx")
);

-- CreateTable
CREATE TABLE "public"."t_post" (
    "post_idx" SERIAL NOT NULL,
    "board_idx" INTEGER NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "t_post_pkey" PRIMARY KEY ("post_idx")
);
