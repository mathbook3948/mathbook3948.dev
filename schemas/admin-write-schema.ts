import { z } from "zod";

export const AdminWriteSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 비어 있을 수 없습니다." })
    .max(200, { message: "제목은 200자를 초과할 수 없습니다." }),
  content: z
    .string()
    .regex(/^(?!\s*$).+/, { message: "내용은 비어 있을 수 없습니다." })
    .refine((val) => !/^(\s*<p>(<br>|&nbsp;|\s)*<\/p>\s*)+$/i.test(val), {
      message: "내용은 비어 있을 수 없습니다.",
    }),
});

export type AdminWriteSchemaType = z.infer<typeof AdminWriteSchema>;
