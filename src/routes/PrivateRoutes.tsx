import { Navigate, Outlet } from "react-router-dom";

// 로그인 여부 판별하는 라우트
export default function PrivateRoutes() {
  const token = localStorage.getItem("token");
  return <>{token ? <Navigate to="/" /> : <Outlet />}</>;
}
