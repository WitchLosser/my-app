import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryListPage from "./compnents/admin/category/list/CategoryListPage";
import { Routes, Route } from "react-router-dom";
import CategoryCreatePage from "./compnents/admin/category/create/CategoryCreatePage";
import CategoryEditPage from "./compnents/admin/category/edit/CategoryEditPage";
import AdminLayout from "./compnents/admin/container/AdminLayout";
import AdminDashboard from "./compnents/admin/dashboard/AdminDashboard";
import HomePage from "./compnents/home/HomePage";
import DefaultLayout from "./compnents/container/DefaultLayout";
import LoginPage from "./compnents/auth/login/LoginPage";
import Loader from "./compnents/common/loader/Loader";

function App() {
  return (
    <>
      <Loader />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

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
    </>
  );
}

export default App;
