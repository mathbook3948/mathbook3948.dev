"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminConfigCategory from "@/views/admin/config/category/admin-config-category";
import { useRouter } from "next/navigation";
import AdminConfigPost from "@/views/admin/config/post/admin-config-post";
import AdminConfigDraft from "@/views/admin/config/draft/admin-config-draft";

interface AdminConfigProps {
  tab: string;
}

const AdminConfig = ({ tab }: AdminConfigProps) => {
  const router = useRouter();

  const handleTabChange = (value: string) => {
    router.push(`/admin/config?tab=${value}`);
  };

  return (
    <Tabs value={tab} className="w-full" onValueChange={handleTabChange}>
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="category" className="cursor-pointer">
            카테고리
          </TabsTrigger>
          <TabsTrigger value="post" className="cursor-pointer">
            게시글
          </TabsTrigger>
          <TabsTrigger value="draft" className="cursor-pointer">
            임시저장
          </TabsTrigger>
          <TabsTrigger value="advanced" className="cursor-pointer">
            고급
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="category">
        <AdminConfigCategory />
      </TabsContent>

      <TabsContent value="post">
        <AdminConfigPost />
      </TabsContent>

      <TabsContent value="draft">
        <AdminConfigDraft />
      </TabsContent>

      <TabsContent value="advanced">
        <div className="text-sm text-muted-foreground">준비 중</div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminConfig;
