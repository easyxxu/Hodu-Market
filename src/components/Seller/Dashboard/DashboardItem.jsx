import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button } from "../../common/Button/Button";
export default function DashboardItem({
  image,
  productName,
  productId,
  stock,
  price,
}) {
  const navigate = useNavigate();
  const productPrice = price.toLocaleString("ko-KR");
  const handleProductModify = () => {
    navigate(`/sellercenter/addproduct`, {
      state: { productId, type: "modify" },
    });
  };
  return (
    <tr>
      <td>
        <ProductInfo>
          <img src={image} alt="상품이미지" />
          <div>
            <p>{productName}</p>
            <p>재고: {stock}개</p>
          </div>
        </ProductInfo>
      </td>
      <td>{productPrice}원</td>
      <td>
        <Button
          width="70px"
          color="white"
          content="수정"
          onClick={handleProductModify}
        />
      </td>
      <td>
        <Button width="70px" bgcolor="light" border="yes" content="삭제" />
      </td>
    </tr>
  );
}
const ProductInfo = styled.div`
  padding: 16px 30px;
  display: flex;
  align-items: center;
  gap: 30px;
  div {
    p:first-child {
      margin-bottom: 10px;
    }
    p:last-child {
      color: var(--content-color-dark);
    }
  }
`;
