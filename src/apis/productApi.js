import { axiosInstance, privateInstance } from "./axiosInstance";

export const loadAllProduct = async () => {
  const res = await axiosInstance.get("/products/?page=1");
  return res.data;
};

export const loadSellerProduct = async () => {
  const res = await axiosInstance.get("/seller/");
  return res.data;
};

export const loadProductDetail = async (productId) => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res;
};

export const productAddApi = async (product) => {
  const res = await privateInstance.post("/products/", product);
  return res;
};
