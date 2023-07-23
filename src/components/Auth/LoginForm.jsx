import React from "react";
import styled from "styled-components";
export default function LoginForm() {
  return (
    <LoginContainer>
      <h1 className="a11y-hidden">로그인</h1>
      <LoginTypeBtn>
        <BuyerLoginBtn>구매회원 로그인</BuyerLoginBtn>
        <SellerLoginBtn>판매회원 로그인</SellerLoginBtn>
      </LoginTypeBtn>
      <LoginFormContainer>
        <label htmlFor="Id" className="a11y-hidden" />
        <input type="text" id="Id" placeholder="아이디" />
        <label htmlFor="password" className="a11y-hidden" />
        <input type="password" id="password" placeholder="비밀번호" />
        <LoginSubmitBtn type="submit">로그인</LoginSubmitBtn>
      </LoginFormContainer>
      <LoginLinkContainer>
        <a href="/">회원가입</a>
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
  z-index: 2;
  background-color: #fff;
  border-top: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const SellerLoginBtn = styled.button`
  border: 1px solid #c4c4c4;
  background-color: #f2f2f2;
  border-radius: 10px;
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
  }
  input:first-of-type {
    margin-bottom: 6px;
  }
`;
const LoginSubmitBtn = styled.button`
  width: 480px;
  background-color: #21bf48;
  padding: 19px 215px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  margin-top: 36px;
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
