import React, { useState } from "react";
import * as S from "./CartItemStyle";
import { Button, CountButton } from "../common/Button/Button";
import { useRecoilState } from "recoil";
import { cartCheckedItemsAtom, cartTotalAtom } from "../../atoms/cartAtom";
import { useEffect } from "react";

export default function CartItem({ item }) {
  const cartItemInfo = item.data;
  const [productCnt, setProductCnt] = useState(1);
  const [itemPrice, setItemPrice] = useState(cartItemInfo.price);
  const [totalPrice, setTotalPrice] = useRecoilState(cartTotalAtom);
  const [checkItems, setCheckItems] = useRecoilState(cartCheckedItemsAtom);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    checkItems.includes(cartItemInfo.product_id)
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [checkItems]);

  const handleBtnMinus = () => {
    if (productCnt > 1) {
      setProductCnt(productCnt - 1);
      const newPrice = itemPrice - cartItemInfo.price;
      setItemPrice(newPrice);
      if (isChecked) {
        setTotalPrice((prev) => ({
          total: prev.total - cartItemInfo.price,
          shippingFee: prev.shippingFee,
        }));
      }
    }
  };
  const handleBtnPlus = () => {
    setProductCnt(productCnt + 1);
    const newPrice = itemPrice + cartItemInfo.price;
    setItemPrice(newPrice);
    if (isChecked) {
      setTotalPrice((prev) => ({
        total: prev.total + cartItemInfo.price,
        shippingFee: prev.shippingFee,
      }));
    }
  };
  const handleCartSingleSelect = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    console.log("실행됨");
    // setTotalPrice({ total: 0, shippingFee: 0 });
    if (isChecked) {
      setTotalPrice((prev) => ({
        total: prev.total + itemPrice,
        shippingFee: prev.shippingFee + cartItemInfo.shipping_fee,
      }));
    } else {
      setTotalPrice((prev) => ({
        total: prev.total - itemPrice,
        shippingFee: prev.shippingFee - cartItemInfo.shipping_fee,
      }));
    }
  }, [isChecked]);

  return (
    <S.CartItemContainer>
      <S.ToggleCheckBox
        type="checkbox"
        checked={isChecked}
        onChange={(e) =>
          handleCartSingleSelect(e.target.checked, cartItemInfo.product_id)
        }
      />
      <S.ProductInfo>
        <S.ProductImg src={cartItemInfo.image} alt="상품이미지" />
        <S.ProductInfoWrapper>
          <p>{cartItemInfo.store_name}</p>
          <p>{cartItemInfo.product_name}</p>
          <p>{cartItemInfo.price.toLocaleString("ko-KR")}원</p>
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
