import User from "@/views/user/user";
import { redirect } from "next/navigation";
import { PostWithCategory } from "@/types/post-interface";
import getUserPosts from "@/actions/user/post/get-user-posts";
import { Pagination } from "@/types/pagination-interface";

interface UserPageProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

const UserPage = async ({ searchParams }: UserPageProps) => {
  const { tab } = await searchParams;

  if (!tab) redirect("?tab=latest");

  let latestPostList: PostWithCategory[] = [];
  let pagination: Pagination | undefined = undefined;

  if (tab === "latest") {
    const res = await getUserPosts({
      page: 1,
      perPage: 10,
    });

    latestPostList = res?.items ?? [];
    pagination = res?.pagination ?? undefined;
  }

  return <User tab={tab} latestPostList={latestPostList} pagination={pagination} />;
};

export default UserPage;
