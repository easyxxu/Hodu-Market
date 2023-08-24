import { privateInstance } from "./axiosInstance";
import { loadProductDetail } from "./productApi";

export const cartList = async () => {
  const res = await privateInstance.get("/cart/");
  const cart = res.data.results;
  const cartProudctInfoList = await Promise.all(
    cart.map(async (cartItem) => {
      return await loadProductDetail(cartItem.product_id);
    })
  );
  // Promise.all을 사용하여 콜백 함수에서 반환된 모든 promise가 resolve될때까지 기다린 후, 한번에 결과값을 반환하도록 수정
  return cartProudctInfoList;
};

export const addCart = async (productInfo) => {
  const res = await privateInstance.post("/cart/", productInfo);
  return res;
};
