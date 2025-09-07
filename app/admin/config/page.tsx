import AdminConfig from "@/views/admin/config/admin-config";
import getAdminCategoryList from "@/actions/category/get-admin-category-list";
import { CategoryConfig } from "@/types/config-interface";
import { AdminConfigProvider } from "@/views/admin/config/admin-config-provider";
import { redirect } from "next/navigation";
import { PostWithCategory } from "@/types/post-interface";
import getAdminPosts from "@/actions/post/get-admin-posts";
import { Pagination } from "@/types/pagination-interface";

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
    if (!perPage || !page) {
      redirect("/admin/config?tab=post&perPage=10&page=1");
    }

    const res = await getAdminPosts({
      categoryIdx: Number(category),
      page: Number(page),
      perPage: Number(perPage),
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
