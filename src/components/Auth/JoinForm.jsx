import React from "react";
import { Button } from "../common/Button/Button";
import * as S from "./JoinFormStyle";
export default function JoinForm() {
  return (
    <S.JoinContainer>
      <h1 className="a11y-hidden">회원가입</h1>
      <S.JoinTypeBtn>
        <S.BuyerJoinBtn>구매회원가입</S.BuyerJoinBtn>
        <S.SellerJoinBtn>판매회원가입</S.SellerJoinBtn>
      </S.JoinTypeBtn>
      <S.Form>
        <S.JoinFormContainer>
          <label htmlFor="id">아이디</label>
          <S.IdContainer>
            <input id="id" type="text" />
            <Button content="중복확인" />
          </S.IdContainer>
          <label htmlFor="password">비밀번호</label>
          <input id="password" type="password" />
          <label htmlFor="passwordCheck">비밀번호 재확인</label>
          <input id="passwordCheck" type="password" />
          <label htmlFor="name">이름</label>
          <input id="name" type="text" />
          <fieldset>
            <label htmlFor="phone">휴대폰번호</label>
            <S.PhoneContainer>
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
            </S.PhoneContainer>
          </fieldset>
        </S.JoinFormContainer>
        <S.AgreeContainer>
          <S.AgreeInput type="checkbox" id="agree" />
          <S.AgreeLabel htmlFor="agree">
            <div>
              호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에
              대한 내용을 확인하였고 동의합니다.
            </div>
          </S.AgreeLabel>
        </S.AgreeContainer>
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
      </S.Form>
    </S.JoinContainer>
  );
}
