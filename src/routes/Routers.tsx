import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "../pages/Join/JoinPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/LoginPage";
import SellerDashBoardPage from "../pages/Seller/SellerDashBoardPage";
import ProductAddPage from "../pages/Seller/ProductAddPage";
import Cart from "../pages/Cart/Cart";
import OrderPage from "../pages/Order/OrderPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import MyPage from "../pages/MyPage/MyPage";
import SearchResultPage from "../pages/Search/SearchResultPage";
import OrderList from "../components/MyPage/OrderList";
import Welcome from "../components/MyPage/Welcome";
import OrderDetail from "../components/MyPage/OrderDetail";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutesSeller from "./PrivateRoutesSeller";
import ErrorPage from "../pages/Error/ErrorPage";
import PrivateRoutesBuyer from "./PrivateRoutesBuyer";
import PrivateRouetsSubscriber from "./PrivateRoutesSubscriber";
export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:searchKeyword" element={<SearchResultPage />} />
      <Route path="/detail/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route element={<PublicRoutes />}>
        <Route index path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoutesBuyer />}>
        <Route path="/order" element={<OrderPage />} />
      </Route>
      <Route element={<PrivateRouetsSubscriber />}>
        <Route path="/mypage" element={<MyPage />}>
          <Route index element={<Welcome />} />
          <Route element={<PrivateRoutesBuyer />}>
            <Route path="order" element={<OrderList />} />
            <Route path=":orderId" element={<OrderDetail />} />
          </Route>
        </Route>
      </Route>
      <Route element={<PrivateRoutesSeller />}>
        <Route path="/sellercenter">
          <Route index element={<SellerDashBoardPage />} />
          <Route path="addproduct" element={<ProductAddPage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
