import { axiosInstance } from "./axiosInstance";

// 회원가입
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

// 로그인
export const loginApi = async (userInfo) => {
  const res = await axiosInstance.post("/accounts/login/", userInfo);
  return res;
};
