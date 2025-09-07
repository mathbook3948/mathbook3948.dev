import AdminConfig from "@/views/admin/config/admin-config";
import getAdminCategoryList from "@/actions/category/get-admin-category-list";
import { CategoryConfig } from "@/types/config-interface";
import { AdminConfigProvider } from "@/views/admin/config/admin-config-provider";
import { PostWithCategory } from "@/types/post-interface";
import getAdminPosts from "@/actions/post/get-admin-posts";
import { Pagination } from "@/types/pagination-interface";
import { redirect } from "next/navigation";

interface AdminConfigPageProps {
  searchParams: Promise<{
    tab: string;
    category?: string;
    perPage?: string;
    page?: string;
  }>;
}

const AdminConfigPage = async ({ searchParams }: AdminConfigPageProps) => {
  const { tab, category, perPage, page } = await searchParams;

  if (!tab) {
    redirect("/admin/config?tab=category");
  }

  let categoryList: CategoryConfig[] = [];
  let postList: PostWithCategory[] = [];
  let pagination: Pagination | undefined = undefined;

  if (tab === "category") {
    categoryList = await getAdminCategoryList();
  } else if (tab === "post") {
    const res = await getAdminPosts({
      categoryIdx: Number(category),
      page: Number(page ?? 1),
      perPage: Number(perPage ?? 10),
    });

    postList = res.items;
    pagination = res.pagination;
  }

  return (
    <AdminConfigProvider
      value={{
        categoryList,
        postList,
        pagination,
      }}>
      <AdminConfig tab={tab} />
    </AdminConfigProvider>
  );
};

export default AdminConfigPage;
