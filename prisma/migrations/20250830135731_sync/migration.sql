-- AddForeignKey
ALTER TABLE "public"."t_post" ADD CONSTRAINT "t_post_board_idx_fkey" FOREIGN KEY ("board_idx") REFERENCES "public"."t_board"("board_idx") ON DELETE RESTRICT ON UPDATE CASCADE;
