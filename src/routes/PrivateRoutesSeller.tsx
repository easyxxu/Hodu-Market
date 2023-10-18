import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateRoutesSeller() {
  const userType = localStorage.getItem("user_type");
  const notify = () => {
    toast.info("판매자만 접근 가능합니다.", {
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

  if (userType !== "SELLER" || userType === null) {
    notify();
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }

  return <Outlet />;
}
