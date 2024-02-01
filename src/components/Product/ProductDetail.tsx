import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { addCartApi } from "../../apis/cartApi";
import { cartAddFormAtom } from "../../atoms/cartAddFormAtom";
import useModal from "../../hooks/useModal";
import { Button } from "../common/Button/Button";
import QuantityButton from "../common/Button/QuantityButton";
import { modalsList } from "../common/Modal/Modals";
import * as S from "./ProductDetailStyle";
import { cartProductInfoListAtom } from "../../atoms/cartAtom";
import useStockCheck from "../../hooks/useStockCheck";
import { Product } from "../../types/product";
import axios from "axios";
import { logoutApi } from "../../apis/authApi";
interface ProductDetailProps {
  data?: any;
  productInfo: Product;
  item?: Product[];
}
export default function ProductDetail({ productInfo }: ProductDetailProps) {
  const token = localStorage.getItem("token");
  const userType = localStorage.getItem("user_type");
  const {
    store_name,
    product_name,
    image,
    price,
    shipping_method,
    shipping_fee,
    product_info,
    stock,
  } = productInfo;
  const { productId } = useParams();
  const product_id: number = parseInt(productId!);
  const [cartAddForm, setCartAddForm] = useRecoilState(cartAddFormAtom);
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { getStock, stockCheck } = useStockCheck();
  const totalPrice =
    price && (price * cartAddForm.quantity).toLocaleString("ko-KR");
  const cartProductInfoList = useRecoilValue(cartProductInfoListAtom);
  const inCart = cartProductInfoList.filter(
    (item: ProductDetailProps) => item.data.product_id === parseInt(productId!)
  ).length;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 639);
  const [tabIsActive, setTabIsActive] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // 주문하기 모달 오픈
  const handleOrderModalOpen = async () => {
    const stock = await getStock(product_id);
    const stockCheckResult = stockCheck(stock, cartAddForm.quantity);
    if (!stockCheckResult) {
      alert(`해당 상품의 최대 주문 수량은 ${stock}개입니다.`);
      return;
    }
    if (stockCheckResult && token && userType === "BUYER") {
      navigate("/order", {
        state: {
          orderKind: "direct_order",
          orderList: productInfo,
          quantity: cartAddForm.quantity,
          totalPrice: price * cartAddForm.quantity,
        },
      });
    } else if (!token || userType === "SELLER") {
      // 로그인 안한 경우 또는 SELLER의 경우
      openModal(modalsList.goLogin, {
        onCancel: () => {
          closeModal(modalsList.goLogin);
        },
        onGoLogin: () => {
          handleLogout();
          navigate("/login");
          closeModal(modalsList.goLogin);
        },
      });
    }
  };
  // 장바구니 담기 모달 오픈
  const handleCartModalOpen = async () => {
    if (token && inCart === 0 && userType === "BUYER") {
      // 로그인한 경우
      const res = await handleAddCart();
      if (res?.data.my_cart) {
        openModal(modalsList.addCart, {
          onKeepShopping: () => {
            closeModal(modalsList.addCart);
          },
          onGoCart: () => {
            navigate("/cart");
            closeModal(modalsList.addCart);
          },
        });
      } else if (
        res?.data.FAIL_message ===
        "현재 재고보다 더 많은 수량을 담을 수 없습니다."
      ) {
        alert("현재 재고보다 더 많은 수량을 담을 수 없습니다.");
      }
    } else if (token && inCart > 0 && userType === "BUYER") {
      openModal(modalsList.alreadyCart, {
        onCancel: () => {
          closeModal(modalsList.alreadyCart);
        },
        onGoCart: () => {
          navigate("/cart");
          closeModal(modalsList.alreadyCart);
        },
      });
    } else if (!token || userType === "SELLER") {
      // 로그인 안한 경우 또는 SELLER의 경우
      openModal(modalsList.goLogin, {
        onCancel: () => {
          closeModal(modalsList.goLogin);
        },
        onGoLogin: () => {
          handleLogout();
          navigate("/login");
          closeModal(modalsList.goLogin);
        },
      });
    }
  };
  // 장바구니 담기 API
  const handleAddCart = async () => {
    try {
      const res = await addCartApi(cartAddForm);
      // console.log("장바구니 담기 성공: ", res);
      return res;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("장바구니 담기 에러: ", err);
        return err.response;
      }
    }
  };
  const tabList: string[] = ["상세정보", "리뷰", "Q&A", "반품/교환정보"];
  const handleTab = (index: number) => {
    setTabIsActive(index);
  };

  // logout
  const handleLogout = async () => {
    // console.log("logout go");
    try {
      const res = await logoutApi();
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("recoil-persist");
      // console.log("logout:", res);
    } catch (err) {
      console.error(err);
    }
  };
  // 홈페이지에서 상품 디테일로 가는 경우 productId가 달라짐에 따라 CartAddForm에 저장함
  useEffect(() => {
    setCartAddForm({
      ...cartAddForm,
      product_id,
      quantity: 1,
    });
  }, [productId]);

  return (
    <S.Wrapper>
      <S.DetailContainer>
        <S.ProductImg src={image} alt="상품이미지" />
        <S.ProductInfoContainer>
          <S.ProductCompany>{store_name}</S.ProductCompany>
          <S.ProductName>{product_name}</S.ProductName>
          <S.ProductPrice>
            <strong>{price && price.toLocaleString("ko-KR")}</strong>원
          </S.ProductPrice>
          <S.Delivery>
            {shipping_method === "DELIVERY" ? "택배배송" : "직접배송"} / &nbsp;
            {shipping_fee && shipping_fee.toLocaleString("ko-KR")}
            &nbsp; 원
          </S.Delivery>
          <hr />
          <S.CountBtnContainer>
            <QuantityButton
              cartAddForm={cartAddForm}
              setCartAddForm={setCartAddForm}
            />
          </S.CountBtnContainer>
          <hr />
          <S.TotalContainer>
            <S.Total>총 상품 금액</S.Total>
            <S.TotalCntContainer>
              <p>
                총 수량 <strong>{cartAddForm.quantity}</strong>개
              </p>
              <S.TotalPrice>
                <strong>{totalPrice}</strong>원
              </S.TotalPrice>
            </S.TotalCntContainer>
          </S.TotalContainer>
          <S.BtnBuyContainer>
            {stock === 0 ? (
              <Button
                type="button"
                size="large"
                color="point"
                children="품절"
                $customStyle={isMobile ? { width: "100%" } : { width: "629px" }}
                disabled
              />
            ) : (
              <>
                <Button
                  type="button"
                  size="large"
                  color="point"
                  children="바로구매"
                  $customStyle={
                    isMobile ? { width: "70%" } : { width: "416px" }
                  }
                  onClick={handleOrderModalOpen}
                />
                <Button
                  type="button"
                  size="large"
                  color="white"
                  children="장바구니"
                  $customStyle={
                    isMobile ? { width: "30%" } : { width: "200px" }
                  }
                  onClick={handleCartModalOpen}
                />
              </>
            )}
          </S.BtnBuyContainer>
        </S.ProductInfoContainer>
      </S.DetailContainer>
      <S.DetailTabContainer>
        {tabList.map((tabItem, idx) => {
          return (
            <S.BtnDetailInfo
              key={idx}
              onClick={() => handleTab(idx)}
              active={tabIsActive === idx ? "true" : "false"}
            >
              {tabItem}
            </S.BtnDetailInfo>
          );
        })}
      </S.DetailTabContainer>
      <S.DetailInfo>
        {tabIsActive === 0 ? product_info : "준비중입니다 :)"}
      </S.DetailInfo>
    </S.Wrapper>
  );
}
