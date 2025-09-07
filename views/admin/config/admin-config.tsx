"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminConfigCategory from "@/views/admin/config/admin-config-category";
import { useRouter } from "next/navigation";
import AdminConfigPost from "@/views/admin/config/admin-config-post";
import LoadingPlaceholder from "@/views/shared/loading";

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
          <TabsTrigger value="category">카테고리</TabsTrigger>
          <TabsTrigger value="post">게시글</TabsTrigger>
          <TabsTrigger value="advanced">고급</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="category">
        {tab === "category" ? <AdminConfigCategory /> : <LoadingPlaceholder />}
      </TabsContent>

      <TabsContent value="post">
        {tab === "post" ? <AdminConfigPost /> : <LoadingPlaceholder />}
      </TabsContent>

      <TabsContent value="advanced">
        <div className="text-sm text-muted-foreground">준비 중</div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminConfig;
