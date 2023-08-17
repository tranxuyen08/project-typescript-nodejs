import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "../components/CreateProduct/CreateProduct";
import DefaultLayout from "../layouts/defaultLayout";
import ProductManager from "../components/ProductManager/ProductManager";
import Users from "../components/UserManager/UserManager";
import LoginAdmin from "../components/Login/LoginAdmin";
import NotFound from "../pages/NotFound/NotFound";
import RequiredAdmin from "../components/RequireAdmin/RequireAdmin";
const Router = () => {
  return (
    <Routes>
      <Route path="/Login"  element={<LoginAdmin />} />
      <Route element={<RequiredAdmin />}>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Users />
          </DefaultLayout>
        }
      />
      <Route
        path="/products-manager"
        element={
          <DefaultLayout>
            <ProductManager />
          </DefaultLayout>
        }
      />
      <Route
        path="/create-product"
        element={
          <DefaultLayout>
            <CreateProduct />
          </DefaultLayout>
        }
      />
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default Router;
