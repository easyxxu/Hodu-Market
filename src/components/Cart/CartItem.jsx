import React, { useState } from "react";
import * as S from "./CartItemStyle";
import { Button, CountButton } from "../common/Button/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemAllSelectAtom, cartTotalAtom } from "../../atoms/cartAtom";
import { useEffect } from "react";

export default function CartItem({ item }) {
  const cartItemInfo = item.data;
  const [productCnt, setProductCnt] = useState(1);
  const [itemPrice, setItemPrice] = useState(cartItemInfo.price);
  const [totalPrice, setTotalPrice] = useRecoilState(cartTotalAtom);
  const isAllSelect = useRecoilValue(cartItemAllSelectAtom);
  const handleBtnMinus = () => {
    if (productCnt > 1) {
      setProductCnt(productCnt - 1);
      const newPrice = itemPrice - cartItemInfo.price;
      setItemPrice(newPrice);
      setTotalPrice((prevTotal) => prevTotal - newPrice);
    }
  };
  const handleBtnPlus = () => {
    setProductCnt(productCnt + 1);
    const newPrice = itemPrice + cartItemInfo.price;
    setItemPrice(newPrice);
    setTotalPrice((prevTotal) => prevTotal + newPrice);
  };
  useEffect(() => {
    setTotalPrice({
      total: (prev) => prev + itemPrice,
      shippingFee: (prev) => prev + cartItemInfo.shipping_fee,
    });
  }, [itemPrice]);

  return (
    <S.CartItemContainer key={cartItemInfo.product_id}>
      <S.ToggleCheckBox type="checkbox" checked={isAllSelect} />
      <S.ProductInfo>
        <S.ProductImg src={cartItemInfo.image} alt="상품이미지" />
        <S.ProductInfoWrapper>
          <p>{cartItemInfo.store_name}</p>
          <p>{cartItemInfo.product_name}</p>
          <p>{itemPrice.toLocaleString("ko-KR")}원</p>
          <p>
            {cartItemInfo.shipping_method === "DELIVERY"
              ? "택배배송"
              : "직접배송"}{" "}
            /{" "}
            {cartItemInfo.shipping_fee === 0
              ? "무료배송"
              : `${cartItemInfo.shipping_fee.toLocaleString("ko-KR")} 원`}
          </p>
        </S.ProductInfoWrapper>
      </S.ProductInfo>
      <CountButton
        onClick1={handleBtnMinus}
        onClick2={handleBtnPlus}
        productCnt={productCnt}
      />
      <S.ProductPriceContainer>
        <p>{itemPrice.toLocaleString("ko-KR")}원</p>
        <Button width="130px" size="M" content="주문하기" />
      </S.ProductPriceContainer>
      <S.BtnClose />
    </S.CartItemContainer>
  );
}
