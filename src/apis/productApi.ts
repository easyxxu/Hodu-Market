import {
  axiosInstance,
  imgPrivateInstance,
  privateInstance,
} from "./axiosInstance";

export const loadAllProduct = async (page: number) => {
  const res = await axiosInstance.get(`/products/?page=${page}`);
  return res;
};

export const loadSellerProduct = async () => {
  const res = await privateInstance.get("/seller/");
  return res;
};

export const loadProductDetail = async (productId: number) => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res;
};

export const productAddApi = async (productForm: {}) => {
  const res = await imgPrivateInstance.post("/products/", productForm);
  return res;
};

export const productModifyApi = async (productId: number, productForm: {}) => {
  const res = await imgPrivateInstance.put(
    `/products/${productId}/`,
    productForm
  );
  return res;
};

export const productDeleteApi = async (productId: number) => {
  const res = await privateInstance.delete(`/products/${productId}`);
  return res;
};

export const productSearch = async (page: number, searchKeyword: string) => {
  const res = await axiosInstance.get(
    `/products/?page=${page}&search=${searchKeyword}`
  );
  return res;
};
