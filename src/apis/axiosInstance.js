import axios from "axios";

const BASE_URL = "https://openmarket.weniv.co.kr";
// 기본 인스턴스
export const axiosInstance = axios.create({
  baseUrl: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const authInstance = axios.create({
  baseUrl: BASE_URL,
  headers: {
    Authorization: `JWT ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
