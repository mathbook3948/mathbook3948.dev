import AdminConfig from "@/views/admin/config/admin-config";
import getAdminCategoryList from "@/actions/category/get-admin-category-list";
import { CategoryConfig } from "@/types/config-interface";
import { AdminConfigProvider } from "@/views/admin/config/admin-config-provider";
import { redirect } from "next/navigation";

interface AdminConfigPageProps {
  searchParams: Promise<{
    tab: string;
  }>;
}

const AdminConfigPage = async ({ searchParams }: AdminConfigPageProps) => {
  const { tab } = await searchParams;

  if (!tab) {
    redirect("/admin/config?tab=category");
  }

  const categoryList: CategoryConfig[] = await getAdminCategoryList();

  return (
    <AdminConfigProvider
      value={{
        categoryList,
      }}>
      <AdminConfig tab={tab} />
    </AdminConfigProvider>
  );
};

export default AdminConfigPage;
