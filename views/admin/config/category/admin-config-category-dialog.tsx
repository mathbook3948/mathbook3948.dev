"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import registAdminCategory from "@/actions/admin/category/regist-admin-category";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Schema = z.object({
  name: z
    .string()
    .min(2, { message: "카테고리명은 최소 2자 이상 입력해야 합니다." })
    .max(20, { message: "카테고리명은 최대 20자까지 가능합니다." }),
});

type SchemaType = z.infer<typeof Schema>;

const AdminConfigCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (value: SchemaType) => {
    await registAdminCategory(value);
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex flex-row gap-2 cursor-pointer">
          <Plus />
          추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>카테고리 추가</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="예: 공지사항"
                      maxLength={20}
                      autoFocus
                      onChange={(e) => field.onChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && form.formState.isValid) {
                          e.preventDefault();
                          form.handleSubmit(handleSubmit)();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  취소
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}>
                저장
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminConfigCategoryDialog;
