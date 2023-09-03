import { axiosInstance } from "./axiosInstance";

// 회원가입
export const signupBuyerApi = async (buyerInfo) => {
  const res = await axiosInstance.post("/accounts/signup/", buyerInfo);
  return res.data;
};

export const signupSellerApi = async (sellerInfo) => {
  const res = await axiosInstance.post("/accounts/signup_seller/", sellerInfo);
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

export const companyRegistrationNumApi = async (registerNum) => {
  const inputRegisterNum = { company_registration_number: registerNum };
  const res = await axiosInstance.post(
    "/accounts/signup/valid/company_registration_number/",
    inputRegisterNum
  );
  return res;
};

// 로그인
export const loginApi = async (userInfo) => {
  const res = await axiosInstance.post("/accounts/login/", userInfo);
  return res;
};

export const logoutApi = async () => {
  const res = await axiosInstance.post("/accounts/logout/");
  return res;
};
