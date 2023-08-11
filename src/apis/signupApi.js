import { axiosInstance } from "./axiosInstance";

export const signupBuyerApi = async (userInfo) => {
  const res = await axiosInstance.post("/accounts/signup/", userInfo);
  return res.data;
};

export const signupSellerApi = async (userInfo) => {
  const res = await axiosInstance.post("/accounts/signup_seller/", userInfo);
  return res.data;
};

export const idDuplicateCheckApi = async (id) => {
  const inputId = {
    username: id,
  };
  console.log(inputId, id);
  const res = await axiosInstance.post(
    "/accounts/signup/valid/username/",
    inputId
  );
  return res;
};

export const businessRegistrationNumApi = async (registerNum) => {
  const res = await axiosInstance.post(
    "/accounts/signup/valid/company_registration_number/",
    registerNum
  );
  return res;
};
