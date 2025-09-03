"use client";

import { UseFormReturn } from "react-hook-form";
import { AdminWriteSchemaType } from "@/schemas/admin-write-schema";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface AdminWriteTitleProps {
  form: UseFormReturn<AdminWriteSchemaType>;
}

const AdminWriteTitle = ({ form }: AdminWriteTitleProps) => {
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <input
              className="min-w-0 truncate focus:truncate-0 text-4xl font-bold placeholder-muted-foreground outline-none"
              placeholder="제목을 입력하세요..."
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AdminWriteTitle;
