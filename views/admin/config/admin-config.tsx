"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminConfigCategory from "@/views/admin/config/admin-config-category";

const AdminConfig = () => {
  return (
    <Tabs defaultValue="category" className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="category">카테고리</TabsTrigger>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="advanced">고급</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="category">
        <AdminConfigCategory />
      </TabsContent>

      <TabsContent value="general">
        <div className="text-sm text-muted-foreground">준비 중</div>
      </TabsContent>

      <TabsContent value="advanced">
        <div className="text-sm text-muted-foreground">준비 중</div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminConfig;
