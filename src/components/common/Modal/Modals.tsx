import React from "react";
import { Button } from "../Button/Button";
import useModal from "../../../hooks/useModal";
import * as S from "./ModalsStyle";

interface AddCartProps {
  onGoCart: () => void;
  onKeepShopping: () => void;
}

export const addCart = ({ onGoCart, onKeepShopping }: AddCartProps) => {
  return (
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
  );
};
interface AlreadyCartProps {
  onCancel: () => void;
  onGoCart: () => void;
}
export const alreadyCart = ({ onCancel, onGoCart }: AlreadyCartProps) => {
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
          onClick={onCancel}
        />
        <Button
          type="button"
          width="100px"
          color="white"
          content="예"
          onClick={onGoCart}
        />
      </S.BtnContainer>
    </>
  );
};
interface ProductDeleteProps {
  onCancel: () => void;
  onDelete: () => void;
}
export const productDelete = ({ onCancel, onDelete }: ProductDeleteProps) => {
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
interface GoLoginProps {
  onCancel: () => void;
  onGoLogin: () => void;
}
export const goLogin = ({ onCancel, onGoLogin }: GoLoginProps) => {
  const userType = localStorage.getItem("user_type");
  return (
    <>
      {userType === "SELLER" ? (
        <S.ModalContent>
          구매회원으로 로그인해주세요.
          <br />
          로그인 하시겠습니까?
        </S.ModalContent>
      ) : (
        <S.ModalContent>
          로그인이 필요한 서비스입니다.
          <br />
          로그인 하시겠습니까?
        </S.ModalContent>
      )}
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
interface Modal {
  Component: React.ComponentType<any>;
  props: any;
}
export const Modals = () => {
  const { modals, closeModal } = useModal();
  return (
    <>
      {modals.map(({ Component, props }: Modal, idx: number) => {
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
