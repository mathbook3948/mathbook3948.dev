import AdminConfig from "@/views/admin/config/admin-config";
import getAdminCategoryList from "@/actions/category/get-admin-category-list";
import { CategoryConfig } from "@/types/config-interface";
import { AdminConfigProvider } from "@/views/admin/config/admin-config-provider";
import { PostWithCategory } from "@/types/post-interface";
import getAdminPosts from "@/actions/post/get-admin-posts";
import { GridData, Pagination } from "@/types/pagination-interface";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PostDraftWithCategory } from "@/types/post-draft-interface";
import getAdminPostDrafts from "@/actions/post/get-admin-post-drafts";

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

  let categoryListPromise: Promise<CategoryConfig[]> | undefined = undefined;
  let postPromise: Promise<GridData<PostWithCategory>> | undefined = undefined;
  let postDraftPromise: Promise<GridData<PostDraftWithCategory>> | undefined = undefined;

  if (tab === "category") {
    categoryListPromise = getAdminCategoryList();
  } else if (tab === "post") {
    postPromise = getAdminPosts({
      categoryIdx: Number(category),
      page: Number(page ?? 1),
      perPage: Number(perPage ?? 10),
    });
  } else if (tab === "draft") {
    postDraftPromise = getAdminPostDrafts({
      categoryIdx: Number(category),
      page: Number(page ?? 1),
      perPage: Number(perPage ?? 10),
    });
  }

  return (
    <Suspense fallback={<AdminConfigSuspense tab={tab} />}>
      <AdminConfigContent
        tab={tab}
        categoryListPromise={categoryListPromise}
        postPromise={postPromise}
        postDraftPromise={postDraftPromise}
      />
    </Suspense>
  );
};

interface AdminConfigContentProps {
  tab: string;
  categoryListPromise?: Promise<CategoryConfig[]>;
  postPromise?: Promise<GridData<PostWithCategory>>;
  postDraftPromise?: Promise<GridData<PostDraftWithCategory>>;
}

const AdminConfigContent = async ({
  tab,
  categoryListPromise,
  postPromise,
  postDraftPromise,
}: AdminConfigContentProps) => {
  let pagination: Pagination | undefined = undefined;

  const categoryList: CategoryConfig[] = (await categoryListPromise) ?? [];

  const _post = await postPromise;

  const postList: PostWithCategory[] = _post?.items ?? [];
  if (tab == "post") pagination = _post?.pagination ?? undefined;

  const _postDraft = await postDraftPromise;

  const draftList: PostDraftWithCategory[] = _postDraft?.items ?? [];
  if (tab == "draft") pagination = _postDraft?.pagination ?? undefined;

  return (
    <AdminConfigProvider
      value={{
        categoryList,
        postList,
        draftList,
        pagination,
      }}>
      <AdminConfig tab={tab} />
    </AdminConfigProvider>
  );
};

interface AdminConfigSuspenseProps {
  tab: string;
}

const AdminConfigSuspense = ({ tab }: AdminConfigSuspenseProps) => {
  let render = null;

  switch (tab) {
    case "category": {
      render = (
        <>
          <Skeleton className="h-9 w-40" />
          <div className="flex flex-row items-center justify-end mb-2 gap-2">
            <Skeleton className="h-9 w-18 px-4 py-2 has-[>svg]:px-3" />
            <Skeleton className="h-9 w-14 px-4 py-2 has-[>svg]:px-3" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </>
      );

      break;
    }
    case "post":
      render = (
        <>
          <div className="flex flex-row justify-between items-center gap-4 mt-4">
            <div></div>
            <Skeleton className="h-9 w-24 px-4 py-2 has-[>svg]:px-3" />
          </div>
          <Skeleton className="h-[24rem] w-full" />
          <div className="flex flex-row gap-2 justify-center">
            <Skeleton className="h-9 w-18 px-4 py-2 has-[>svg]:px-3" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-18 px-4 py-2 has-[>svg]:px-3" />
          </div>
        </>
      );

      break;
    case "draft":
      render = (
        <>
          <div className="flex flex-row justify-between items-center gap-4 mt-4">
            <div></div>
            <Skeleton className="h-9 w-24 px-4 py-2 has-[>svg]:px-3" />
          </div>
          <Skeleton className="h-[24rem] w-full" />
          <div className="flex flex-row gap-2 justify-center">
            <Skeleton className="h-9 w-18 px-4 py-2 has-[>svg]:px-3" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-18 px-4 py-2 has-[>svg]:px-3" />
          </div>
        </>
      );

      break;
  }

  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-9 w-60" />
      {render}
    </div>
  );
};

export default AdminConfigPage;
