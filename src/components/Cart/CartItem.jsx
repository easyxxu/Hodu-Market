import React, { useState } from "react";
import * as S from "./CartItemStyle";
import { Button } from "../common/Button/Button";
import QuantityButton from "../common/Button/QuantityButton";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartCheckedItemsAtom,
  cartInfoAtom,
  cartListAtom,
  cartTotalAtom,
} from "../../atoms/cartAtom";
import { useEffect } from "react";
import { deleteCart, updateQuantity } from "../../apis/cartApi";
import useModal from "../../hooks/useModal";
import { modalsList } from "../common/Modal/Modals";
import useStockCheck from "../../hooks/useStockCheck";
import { useNavigate } from "react-router-dom";

export default function CartItem({ item }) {
  const cartItemInfo = item.data; // cart에 담긴 아이템의 상세 정보
  const [cartList, setCartList] = useRecoilState(cartListAtom); // cartItemInfo map돌리기전 전체 데이터
  const cartInfo = useRecoilValue(cartInfoAtom); // cart에 담긴 모든 아이템의 cart_item_id, is_active, product_id, my_cart, quantity
  const [totalPrice, setTotalPrice] = useRecoilState(cartTotalAtom);
  const [checkItems, setCheckItems] = useRecoilState(cartCheckedItemsAtom); // 선택된 아이템 배열
  const [isChecked, setIsChecked] = useState(true);
  const [totalCheckedItems, setTotalCheckedItems] = useState([]); // 장바구니에 담긴 아이템 중에 체크된 아이템만 담겨있는 배열(총 가격 계산을 위함)
  const [cartAllItem, setCartAllItem] = useState([]); // cart에 담긴 모든 상품의 수량, 가격, 배송비
  const { openModal, closeModal } = useModal();
  const { getStock, stockCheck } = useStockCheck();
  const navigate = useNavigate();
  // console.log("checkItems:", checkItems);
  const cartItemId = cartInfo.find(
    (x) => x.product_id === cartItemInfo.product_id
  )?.cart_item_id;
  const cartQuantity = cartInfo.find(
    (x) => x.product_id === cartItemInfo.product_id
  )?.quantity;
  const [checkedForm, setCheckedForm] = useState({
    product_id: "",
    quantity: "",
    is_active: true,
  });

  useEffect(() => {
    // 컴포넌트가 마운트될 때 모든 상품의 아이디를 checkItems 배열에 추가
    const allProductIds = cartInfo.map((item) => item.product_id);
    setCheckItems(allProductIds);
    return () => {
      setCheckItems([]); // 컴포넌트가 언마운트될 때 checkItems 초기화
    };
  }, []);

  useEffect(() => {
    const updatedCartAllItem = cartInfo.map((cartItem) => {
      const { product_id, quantity } = cartItem;
      const cartListItem = cartList.find(
        (item) => item.data.product_id === product_id
      );
      if (cartListItem) {
        const { price, shipping_fee } = cartListItem.data;
        return { product_id, quantity, price, shipping_fee };
      }
      return null; // 혹은 원하는 값을 반환하세요.
    });
    setCartAllItem(updatedCartAllItem.filter(Boolean)); // null 값 제거
  }, [cartInfo, cartList]);

  // Cart 아이템 선택
  const handleCartSingleSelect = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
      setCheckedForm({
        ...checkedForm,
        product_id: id,
        quantity: cartQuantity,
        is_active: true,
      });
      // setIsChecked(true);
    } else {
      setCheckItems(checkItems.filter((item) => item !== id));
      setCheckedForm({
        ...checkedForm,
        product_id: id,
        quantity: cartQuantity,
        is_active: false,
      });
      // setIsChecked(false);
    }
  };

  useEffect(() => {
    const updateIsActive = async () => {
      try {
        const res = await updateQuantity(cartItemId, checkedForm);
        console.log("체크 통신 완료:", res.data);
      } catch (err) {
        console.error("체크 통신 실패:", err.response.data);
      }
    };
    if (checkedForm.product_id) {
      updateIsActive();
    }
  }, [checkedForm, cartItemId]);

  // 체크된 아이템만 결제하기 위해 배열에 담음
  const cartTotalCheckedItems = () => {
    let total = [];
    cartAllItem.map((item) => {
      if (checkItems.includes(item.product_id)) {
        total.push(item);
      }
    });
    setTotalCheckedItems(total);
    // cartTotalPrice();
  };

  // 체크된 아이템의 총 가격 계산
  const cartTotalPrice = () => {
    // console.log("총 가격 계산하기 함수 실행", totalCheckedItems);
    let total = [];
    totalCheckedItems.forEach((item) => {
      let itemTotal = item.price * item.quantity;
      total.push(itemTotal);
    });

    const shippingFees = totalCheckedItems.map((item) => item.shipping_fee);

    setTotalPrice({
      total,
      shippingFee: shippingFees,
    });
  };
  // console.log("총 가격", totalPrice);

  useEffect(() => {
    checkItems.includes(cartItemInfo.product_id)
      ? setIsChecked(true)
      : setIsChecked(false);
    cartTotalCheckedItems();
  }, [checkItems, isChecked, cartAllItem]);

  useEffect(() => {
    cartTotalPrice();
  }, [totalCheckedItems]);

  // cart 아이템 삭제
  const handleDeleteItem = async (productId) => {
    try {
      let cartItemId;
      cartInfo.map((item) => {
        if (item.product_id === productId) {
          cartItemId = item.cart_item_id;
        }
      });
      await deleteCart(cartItemId);
      setCartList((prevItems) =>
        prevItems.filter((item) => item.data.product_id !== productId)
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

  // 장바구니에서 하나만 주문하기
  const handleOneOrder = async () => {
    // 재고 조회
    const stock = await getStock(cartItemInfo.product_id);
    const stockCheckResult = stockCheck(stock, cartQuantity);
    console.log(stockCheckResult, cartItemInfo.product_id);
    if (stockCheckResult) {
      navigate("/order", {
        state: {
          orderKind: "cart_one_order",
          orderList: cartItemInfo,
          quantity: cartQuantity,
          totalPrice: cartItemInfo.price * cartQuantity,
        },
      });
    } else {
      alert(`해당 상품의 최대 주문 수량은 ${stock}개입니다.`);
    }
  };

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
        cartQuantity={cartQuantity}
        cartItemId={cartItemId}
        productId={
          cartInfo.find((x) => x.product_id === cartItemInfo.product_id)
            ?.product_id
        }
      />
      <S.ProductPriceContainer>
        <p>{(cartItemInfo.price * cartQuantity).toLocaleString("ko-KR")}원</p>
        <Button
          width="130px"
          size="M"
          content="주문하기"
          onClick={handleOneOrder}
        />
      </S.ProductPriceContainer>
      <S.BtnDelete onClick={handleModalOpen} />
    </S.CartItemContainer>
  );
}
