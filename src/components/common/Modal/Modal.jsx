import React from "react";
import { Button, CountButton } from "../Button/Button";
import styled from "styled-components";
import DeleteBtn from "../../../assets/icon-delete.svg";
import { useState } from "react";

export default function Modal({ type }) {
  type = "goLogin";
  const [productCnt, setProductCnt] = useState(1);
  const handlerBtnMinus = () => {
    if (productCnt > 1) {
      setProductCnt(productCnt - 1);
      // setTotalPrice(totalPrice - productPrice);
    }
  };
  const handlerBtnPlus = () => {
    setProductCnt(productCnt + 1);
    // setTotalPrice(totalPrice + productPrice);
  };
  const modalContentType = {
    addCart: <ModalContent>장바구니에 담겼습니다.</ModalContent>,
    alreadyCart: (
      <ModalContent>
        이미 장바구니에 있는 상품입니다. <br />
        장바구니로 이동하시겠습니까?
      </ModalContent>
    ),
    countEdit: (
      <CountButtonContainer>
        <CountButton
          onClick1={handlerBtnMinus}
          onClick2={handlerBtnPlus}
          productCnt={productCnt}
        />
      </CountButtonContainer>
    ),
    productDelete: <ModalContent>상품을 삭제하시겠습니까?</ModalContent>,
    goLogin: (
      <ModalContent>
        로그인이 필요한 서비스입니다.
        <br />
        로그인 하시겠습니까?
      </ModalContent>
    ),
  };
  const modalBtnType = {
    addCart: (
      <>
        <Button
          type="button"
          width="130px"
          color="white"
          content="계속 쇼핑하기"
        />
        <Button
          type="button"
          width="130px"
          bgcolor="light"
          border="yes"
          content="장바구니 가기"
        />
      </>
    ),
    alreadyCart: (
      <>
        <Button
          type="button"
          width="100px"
          bgcolor="light"
          border="yes"
          content="아니오"
        />
        <Button type="button" width="100px" color="white" content="예" />
      </>
    ),
    countEdit: (
      <>
        <Button
          type="button"
          width="100px"
          bgcolor="light"
          border="yes"
          content="취소"
        />
        <Button type="button" width="100px" color="white" content="수정" />
      </>
    ),
    productDelete: (
      <>
        <Button
          type="button"
          width="100px"
          bgcolor="light"
          border="yes"
          content="취소"
        />
        <Button type="button" width="100px" color="white" content="확인" />
      </>
    ),
    goLogin: (
      <>
        <Button
          type="button"
          width="100px"
          bgcolor="light"
          border="yes"
          content="아니오"
        />
        <Button type="button" width="100px" color="white" content="예" />
      </>
    ),
  };
  return (
    <ModalContainer>
      {modalContentType[type]}
      <BtnContainer>{modalBtnType[type]}</BtnContainer>
      <ModalCloseBtn type="button" />
    </ModalContainer>
  );
}
const ModalContainer = styled.div`
  width: 360px;
  height: 200px;
  padding: 50px 65px 40px;
  border: 1px solid var(--content-color-light);
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ModalContent = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  font-weight: 400;
  text-align: center;
  line-height: normal;
`;
const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  button {
    font-size: 16px;
  }
`;
const ModalCloseBtn = styled.button`
  width: 22px;
  height: 22px;
  background: url(${DeleteBtn}) no-repeat center;
  position: absolute;
  top: 18px;
  right: 18px;
`;
const CountButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 26px;
`;
