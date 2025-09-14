import getAdminCategoryList from "@/actions/admin/category/get-admin-category-list";

const TestPage = async () => {
  const res = await getAdminCategoryList();

  return <div>{JSON.stringify(res)}</div>;
};

export default TestPage;
