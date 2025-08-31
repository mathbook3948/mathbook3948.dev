import AdminConfig from "@/views/admin/config/admin-config";
import getAdminCategoryList from "@/actions/category/get-admin-category-list";
import { CategoryConfig } from "@/types/config-interface";
import { AdminConfigProvider } from "@/views/admin/config/admin-config-provider";

const AdminConfigPage = async () => {
  const categoryList: CategoryConfig[] = await getAdminCategoryList();

  return (
    <AdminConfigProvider
      value={{
        categoryList,
      }}>
      <AdminConfig />
    </AdminConfigProvider>
  );
};

export default AdminConfigPage;
