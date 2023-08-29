import React, { useState } from "react";
import * as S from "./CartItemStyle";
import { Button } from "../common/Button/Button";
import QuantityButton from "../common/Button/QuantityButton";
import { useRecoilState } from "recoil";
import {
  cartCheckedItemsAtom,
  cartInfoAtom,
  cartListAtom,
  cartTotalAtom,
} from "../../atoms/cartAtom";
import { useEffect } from "react";
import { deleteCart } from "../../apis/cartApi";
import useModal from "../../hooks/useModal";
import { modalsList } from "../common/Modal/Modals";

export default function CartItem({ item }) {
  const cartItemInfo = item.data; // cart에 담긴 아이템의 상세 정보
  const [cartList, setCartList] = useRecoilState(cartListAtom); // cartItemInfo map돌리기전 전체 데이터
  const [cartInfo, setCartInfo] = useRecoilState(cartInfoAtom); // cart에 담긴 모든 아이템의 cart_item_id, is_active, product_id, my_cart, quantity
  const [totalPrice, setTotalPrice] = useRecoilState(cartTotalAtom);
  const [itemPrice, setItemPrice] = useState(cartItemInfo.price);
  const [checkItems, setCheckItems] = useRecoilState(cartCheckedItemsAtom); // 선택된 아이템 배열
  const [isChecked, setIsChecked] = useState(true);
  const [totalCheckedItems, setTotalCheckedItems] = useState([]); // 장바구니에 담긴 아이템 중에 체크된 아이템만 담겨있는 배열(총 가격 계산을 위함)
  const [cartAllItem, setCartAllItem] = useState([]); // cart에 담긴 모든 상품의 수량, 가격, 배송비
  const { openModal, closeModal } = useModal();
  // const [cartItemForm, setCartItemForm] = useState({
  //   product_id: "",
  //   quantity: 1,
  //   check: false,
  // });
  useEffect(() => {
    const updatedCartAllItem = cartInfo.map((cartItem) => {
      const { product_id, quantity } = cartItem;
      const { price, shipping_fee } = cartList.find(
        (item) => item.data.product_id === product_id
      ).data;

      return { product_id, quantity, price, shipping_fee };
    });

    setCartAllItem(updatedCartAllItem);
  }, []);

  // Cart 아이템 선택
  const handleCartSingleSelect = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((item) => item !== id));
    }
  };
  // 체크된 아이템만 결제하기 위해 배열에 담음
  const cartTotalCheckedItems = () => {
    let total = [];
    cartAllItem.map((item) => {
      if (checkItems.includes(item.product_id)) {
        total.push(item);
      }
    });
    setTotalCheckedItems(total);
    cartTotalPrice();
  };
  // 체크된 아이템의 총 가격 계산
  const cartTotalPrice = () => {
    let total = [];
    totalCheckedItems.forEach((item) => {
      let itemTotal = item.price * item.quantity;
      console.log(
        `아이템 계산: ${item.price} * ${item.quantity} = ${itemTotal}`
      );
      total.push(itemTotal);
    });

    const shippingFees = totalCheckedItems.map((item) => item.shipping_fee);

    setTotalPrice({
      total,
      shippingFee: shippingFees,
    });
  };

  useEffect(() => {
    cartTotalCheckedItems();
  }, [checkItems, isChecked]);

  console.log("totalCheckedItems: ", totalCheckedItems);
  console.log("TotalPrice: ", totalPrice);
  // cart 아이템 삭제
  const handleDeleteItem = async (id) => {
    try {
      let productId;
      cartInfo.map((item) => {
        if (item.product_id === id) {
          productId = item.cart_item_id;
        }
      });
      const res = await deleteCart(productId);
      console.log(res);
      setCartList((prevItems) =>
        prevItems.filter((item) => item.data.product_id !== id)
      ); // 장바구니 리스트 업데이트
    } catch (err) {
      console.error("장바구니 삭제 에러:", err);
    }
  };
  // 장바구니 삭제 모달 오픈
  const handleModalOpen = () => {
    openModal(modalsList.productDelete, {
      onCancle: () => {
        closeModal(modalsList.productDelete);
      },
      onDelete: async () => {
        await handleDeleteItem(cartItemInfo.product_id);
        closeModal(modalsList.productDelete);
      },
    });
  };

  // checkItems에 상품이 담겨있는지 확인
  useEffect(() => {
    checkItems.includes(cartItemInfo.product_id)
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [checkItems]);
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
      <QuantityButton
        cartQuantity={
          cartInfo.find((x) => x.product_id === cartItemInfo.product_id)
            ?.quantity
        }
      />
      <S.ProductPriceContainer>
        <p>{itemPrice.toLocaleString("ko-KR")}원</p>
        <Button width="130px" size="M" content="주문하기" />
      </S.ProductPriceContainer>
      <S.BtnClose onClick={handleModalOpen} />
    </S.CartItemContainer>
  );
}
