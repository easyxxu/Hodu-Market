import { privateInstance } from "./axiosInstance";

export const loadOrderList = async () => {
  const res = await privateInstance.get("/order/");
  return res;
};

export const orderDirect = async (orderForm) => {
  const res = await privateInstance.post("/order/", orderForm);
  return res;
};

export const orderCart = async (orderForm) => {
  const res = await privateInstance.post("/order/", orderForm);
  return res;
};

export const orderCartOne = async (orderForm) => {
  const res = await privateInstance.post("/order/", orderForm);
  return res;
};
