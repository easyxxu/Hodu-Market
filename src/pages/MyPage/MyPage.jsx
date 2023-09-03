import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { logoutApi } from "../../apis/authApi";
import { Button } from "../../components/common/Button/Button";
import { MainLayout } from "../../components/Layout/Layout";
export default function MyPage() {
  const userType = localStorage.getItem("user_type");
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const res = await logoutApi();
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("recoil-persist");
      console.log(res);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <MainLayout type={userType}>
      <LogoutContainer>
        <Button
          content="로그아웃"
          onClick={logout}
          width="300px"
          color="white"
          fontSize="L"
        />
      </LogoutContainer>
    </MainLayout>
  );
}

const LogoutContainer = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 100px;
`;
