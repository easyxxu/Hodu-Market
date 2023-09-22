import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { logoutApi } from "../../apis/authApi";
import { Button } from "../../components/common/Button/Button";
import { MainLayout } from "../../components/Layout/Layout";
import OrderList from "../../components/MyPage/OrderList";
import Welcome from "../../components/MyPage/Welcome";
export default function MyPage() {
  const userType = localStorage.getItem("user_type");
  const navigate = useNavigate();
  const [view, setView] = useState("welcome");
  const handleLogout = async () => {
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
  const handleOrderLookUp = () => {
    setView("order-lookup");
  };

  return (
    <MainLayout type={userType}>
      <MyPageTitle>마이페이지</MyPageTitle>
      <MyPageContainer>
        {userType === "BUYER" && (
          <MyPageMenu>
            <OrderMenu>
              <h3>주문관리</h3>
              <ul>
                <li onClick={handleOrderLookUp}>주문 조회</li>
                <li>관심 상품</li>
                <li>쿠폰 조회</li>
                <li>적립금 내역</li>
              </ul>
            </OrderMenu>
            <h3>
              <Button
                type="button"
                content="로그아웃"
                onClick={handleLogout}
                width="150px"
                color="white"
                fontSize="M"
              />
            </h3>
          </MyPageMenu>
        )}

        <MyPageContent center={userType === "SELLER" ? "true" : "false"}>
          {view === "welcome" && <Welcome />}
          {view === "order-lookup" && <OrderList />}
          {userType === "SELLER" && (
            <>
              <Button
                type="button"
                content="로그아웃"
                onClick={handleLogout}
                width="150px"
                color="white"
                fontSize="M"
              />
            </>
          )}
        </MyPageContent>
      </MyPageContainer>
    </MainLayout>
  );
}

const MyPageTitle = styled.h2`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  margin: 30px 0;
`;
const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-bottom: 300px;
`;
const MyPageMenu = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex: 2;
  h3 {
    font-size: 24px;
  }
  ul {
    margin: 20px 0;
  }
  li {
    font-size: 20px;
    color: var(--content-color-dark);
    margin-bottom: 20px;
    cursor: pointer;
  }
`;
const OrderMenu = styled.div`
  h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--content-color-dark);
  }
`;
const MyPageContent = styled.div<{ center: string }>`
  flex: 8;
  ${(props) =>
    props.center === "true" &&
    css`
      flex: inherit;
      button {
        margin: 50px auto;
      }
    `}
`;