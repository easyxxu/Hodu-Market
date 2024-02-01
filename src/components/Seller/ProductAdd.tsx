import React from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  loadProductDetail,
  productAddApi,
  productModifyApi,
} from "../../apis/productApi";
import * as S from "./ProductAddStyle";
import { Button } from "../common/Button/Button";
import imgUploadBtn from "../../assets/svg/icon-img.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export default function ProductAdd() {
  const [product, setProduct] = useState({
    product_name: "",
    image: "",
    price: "",
    shipping_method: "DELIVERY",
    shipping_fee: "",
    stock: "",
    product_info: "",
  });
  const [productModify, setProductModify] = useState({});
  const inputImgRef = useRef<any>(null);
  const [imgPrev, setImgPrev] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state.type;
  const productId = location.state.productId;
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (type === "add") {
        await productAddApi(product);
        // console.log("상품등록 성공");
      } else if (type === "modify") {
        await productModifyApi(productId, productModify);
        // console.log("상품수정 성공");
      }
      navigate("/sellercenter");
    } catch (err) {
      if (axios.isAxiosError(err)) console.error("submit 에러: ", err);
    }
  };
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // price, shipping_fee, stock 속성은 숫자로 변환하여 저장
    let parsedValue: string | number = value;
    if (name === "price" || name === "shipping_fee" || name === "stock") {
      parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        parsedValue = 0; // 숫자로 변환할 수 없는 경우 기본값으로 0 설정
      }
    }

    setProduct({ ...product, [name]: parsedValue });
    setProductModify({ ...productModify, [name]: parsedValue });
  };

  const handleImgChange = () => {
    const file = inputImgRef.current?.files[0];
    // 파일 객체가 없는 경우 함수 종료
    if (!file) {
      return;
    }
    setProduct({ ...product, image: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") setImgPrev(reader.result);
    };
  };
  const onClickInput = () => {
    inputImgRef.current?.click();
  };
  const handleShippingMethod = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (button.name === "DELIVERY") {
      setProduct({ ...product, shipping_method: "DELIVERY" });
      // setShippingMethod("DELIVERY");
    } else if (button.name === "PARCEL") {
      setProduct({ ...product, shipping_method: "PARCEL" });
      // setShippingMethod("PARCEL");
    }
  };
  // console.log("Product: ", product.shipping_method);
  useEffect(() => {
    // 상품수정 시 해당 상품 정보 불러오기
    if (type === "modify") {
      const getProductDetail = async () => {
        try {
          const res = await loadProductDetail(productId);
          const {
            product_name,
            image,
            price,
            shipping_method,
            shipping_fee,
            stock,
            product_info,
          } = res.data;

          setProduct({
            product_name,
            image,
            price,
            shipping_method,
            shipping_fee,
            stock,
            product_info,
          });
          setImgPrev(image);
        } catch (err) {
          console.error("getProductDetail실패:", err);
        }
      };
      getProductDetail();
    }
  }, []);

  return (
    <S.Container>
      <S.Title>{type === "add" ? "상품 등록" : "상품 수정"}</S.Title>
      <S.ProductAddMain>
        <S.ProductCautionContainer>
          <S.ProductCautionTitle>* 상품 등록 주의사항</S.ProductCautionTitle>
          <S.ProductCautionContent>
            <ul>
              <li>
                상품 정보 확인: 상품을 등록하기 전에 제품명, 가격, 재고량 등의
                정보를 정확하게 확인해 주세요.
              </li>
              <li>
                사진 품질 개선: 상품 사진은 고화질이며 상품의 실제 모습을 잘
                나타내도록 촬영해 주세요.
              </li>
              <li>
                상세한 상품 설명: 상품에 대한 자세한 설명을 작성해 주세요. 소재,
                크기, 색상, 기능 등을 포함하여 고객이 상품을 잘 이해할 수 있도록
                해 주세요.
              </li>
            </ul>
          </S.ProductCautionContent>
        </S.ProductCautionContainer>
        <S.Form onSubmit={handleSubmit}>
          <S.ProductAddContainer>
            <S.ProductImg>
              <label htmlFor="image">상품 이미지</label>
              <S.ProductImgInputContainer>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={inputImgRef}
                  onChange={handleImgChange}
                />
                <S.ProductImgInputBtn type="button" onClick={onClickInput}>
                  <img src={imgUploadBtn} alt="이미지 추가하기" />
                </S.ProductImgInputBtn>
                {imgPrev && (
                  <S.ProductImgPreview
                    src={imgPrev}
                    alt="상품 미리보기"
                    onClick={onClickInput}
                  />
                )}
              </S.ProductImgInputContainer>
            </S.ProductImg>
            <S.ProductInfo>
              <label htmlFor="productName">상품명</label>
              <S.ProductNameInput
                type="text"
                id="productName"
                name="product_name"
                onChange={handleInputChange}
                autoComplete="off"
                value={product.product_name}
              />
              <label htmlFor="productPrice">판매가</label>
              <S.InputFrameContainer>
                <input
                  type="text"
                  id="productPrice"
                  name="price"
                  onChange={handleInputChange}
                  autoComplete="off"
                  value={product.price}
                />
              </S.InputFrameContainer>
              <label htmlFor="deliveryMethod">배송방법</label>
              <S.DeliveryBtnContainer>
                <Button
                  type="button"
                  id="deliveryMethod"
                  name="DELIVERY"
                  size="medium"
                  color={
                    product.shipping_method === "DELIVERY" ? "point" : "white"
                  }
                  $customStyle={{ fontSize: "16px" }}
                  children="택배, 소포, 등기"
                  onClick={handleShippingMethod}
                />
                <Button
                  type="button"
                  id="deliveryMethod"
                  name="PARCEL"
                  size="medium"
                  color={
                    product.shipping_method === "PARCEL" ? "point" : "white"
                  }
                  $customStyle={{ fontSize: "16px" }}
                  children="직접배송(화물배달)"
                  onClick={handleShippingMethod}
                />
              </S.DeliveryBtnContainer>
              <label htmlFor="deliveryStandardPrice">기본배송비</label>
              <S.InputFrameContainer>
                <input
                  type="text"
                  id="deliveryStandardPrice"
                  name="shipping_fee"
                  onChange={handleInputChange}
                  autoComplete="off"
                  value={product.shipping_fee}
                />
              </S.InputFrameContainer>
              <label htmlFor="stock">재고</label>
              <S.InputFrameCntContainer>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  onChange={handleInputChange}
                  autoComplete="off"
                  value={product.stock}
                />
              </S.InputFrameCntContainer>
            </S.ProductInfo>
          </S.ProductAddContainer>
          <S.ProductDetailContainer>
            <label htmlFor="productInfo">상품 상세 정보</label>
            <textarea
              id="productInfo"
              name="product_info"
              onChange={handleInputChange}
              value={product.product_info}
            />
          </S.ProductDetailContainer>
          <S.FormBtnContainer>
            <Button
              type="button"
              size="small"
              color="white"
              $customStyle={{ width: "200px" }}
              children="취소"
              onClick={handleGoBack}
            />
            <Button
              type="submit"
              size="small"
              color="point"
              $customStyle={{ width: "200px" }}
              children="저장하기"
            />
          </S.FormBtnContainer>
        </S.Form>
      </S.ProductAddMain>
    </S.Container>
  );
}
