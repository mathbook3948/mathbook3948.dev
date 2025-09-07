"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminLoginSchema, AdminLoginSchemaType } from "@/schemas/admin-login-schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import adminLogin from "@/actions/auth/admin-login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AdminLoginProps {
  title: string;
}

const AdminLogin = ({ title }: AdminLoginProps) => {
  const router = useRouter();

  const form = useForm<AdminLoginSchemaType>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginSchemaType) => {
    const res = await adminLogin(data);

    if (res) {
      toast.success("로그인에 성공했습니다.");
      router.push("/admin/config");
    } else {
      toast.error("로그인에 실패했습니다. 정보를 확인해주세요.");
    }
  };

  return (
    <div className="h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-sm p-6">
        <h1 className="mb-6 text-center text-xl font-semibold">{title} 관리자 로그인</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="아이디" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2 w-full">
              로그인
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
