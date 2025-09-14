import getAdminPost from "@/actions/admin/post/get-admin-post";
import { redirect } from "next/navigation";
import AdminRead from "@/views/admin/read/admin-read";

interface AdminReadPageProps {
  searchParams: Promise<{
    post: string;
  }>;
}

const AdminReadPage = async ({ searchParams }: AdminReadPageProps) => {
  const { post } = await searchParams;

  if (!post) redirect("/admin/config?tab=post");

  const postData = await getAdminPost({ postIdx: Number(post) });

  //TODO 404? 페이지로 변경 필요
  if (!postData) redirect("/admin/config?tab=post");

  return <AdminRead post={postData} />;
};

export default AdminReadPage;
