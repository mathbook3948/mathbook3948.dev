import AdminWrite from "@/views/admin/write/admin-write";
import getAdminPost from "@/actions/admin/post/get-admin-post";
import getAdminPostDraft from "@/actions/admin/post/get-admin-post-draft";

interface AdminWritePageProps {
  searchParams: Promise<{
    draft: string;
    post: string;
  }>;
}

const AdminWritePage = async ({ searchParams }: AdminWritePageProps) => {
  const { draft, post } = await searchParams;

  let data: any = {
    postIdx: null,
    title: "",
    content: "",
    isPublic: true,
    categoryIdx: -1,
    thumbnail: null,
  };

  if (draft) {
    const res = await getAdminPostDraft({ postDraftIdx: Number(draft) });
    data = {
      postIdx: null,
      title: res?.title ?? "",
      content: res?.content ?? "",
      isPublic: res?.isPublic ?? true,
      categoryIdx: res?.categoryIdx ?? -1,
      thumbnail: res?.thumbnail,
    };
  }

  if (post) {
    const res = await getAdminPost({ postIdx: Number(post) });
    data = {
      postIdx: res?.postIdx,
      title: res?.title ?? "",
      content: res?.content ?? "",
      isPublic: res?.isPublic ?? true,
      categoryIdx: res?.categoryIdx ?? -1,
      thumbnail: res?.thumbnail,
    };
  }

  return (
    <AdminWrite
      postIdx={data.postIdx}
      title={data.title}
      content={data.content}
      isPublic={data.isPublic}
      categoryIdx={data.categoryIdx}
      thumbnail={data.thumbnail}
    />
  );
};

export default AdminWritePage;
