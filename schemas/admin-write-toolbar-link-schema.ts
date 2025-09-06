import { z } from "zod";

export const AdminWriteToolbarLinkSchema = z.object({
  href: z
    .string()
    .trim()
    .min(1, { message: "URL을 입력하세요." })
    .regex(/^https?:\/\/[^\s/$.?#].[^\s]*$/, "http 또는 https URL만 허용됩니다"),
  target: z.string().trim().min(1),
});

export type AdminWriteToolbarLinkSchemaType = z.infer<typeof AdminWriteToolbarLinkSchema>;
