import styled from "styled-components";
import { media } from "../style/media";
import Frame from "../../assets/svg/frame.svg";
const Container = styled.div`
  ${media.Medium`
    padding: 0 10px;
  `}
  ${media.Small`
    padding: 0;
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
    font-size: 1.25em;
  }
`;
const FormBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  margin: 50px 0;
`;

export {
  Container,
  Title,
  ProductAddMain,
  ProductCautionContainer,
  ProductCautionTitle,
  ProductCautionContent,
  Form,
  ProductAddContainer,
  ProductImg,
  ProductImgInputContainer,
  ProductImgInputBtn,
  ProductImgPreview,
  ProductInfo,
  ProductNameInput,
  InputFrameContainer,
  InputFrameCntContainer,
  DeliveryBtnContainer,
  ProductDetailContainer,
  FormBtnContainer,
};
