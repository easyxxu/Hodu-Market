import { styled } from "styled-components";
import React from "react";
import UpArrow from "../../assets/icon-up-arrow.svg";
import Check from "../../assets/icon-check.svg";
import { Button } from "../common/Button/Button";
export default function JoinForm() {
  return (
    <JoinContainer>
      <h1 className="a11y-hidden">회원가입</h1>
      <JoinTypeBtn>
        <BuyerJoinBtn>구매회원가입</BuyerJoinBtn>
        <SellerJoinBtn>판매회원가입</SellerJoinBtn>
      </JoinTypeBtn>
      <Form>
        <JoinFormContainer>
          <label htmlFor="id">아이디</label>
          <IdContainer>
            <input id="id" type="text" />
            <Button content="중복확인" />
          </IdContainer>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" />
          <label htmlFor="passwordCheck">비밀번호 재확인</label>
          <input id="passwordCheck" type="password" />
          <label htmlFor="name">이름</label>
          <input id="name" type="text" />
          <fieldset>
            <label htmlFor="phone">휴대폰번호</label>
            <PhoneContainer>
              <button type="button">010</button>
              <ul>
                <li>010</li>
                <li>011</li>
                <li>016</li>
                <li>017</li>
                <li>018</li>
                <li>019</li>
              </ul>
              <input type="text" />
              <input type="text" />
            </PhoneContainer>
          </fieldset>
        </JoinFormContainer>
        <AgreeContainer>
          <AgreeInput type="checkbox" id="agree" />
          <AgreeLabel htmlFor="agree">
            <div>
              호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에
              대한 내용을 확인하였고 동의합니다.
            </div>
          </AgreeLabel>
        </AgreeContainer>
        <Button
          type="button"
          size="M"
          width="M"
          bgColor="disabled"
          color="white"
          fontSize="M"
          fontWeight="bold"
          content="가입하기"
        />
      </Form>
    </JoinContainer>
  );
}
const JoinContainer = styled.div`
  max-width: 550px;
  margin: 50px auto;
  /* border-radius: 10px; */
`;
const JoinTypeBtn = styled.div`
  display: flex;
  button {
    width: 275px;
    font-size: 18px;
    padding: 20px 76px 38px;
  }
`;
const BuyerJoinBtn = styled.button`
  z-index: 2;
  background-color: #fff;
  border-top: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
const SellerJoinBtn = styled.button`
  border: 1px solid #c4c4c4;
  background-color: #f2f2f2;
  border-radius: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 34px;
  align-items: center;
`;
const JoinFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 40px 35px 36px;
  z-index: 1;
  position: relative;
  input {
    width: 480px;
    padding: 17px 10px;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    margin-bottom: 12px;
    font-size: 16px;
  }
  label {
    color: #767676;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;
const IdContainer = styled.div`
  display: flex;
  gap: 12px;
  input {
    width: 346px;
  }
  button {
    width: 122px;
    height: 54px;
    background-color: #21bf48;
    border-radius: 5px;
    color: #fff;
    padding: 17px 31px;
    font-size: 16px;
  }
`;
const PhoneContainer = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  margin-top: 10px;
  input {
    width: 152px;
  }
  button {
    width: 152px;
    height: 54px;
    font-size: 16px;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    padding: 17px 73px 17px 50px;
    margin-bottom: 10px;
    background: url(${UpArrow}) no-repeat 90% 50%;
  }
  ul {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0%, 30%);
    width: 152px;
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    text-align: center;
  }
  li {
    padding: 10px;
  }
`;
const AgreeContainer = styled.div`
  width: 480px;
  margin: 0 auto;
  span {
    text-decoration-line: underline;
    font-weight: bold;
    text-underline-offset: 3px;
  }
`;
const AgreeInput = styled.input`
  display: none;
  width: 454px;
  & + label::before {
    content: "";
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border: 1px solid #c4c4c4;
  }
  &:checked + label::before {
    content: "";
    background: url(${Check}) no-repeat 50% 50%;
    border: 1px solid #21bf48;
  }
`;
const AgreeLabel = styled.label`
  display: flex;
  line-height: 18px;
  color: #767676;
`;
