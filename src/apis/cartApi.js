import { axiosInstance, privateInstance } from "./axiosInstance";
import { loadProductDetail } from "./productApi";

export const cartListApi = async () => {
  const res = await privateInstance.get("/cart/");
  const cart = res.data.results;
  const cartProudctInfoList = await Promise.all(
    cart.map(async (cartItem) => {
      return await loadProductDetail(cartItem.product_id);
    })
  );
  // Promise.all을 사용하여 콜백 함수에서 반환된 모든 promise가 resolve될때까지 기다린 후, 한번에 결과값을 반환하도록 수정
  return {
    cart: cart,
    cartProudctInfoList: cartProudctInfoList,
  };
};

export const addCart = async (productInfo) => {
  const res = await privateInstance.post("/cart/", productInfo);
  return res;
};

export const deleteCart = async (cartItemId) => {
  const res = await privateInstance.delete(`/cart/${cartItemId}`);
  return res;
};

export const deleteAllCart = async () => {
  const res = await privateInstance.delete(`/cart/`);
  return res;
};
export const updateQuantity = async (cartItemId, req) => {
  const res = await privateInstance.put(`/cart/${cartItemId}/`, req);
  return res;
};
