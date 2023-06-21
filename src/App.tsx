import React, { useEffect, useState } from "react";
import "./App.css";
import CategoryListPage from "./compnents/category/list/CategoryListPage";
import { Routes, Route } from "react-router-dom";
import CategoryCreatePage from "./compnents/category/create/CategoryCreatePage";
import CategoryEditPage from "./compnents/category/edit/CetegoryEditPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<CategoryListPage />} />
          <Route path="category/create" element={<CategoryCreatePage />} />
          <Route path="category/edit/:id" element={<CategoryEditPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
