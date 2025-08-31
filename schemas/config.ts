import { z } from "zod";

const AdminConfigCategorySchema = z.object({
  name: z.string().min(2, "").max(20, { error: "" }),
});
