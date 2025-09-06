import { z } from "zod";

export const AdminWriteSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 비어 있을 수 없습니다." })
    .max(200, { message: "제목은 200자를 초과할 수 없습니다." }),
  content: z.string(),
});

export type AdminWriteSchemaType = z.infer<typeof AdminWriteSchema>;
