import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "../pages/Join/Join";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SellerDashBoardPage from "../pages/Seller/SellerDashBoardPage";
import ProductAddPage from "../pages/Seller/ProductAddPage";
import ShoppingCart from "../pages/Cart/Cart";
import OrderPage from "../pages/Order/OrderPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import MyPage from "../pages/MyPage/MyPage";
export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join" element={<Join />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/product/detail/:productId"
        element={<ProductDetailPage />}
      />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/sellercenter">
        <Route index element={<SellerDashBoardPage />} />
        <Route path="addproduct" element={<ProductAddPage />} />
      </Route>
    </Routes>
  );
}
