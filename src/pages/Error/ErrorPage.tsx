import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ErrorIcon from "../../assets/svg/icon-404.svg";
import { Button } from "../../components/common/Button/Button";
export default function ErrorPage() {
  const navigate = useNavigate();
  const handleGoMain = () => {
    navigate("/");
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <ErrorContainer>
      <img src={ErrorIcon} alt="에러이미지" />
      <ErrorMsg>
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
          <br />웹 주소가 올바른지 확인해 주세요.
        </p>
        <ButtonContainer>
          <Button
            type="button"
            size="large"
            color="point"
            $customStyle={{ width: "200px" }}
            children="메인으로"
            onClick={handleGoMain}
          />
          <Button
            type="button"
            size="large"
            color="white"
            $customStyle={{ width: "200px" }}
            children="이전 페이지"
            onClick={handleGoBack}
          />
        </ButtonContainer>
      </ErrorMsg>
    </ErrorContainer>
  );
}
const ErrorContainer = styled.div`
  display: flex;
  gap: 50px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 98px);
`;
const ErrorMsg = styled.div`
  h2 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 40px;
    color: var(--content-color-dark);
    font-size: 16px;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 14px;
`;
