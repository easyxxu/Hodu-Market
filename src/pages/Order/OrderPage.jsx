import React from "react";
import OrderList from "../../components/Order/OrderList";
import Payment from "../../components/Order/Payment";

export default function OrderPage() {
  return (
    <div>
      <OrderList />
      <Payment />
    </div>
  );
}
