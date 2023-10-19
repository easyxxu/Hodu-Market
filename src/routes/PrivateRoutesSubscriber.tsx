import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateRouetsSubscriber() {
  const userType = localStorage.getItem("user_type");
  const notify = () => {
    toast.info("로그인이 필요합니다.", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  if (!userType) {
    notify();
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
