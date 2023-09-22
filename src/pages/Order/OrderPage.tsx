import React from "react";
import { MainLayout } from "../../components/Layout/Layout";
import OrderList from "../../components/Order/OrderList";
import Payment from "../../components/Order/Payment";

export default function OrderPage() {
  const userType = localStorage.getItem("user_type");
  return (
    <MainLayout type={userType}>
      <OrderList />
      <Payment />
    </MainLayout>
  );
}
