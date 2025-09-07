import AdminLogin from "@/views/admin/login/admin-login";
import getAppTitle from "@/actions/common/get-app-title";

const AdminLoginPage = async () => {
  const title = await getAppTitle();

  return <AdminLogin title={title} />;
};

export default AdminLoginPage;
