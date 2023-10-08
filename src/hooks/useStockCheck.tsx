import axios from "axios";
import { loadProductDetail } from "../apis/productApi";

export default function useStockCheck() {
  const stockCheck = (stock: number, quantity: number) => {
    // console.log("재고:", stock, "주문수량:", quantity);
    if (stock < quantity) {
      return false;
    } else {
      return true;
    }
  };

  const getStock = async (productId: number) => {
    try {
      const res = await loadProductDetail(productId);
      return res.data.stock;
    } catch (err) {
      if (axios.isAxiosError(err)) console.error(err.response);
    }
  };

  return { getStock, stockCheck };
}
