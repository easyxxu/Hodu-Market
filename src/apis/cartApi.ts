import { privateInstance } from "./axiosInstance";
import { loadProductDetail } from "./productApi";

export const cartListApi = async () => {
  const res = await privateInstance.get("/cart/");
  const cartInfoList = res.data.results;
  const cartProuductInfoList = await Promise.all(
    cartInfoList.map(async (cartItem: { product_id: number }) => {
      return await loadProductDetail(cartItem.product_id);
    })
  );
  // Promise.all을 사용하여 콜백 함수에서 반환된 모든 promise가 resolve될때까지 기다린 후, 한번에 결과값을 반환하도록 수정
  return {
    cartInfoList,
    cartProuductInfoList,
  };
};

export const addCartApi = async (productInfo: {}) => {
  const res = await privateInstance.post("/cart/", productInfo);
  return res;
};

export const deleteCartApi = async (cartItemId: number) => {
  const res = await privateInstance.delete(`/cart/${cartItemId}`);
  return res;
};

export const deleteAllCartApi = async () => {
  const res = await privateInstance.delete(`/cart/`);
  return res;
};

export const updateQuantityApi = async (cartItemId: number, req: {}) => {
  const res = await privateInstance.put(`/cart/${cartItemId}/`, req);
  return res;
};
