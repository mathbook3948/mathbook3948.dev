import { z } from "zod";

export const AdminLoginSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, { message: "아이디를 입력하세요." })
    .max(50, { message: "아이디는 50자 이하이어야 합니다." }),

  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 4자 이상이어야 합니다." })
    .max(100, { message: "비밀번호는 50자 이하이어야 합니다." }),
});

export type AdminLoginSchemaType = z.infer<typeof AdminLoginSchema>;
