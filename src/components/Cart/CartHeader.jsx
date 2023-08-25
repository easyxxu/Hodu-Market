import React from "react";
import * as S from "./CartHeaderStyle";
import { useRecoilState } from "recoil";
import { cartItemAllSelectAtom } from "../../atoms/cartAtom";
export default function CartHeader({ className }) {
  const [isAllSelect, setIsAllSelect] = useRecoilState(cartItemAllSelectAtom);
  // 전체 상품 선택하는 핸들러
  const handleAllSelect = () => {
    setIsAllSelect(!isAllSelect);
  };
  console.log("isAllSelect: ", isAllSelect);
  return (
    <>
      <S.CartTitle>장바구니</S.CartTitle>
      <S.CartTabTitle className={className}>
        <S.CartCheckBox
          type="checkbox"
          onClick={handleAllSelect}
          checked={isAllSelect}
        />
        <p>상품정보</p>
        <p>수량</p>
        <p>상품금액</p>
      </S.CartTabTitle>
    </>
  );
}
