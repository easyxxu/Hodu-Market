import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { loginApi } from "../../apis/authApi";
import { Button } from "../common/Button/Button";
export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    login_type: "BUYER",
  });
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  // const [idErrorMsg, setIdErrorMsg] = useState("");
  // const [pwErrorMsg, setPwErrorMsg] = useState("");
  // const [idValid, setIdValid] = useState(false);
  // const [pwValid, setPwValid] = useState(false);
  // const [loginValid, setLoginValid] = useState(false);
  const navigate = useNavigate();

  // 로그인 타입 설정
  const handleLoginTypeChange = (e) => {
    if (e.target.name === "buyer") {
      setLoginInfo({ ...loginInfo, login_type: "BUYER" });
    } else if (e.target.name === "seller") {
      setLoginInfo({ ...loginInfo, login_type: "SELLER" });
    }
  };
  const handleInputChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const idCheck = (e) => {
    if (e.target.value.length < 1) {
      setLoginErrorMsg("아이디를 입력해주세요.");
    } else {
      setLoginErrorMsg("");
      // setIdValid(true);
    }
  };
  const pwCheck = (e) => {
    if (e.target.value.length < 1) {
      setLoginErrorMsg("비밀번호를 입력해주세요.");
    } else {
      setLoginErrorMsg("");
      // setPwValid(true);
    }
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    if (loginInfo.username.length < 1 && loginInfo.password.length < 1) {
      setLoginErrorMsg("아이디와 비밀번호를 입력해주세요.");
    } else {
      setLoginErrorMsg("");
    }
    try {
      const res = await loginApi(loginInfo);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_type", res.data.user_type);
      console.log("로그인 성공!", res);
      navigate("/");
    } catch (err) {
      console.error("로그인 에러", err);
    }
  };
  console.log("loginInfo: ", loginInfo);
  return (
    <LoginContainer>
      <h1 className="a11y-hidden">로그인</h1>
      <LoginTypeBtn>
        <BuyerLoginBtn
          name="buyer"
          onClick={handleLoginTypeChange}
          type={loginInfo.login_type === "BUYER" ? "active" : null}
        >
          구매회원 로그인
        </BuyerLoginBtn>
        <SellerLoginBtn
          name="seller"
          onClick={handleLoginTypeChange}
          type={loginInfo.login_type === "SELLER" ? "active" : null}
        >
          판매회원 로그인
        </SellerLoginBtn>
      </LoginTypeBtn>
      <LoginFormContainer onSubmit={loginSubmit}>
        <label htmlFor="Id" className="a11y-hidden" />
        <input
          type="text"
          id="Id"
          name="username"
          onChange={handleInputChange}
          onBlur={idCheck}
          placeholder="아이디"
        />
        <label htmlFor="password" className="a11y-hidden" />
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleInputChange}
          onBlur={pwCheck}
          placeholder="비밀번호"
        />
        <ErrorMsg>{loginErrorMsg}</ErrorMsg>
        <Button
          size="M"
          width="M"
          color="white"
          fontSize="M"
          fontWeight="bold"
          content="로그인"
        />
      </LoginFormContainer>
      <LoginLinkContainer>
        <Link to="/join">회원가입</Link>
        <a href="/">비밀번호 찾기</a>
      </LoginLinkContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  max-width: 550px;
  margin: 50px auto;
  border-radius: 10px;
`;
const LoginTypeBtn = styled.div`
  display: flex;
  button {
    width: 275px;
    font-size: 18px;
    padding: 20px 76px 38px;
  }
`;
const BuyerLoginBtn = styled.button`
  ${(props) =>
    props.type === "active"
      ? css`
          z-index: 2;
          background-color: #fff;
          border-top: 1px solid #c4c4c4;
          border-left: 1px solid #c4c4c4;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        `
      : css`
          background-color: #f2f2f2;
          border: 1px solid #c4c4c4;
          border-radius: 10px;
        `}
`;
const SellerLoginBtn = styled.button`
  ${(props) =>
    props.type === "active"
      ? css`
          z-index: 2;
          background-color: #fff;
          border-top: 1px solid #c4c4c4;
          border-right: 1px solid #c4c4c4;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        `
      : css`
          background-color: #f2f2f2;
          border: 1px solid #c4c4c4;
          border-radius: 10px;
        `}
`;
const LoginFormContainer = styled.form`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #c4c4c4;
  padding: 34px 35px 36px;
  border-radius: 10px;
  transform: translateY(-20px);
  position: relative;
  z-index: 1;
  margin-bottom: 30px;
  input {
    width: 480px;
    border-bottom: 1px solid #ccc;
    padding: 20px 0;
    &:focus {
      border-bottom: 1px solid #21bf48;
    }
  }
  input:first-of-type {
    margin-bottom: 6px;
  }
  button {
    margin-top: 36px;
  }
`;
const LoginLinkContainer = styled.div`
  text-align: center;
  position: relative;
  a {
    color: #333;
  }
  a:first-of-type {
    margin-right: 33px;
    &::after {
      content: "|";
      position: absolute;
      transform: translate(14px, 0);
    }
  }
`;
const ErrorMsg = styled.small`
  color: var(--price-point-color);
  align-self: flex-start;
  margin-top: 26px;
`;
