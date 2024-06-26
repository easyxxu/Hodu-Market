import { Outlet, useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { modalsList } from "../../components/common/Modal/Modals";
import { media } from "../../components/style/media";
import useModal from "../../hooks/useModal";
export default function MyPage() {
  const userType = localStorage.getItem("user_type");
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleNoFeature = () => {
    openModal(modalsList.noFeature);
  };

  const handleOrderLookUp = () => {
    navigate("/mypage/order");
  };

  return (
    <>
      <MyPageTitle>마이페이지</MyPageTitle>
      <MyPageContainer>
        {userType === "BUYER" && (
          <MyPageMenu>
            <OrderMenu>
              <h3>주문관리</h3>
              <ul>
                <li onClick={handleOrderLookUp}>주문 조회</li>
                <li onClick={handleNoFeature}>관심 상품</li>
                <li onClick={handleNoFeature}>쿠폰 조회</li>
                <li onClick={handleNoFeature}>적립금 내역</li>
              </ul>
            </OrderMenu>
          </MyPageMenu>
        )}
        <MyPageContent center={userType === "SELLER" ? "true" : "false"}>
          <Outlet />
        </MyPageContent>
      </MyPageContainer>
    </>
  );
}

const MyPageTitle = styled.h2`
  font-size: 2em;
  font-weight: 500;
  text-align: center;
  margin: 30px 0;
  ${media.Small`
      margin-bottom: 10px;
  `}
`;
const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 0 20px 300px;
  ${media.Small`
    flex-direction: column;
    font-size: 0.7rem;
    gap: 15px;
    padding-right: 0;
    padding-left: 0;
  `}
`;
const MyPageMenu = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  ${media.Small`
    justify-content: center;
  `}
  h3 {
    font-size: 1.5em;
    button {
      ${media.Small`
        font-size: 0.8em;
        width: 100px;
    `}
    }
  }
  ul {
    margin: 20px 0;
    ${media.Small`
      display:flex;
      gap: 10px;
  `}
  }
  li {
    font-size: 1.25em;
    color: var(--content-color-dark);
    margin-bottom: 20px;
    cursor: pointer;
    ${media.Small`
      margin-bottom: 0;
    `}
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
