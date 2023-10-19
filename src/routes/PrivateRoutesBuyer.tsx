import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateRoutesBuyer() {
  const userType = localStorage.getItem("user_type");
  const notify = () => {
    toast.info("구매자만 접근할 수 있습니다.", {
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

  if (userType !== "BUYER" || userType === null) {
    notify();
    return <Navigate to="/" />;
  }
  return <Outlet />;
}
