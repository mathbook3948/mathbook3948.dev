-- AlterTable
ALTER TABLE "public"."t_port_draft" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "thumbnail" VARCHAR;
