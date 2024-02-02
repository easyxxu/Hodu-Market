import styled from "styled-components";
import DeleteBtn from "../../../assets/svg/icon-delete.svg";
const ModalContainer = styled.div`
  width: 360px;
  height: 200px;
  padding: 50px 65px 40px;
  border: 1px solid var(--content-color-light);
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ModalContent = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  font-weight: 400;
  text-align: center;
  line-height: normal;
`;
const NoFeatureContent = styled(ModalContent)`
  margin-top: 30px;
`;
const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  button {
    font-size: 16px;
  }
`;
const ModalCloseBtn = styled.button`
  width: 22px;
  height: 22px;
  background: url(${DeleteBtn}) no-repeat center;
  position: absolute;
  top: 18px;
  right: 18px;
`;

export {
  ModalContainer,
  ModalContent,
  NoFeatureContent,
  BtnContainer,
  ModalCloseBtn,
};
