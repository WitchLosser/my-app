import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./compnents/admin/container/AdminLayout";
import AdminDashboard from "./compnents/admin/dashboard/AdminDashboard";
import CategoryListPage from "./compnents/admin/category/list/CategoryListPage";
import CategoryCreatePage from "./compnents/admin/category/create/CategoryCreatePage";
import CategoryEditPage from "./compnents/admin/category/edit/CategoryEditPage";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path={"/admin"} element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="category">
          <Route index element={<CategoryListPage />} />
          <Route path="create" element={<CategoryCreatePage />} />
          <Route path="edit">
            <Route path=":id" element={<CategoryEditPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};