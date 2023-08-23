import React from "react";
import { SellerMainLayout } from "../../components/Layout/Layout";
import SellerDashboard from "../../components/Seller/SellerDashboard";

export default function SellerDashBoardPage() {
  return (
    <SellerMainLayout>
      <SellerDashboard />
    </SellerMainLayout>
  );
}
