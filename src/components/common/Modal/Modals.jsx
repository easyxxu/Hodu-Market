import React from "react";
import { Button } from "../Button/Button";
import { useState } from "react";
import useModal from "../../../hooks/useModal";
import * as S from "./ModalsStyle";

export const addCart = ({ open, onGoCart, onKeepShopping }) => {
  return (
    <>
      {open && (
        <>
          <S.ModalContent>장바구니에 담겼습니다.</S.ModalContent>
          <S.BtnContainer>
            <Button
              type="button"
              width="130px"
              color="white"
              content="계속 쇼핑하기"
              onClick={onKeepShopping}
            />
            <Button
              type="button"
              width="130px"
              bgcolor="light"
              border="yes"
              content="장바구니 가기"
              onClick={onGoCart}
            />
          </S.BtnContainer>
        </>
      )}
    </>
  );
};
export const alreadyCart = () => {
  return (
    <>
      <S.ModalContent>
        이미 장바구니에 있는 상품입니다. <br />
        장바구니로 이동하시겠습니까?
      </S.ModalContent>
      <S.BtnContainer>
        <Button
          type="button"
          width="100px"
          bgcolor="light"
          border="yes"
          content="아니오"
        />
        <Button type="button" width="100px" color="white" content="예" />
      </S.BtnContainer>
    </>
  );
};
export const productDelete = ({ onCancel, onDelete }) => {
  return (
    <>
      <S.ModalContent>상품을 삭제하시겠습니까?</S.ModalContent>
      <S.BtnContainer>
        <Button
          type="button"
          width="100px"
          bgcolor="light"
          border="yes"
          content="아니오"
          onClick={onCancel}
        />
        <Button
          type="button"
          width="100px"
          color="white"
          content="예"
          onClick={onDelete}
        />
      </S.BtnContainer>
    </>
  );
};
export const goLogin = ({ onCancel, onGoLogin }) => {
  return (
    <>
      <S.ModalContent>
        로그인이 필요한 서비스입니다.
        <br />
        로그인 하시겠습니까?
      </S.ModalContent>
      <S.BtnContainer>
        <Button
          type="button"
          width="100px"
          bgcolor="light"
          border="yes"
          content="아니오"
          onClick={onCancel}
        />
        <Button
          type="button"
          width="100px"
          color="white"
          content="예"
          onClick={onGoLogin}
        />
      </S.BtnContainer>
    </>
  );
};
export const modalsList = {
  addCart: addCart,
  alreadyCart: alreadyCart,
  productDelete: productDelete,
  goLogin: goLogin,
};

export const Modals = () => {
  const { modals, closeModal } = useModal();
  console.log(modals);
  return (
    <>
      {modals.map(({ Component, props }, idx) => {
        const ModalComponent = Component;
        return (
          <S.ModalContainer key={idx}>
            <ModalComponent {...props} />
            <S.ModalCloseBtn
              type="button"
              onClick={() => closeModal(Component)}
            />
          </S.ModalContainer>
        );
      })}
    </>
  );
};
