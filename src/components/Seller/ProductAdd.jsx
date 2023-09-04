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
export default function ProductAdd() {
  const [product, setProduct] = useState({
    product_name: "",
    image: "",
    price: 0,
    shipping_method: "DELIVERY",
    shipping_fee: 0,
    stock: 0,
    product_info: "",
  });
  const inputImgRef = useRef(null);
  const [shippingMethod, setShippingMethod] = useState(product.shipping_method);
  const [imgPrev, setImgPrev] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state.type;
  const productId = location.state.productId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "add") {
        await productAddApi(product);
        console.log("상품등록 성공");
      } else if (type === "modify") {
        await productModifyApi(productId, product);
        console.log("상품수정 성공");
      }
      navigate("/sellercenter");
    } catch (err) {
      console.error("submit 에러: ", err.response.data);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // price, shipping_fee, stock 속성은 숫자로 변환하여 저장
    let parsedValue = value;
    if (name === "price" || name === "shipping_fee" || name === "stock") {
      parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        parsedValue = 0; // 숫자로 변환할 수 없는 경우 기본값으로 0 설정
      }
    }

    setProduct({ ...product, [name]: parsedValue });
  };

  const handleImgChange = () => {
    const file = inputImgRef.current.files[0];
    // 파일 객체가 없는 경우 함수 종료
    if (!file) {
      return;
    }
    console.log(file);
    setProduct({ ...product, image: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPrev(reader.result);
    };
  };
  const onClickInput = () => {
    inputImgRef.current.click();
  };
  const handleShippingMethod = (e) => {
    if (e.target.textContent === "택배, 소포, 등기") {
      setProduct({ ...product, shipping_method: "DELIVERY" });
      setShippingMethod("DELIVERY");
    } else {
      setProduct({ ...product, shipping_method: "PARCEL" });
      setShippingMethod("PARCEL");
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

  console.log(product);
  return (
    <div>
      <Title>{type === "add" ? "상품 등록" : "상품 수정"}</Title>
      <ProductAddMain>
        <div>
          <ProductCautionTitle>* 상품 등록 주의사항</ProductCautionTitle>
          <ProductCautionContainer>
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
          </ProductCautionContainer>
        </div>
        <form onSubmit={handleSubmit}>
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
                value={type === "modify" ? product.product_name : ""}
              />
              <label htmlFor="productPrice">판매가</label>
              <InputFrameContainer>
                <input
                  type="text"
                  id="productPrice"
                  name="price"
                  onChange={handleInputChange}
                  autoComplete="off"
                  value={type === "modify" ? product.price : ""}
                />
              </InputFrameContainer>
              <label htmlFor="deliveryMethod">배송방법</label>
              <DeliveryBtnContainer>
                <Button
                  type="button"
                  id="deliveryMethod"
                  content="택배, 소포, 등기"
                  width="L"
                  size="L"
                  border={shippingMethod === "DELIVERY" ? null : "yes"}
                  color={shippingMethod === "DELIVERY" ? "white" : null}
                  bgcolor={shippingMethod === "DELIVERY" ? null : "light"}
                  onClick={handleShippingMethod}
                />
                <Button
                  type="button"
                  id="deliverMethod"
                  content="직접배송(화물배달)"
                  width="L"
                  size="L"
                  border={shippingMethod === "PARCEL" ? null : "yes"}
                  color={shippingMethod === "PARCEL" ? "white" : null}
                  bgcolor={shippingMethod === "PARCEL" ? null : "light"}
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
                  value={type === "modify" ? product.shipping_fee : ""}
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
                  value={type === "modify" ? product.stock : ""}
                />
              </InputFrameCntContainer>
            </ProductInfo>
          </ProductAddContainer>
          <ProductDetailContainer>
            <label htmlFor="productInfo">상품 상세 정보</label>
            <textarea
              type="text"
              id="productInfo"
              name="product_info"
              onChange={handleInputChange}
              value={type === "modify" ? product.product_info : ""}
            />
          </ProductDetailContainer>
          <FormBtnContainer>
            <Button width="200px" bgcolor="light" border="yes" content="취소" />
            <Button width="200px" color="white" content="저장하기" />
          </FormBtnContainer>
        </form>
      </ProductAddMain>
    </div>
  );
}
const Title = styled.h3`
  font-size: 36px;
  font-weight: 700;
  margin: 44px 0 42px;
`;
const ProductAddMain = styled.div`
  display: flex;
  gap: 80px;
`;
const ProductCautionTitle = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  color: var(--price-point-color);
`;
const ProductCautionContainer = styled.div`
  width: 320px;
  height: 346px;
  padding: 20px;
  background-color: #ffefe8;
  li {
    list-style-type: "-";
    font-size: 14px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;
const ProductAddContainer = styled.div`
  display: flex;
  gap: 40px;
  label {
    display: block;
    color: var(--content-color-dark);
    font-size: 16px;
    font-weight: 400;
  }
`;
const ProductImgInputContainer = styled.div`
  width: 454px;
  height: 454px;
  position: relative;
  border: 1px solid var(--content-color-light);
`;
const ProductImg = styled.div`
  label {
    margin-bottom: 10px;
  }
  input {
    display: none;
  }
`;
const ProductImgInputBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ProductImgPreview = styled.img`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 451px;
  height: 451px;
  object-fit: contain;
  cursor: pointer;
  /* border: 1px solid var(--content-color-light); */
`;
const ProductInfo = styled.div``;
const ProductNameInput = styled.input`
  padding: 16px 17px;
  border-radius: 5px;
  border: 1px solid var(--content-color-light);
  margin: 10px 0 16px;
`;
const InputFrameContainer = styled.div`
  background: url(${Frame}) no-repeat center;
  margin: 10px 0 16px;
  width: 220px;
  height: 54px;
  position: relative;
  input {
    font-size: 16px;
    width: 130px;
    height: 30px;
    transform: translate(5px, 0);
    margin: 12px 0;
  }
  &::after {
    content: "원";
    position: absolute;
    top: 35%;
    right: 9%;
    color: #fff;
    font-size: 16px;
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
`;
const ProductDetailContainer = styled.div`
  margin-top: 40px;
  label {
    color: var(--content-color-dark);
    font-size: 16px;
  }
  textarea {
    margin-top: 10px;
    width: 944px;
    height: 400px;
    border-radius: 5px;
    border: 1px solid var(--content-color-light);
    padding: 16px 17px;
    /* background: #f2f2f2; */
    /* text-align: center; */
    font-size: 20px;
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
