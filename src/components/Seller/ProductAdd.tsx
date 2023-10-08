import React from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
  loadProductDetail,
  productAddApi,
  productModifyApi,
} from "../../apis/productApi";
import Frame from "../../assets/frame.svg";
import { Button } from "../common/Button/Button";
import imgUploadBtn from "../../assets/icon-img.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { media } from "../style/media";
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
  const inputImgRef = useRef<any>(null);
  const [imgPrev, setImgPrev] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state.type;
  const productId = location.state.productId;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (type === "add") {
        await productAddApi(product);
        // console.log("상품등록 성공");
      } else if (type === "modify") {
        await productModifyApi(productId, product);
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
    } else {
      setProduct({ ...product, shipping_method: "PARCEL" });
      // setShippingMethod("PARCEL");
    }
  };

  useEffect(() => {
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
    <Container>
      <Title>{type === "add" ? "상품 등록" : "상품 수정"}</Title>
      <ProductAddMain>
        <ProductCautionContainer>
          <ProductCautionTitle>* 상품 등록 주의사항</ProductCautionTitle>
          <ProductCautionContent>
            <ul>
              <li>너무 귀여운 사진은 심장이 아파올 수 있습니다.</li>
              <li>
                유소년에게서 천자만홍이 피고 이상이 온갖 들어 약동하다. 이상의
                가지에 사랑의 있는가? 주며, 끓는 힘차게 얼음이 얼음 가치를
                황금시대의 있음으로써 사라지지 것이다. 이 뜨거운지라, 이상의
                속에서 이것은 피가 보배를 황금시대의 싹이 사막이다.
              </li>
              <li>
                자신과 우는 옷을 지혜는 아니다. 더운지라 설레는 기쁘며,
                위하여서, 평화스러운 광야에서 그리하였는가? 소담스러운 위하여
                인도하겠다는 어디 무엇을 이상을 같지 따뜻한 청춘 칼이다.
              </li>
              <li>
                가치를 그들을 예수는 찬미를 가슴이 과실이 이것이다. 희망의
                것이다.보라, 풍부하게 이것은 황금시대를 얼마나 인간에 돋고,
                이것이다.
              </li>
            </ul>
          </ProductCautionContent>
        </ProductCautionContainer>
        <Form onSubmit={handleSubmit}>
          <ProductAddContainer>
            <ProductImg>
              <label htmlFor="image">상품 이미지</label>
              <ProductImgInputContainer>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={inputImgRef}
                  onChange={handleImgChange}
                />
                <ProductImgInputBtn type="button" onClick={onClickInput}>
                  <img src={imgUploadBtn} alt="이미지 추가하기" />
                </ProductImgInputBtn>
                {imgPrev && (
                  <ProductImgPreview
                    src={imgPrev}
                    alt="상품 미리보기"
                    onClick={onClickInput}
                  />
                )}
              </ProductImgInputContainer>
            </ProductImg>
            <ProductInfo>
              <label htmlFor="productName">상품명</label>
              <ProductNameInput
                type="text"
                id="productName"
                name="product_name"
                onChange={handleInputChange}
                autoComplete="off"
                value={product.product_name}
              />
              <label htmlFor="productPrice">판매가</label>
              <InputFrameContainer>
                <input
                  type="text"
                  id="productPrice"
                  name="price"
                  onChange={handleInputChange}
                  autoComplete="off"
                  value={product.price}
                />
              </InputFrameContainer>
              <label htmlFor="deliveryMethod">배송방법</label>
              <DeliveryBtnContainer>
                <Button
                  type="button"
                  id="deliveryMethod"
                  content="택배, 소포, 등기"
                  name="DELIVERY"
                  width="L"
                  size="L"
                  border={
                    product.shipping_method === "DELIVERY" ? undefined : "yes"
                  }
                  color={
                    product.shipping_method === "DELIVERY" ? "white" : undefined
                  }
                  bgcolor={
                    product.shipping_method === "DELIVERY" ? undefined : "light"
                  }
                  onClick={handleShippingMethod}
                />
                <Button
                  type="button"
                  id="deliverMethod"
                  content="직접배송(화물배달)"
                  name="PARCEL"
                  width="L"
                  size="L"
                  border={
                    product.shipping_method === "PARCEL" ? undefined : "yes"
                  }
                  color={
                    product.shipping_method === "PARCEL" ? "white" : undefined
                  }
                  bgcolor={
                    product.shipping_method === "PARCEL" ? undefined : "light"
                  }
                  onClick={handleShippingMethod}
                />
              </DeliveryBtnContainer>
              <label htmlFor="deliveryStandardPrice">기본배송비</label>
              <InputFrameContainer>
                <input
                  type="text"
                  id="deliveryStandardPrice"
                  name="shipping_fee"
                  onChange={handleInputChange}
                  autoComplete="off"
                  value={product.shipping_fee}
                />
              </InputFrameContainer>
              <label htmlFor="stock">재고</label>
              <InputFrameCntContainer>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  onChange={handleInputChange}
                  autoComplete="off"
                  value={product.stock}
                />
              </InputFrameCntContainer>
            </ProductInfo>
          </ProductAddContainer>
          <ProductDetailContainer>
            <label htmlFor="productInfo">상품 상세 정보</label>
            <textarea
              id="productInfo"
              name="product_info"
              onChange={handleInputChange}
              value={product.product_info}
            />
          </ProductDetailContainer>
          <FormBtnContainer>
            <Button
              type="button"
              width="200px"
              bgcolor="light"
              border="yes"
              content="취소"
            />
            <Button
              type="submit"
              width="200px"
              color="white"
              content="저장하기"
            />
          </FormBtnContainer>
        </Form>
      </ProductAddMain>
    </Container>
  );
}

const Container = styled.div`
  ${media.Medium`
    padding: 0 10px;
  `}
  ${media.Small`
    padding: 0;
    font-size: 0.9rem;
  `}
`;
const Title = styled.h3`
  font-size: 2.25em;
  font-weight: 700;
  margin: 44px 0 42px;
`;
const ProductAddMain = styled.div`
  display: flex;
  gap: 80px;
  ${media.Medium`
    gap: 40px;
  `}
  ${media.Small`
    flex-direction: column;
  `}
`;
const ProductCautionContainer = styled.div`
  /* max-width: 320px; */
  width: 30%;
  ${media.Small`
    width: 100%;
  `}
`;
const ProductCautionTitle = styled.p`
  margin-bottom: 10px;
  font-size: 1em;
  font-weight: 500;
  color: var(--price-point-color);
`;
const ProductCautionContent = styled.div`
  padding: 20px;
  background-color: #ffefe8;
  li {
    list-style-type: "- ";
    font-size: 0.875em;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;
const Form = styled.form`
  width: 70%;
  ${media.Small`
    width: 100%;
  `}
`;
const ProductAddContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 40px;
  label {
    display: block;
    color: var(--content-color-dark);
    font-size: 1em;
    font-weight: 400;
  }
  ${media.Small`
    flex-direction: column;
  `}
`;
const ProductImg = styled.div`
  width: 100%;
  /* aspect-ratio: 1/1; */
  label {
    margin-bottom: 10px;
  }
  input {
    display: none;
  }
`;
const ProductImgInputContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  border: 1px solid var(--content-color-light);
  ${media.Small`
    width: 100%;
  `}
`;
const ProductImgInputBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ProductImgPreview = styled.img`
  position: absolute;
  /* top: 1px;
  left: 1px; */
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  cursor: pointer;
  /* border: 1px solid var(--content-color-light); */
`;
const ProductInfo = styled.div`
  width: 50%;
  ${media.Small`
    width: 100%;
    input {
      width: 100%;
      }
  `}
`;
const ProductNameInput = styled.input`
  padding: 16px 17px;
  border-radius: 5px;
  border: 1px solid var(--content-color-light);
  margin: 10px 0 16px;
  font-size: 1em;
`;
const InputFrameContainer = styled.div`
  background: url(${Frame}) no-repeat center;
  margin: 10px 0 16px;
  width: 220px;
  height: 54px;
  position: relative;
  input {
    font-size: 1em;
    width: 60%;
    transform: translate(17px, 5px);
    padding: 12px 0;
    background-color: transparent;
  }
  &::after {
    content: "원";
    position: absolute;
    top: 35%;
    right: 9%;
    color: #fff;
    font-size: 1em;
  }
`;
const InputFrameCntContainer = styled(InputFrameContainer)`
  &::after {
    content: "개";
  }
`;
const DeliveryBtnContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0 16px;
  ${media.Medium`
    flex-direction: column;
  `}
  ${media.Small`
    flex-direction: row;
    `}
`;
const ProductDetailContainer = styled.div`
  margin-top: 40px;
  label {
    color: var(--content-color-dark);
    font-size: 1em;
  }
  textarea {
    margin-top: 10px;
    width: 100%;
    height: 400px;
    border-radius: 5px;
    border: 1px solid var(--content-color-light);
    padding: 16px 17px;
    /* background: #f2f2f2; */
    /* text-align: center; */
    font-size: 1.25em;
    /* line-height: 400px; */
    /* color: var(--content-color-light); */
  }
`;
const FormBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin: 50px 0;
`;
