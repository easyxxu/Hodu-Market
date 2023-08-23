import React from "react";
import styled, { css } from "styled-components";
import Minus from "../../../assets/icon-minus-line.svg";
import Plus from "../../../assets/icon-plus-line.svg";
export const ButtonStyle = styled.button`
  display: block;
  border-radius: 5px;
  width: ${(props) =>
    props.width === "L"
      ? "220px"
      : props.width === "M"
      ? "480px"
      : props.width === "MS"
      ? "168px"
      : props.width === "S"
      ? "80px"
      : props.width};
  padding: ${(props) =>
    props.size === "L" || props.size === "M"
      ? "19px 0px"
      : props.size === "MS"
      ? "16px 0px"
      : "10px 0px"};
  background-color: ${(props) =>
    props.bgcolor === "disabled"
      ? "var(--content-color-light)"
      : props.bgcolor === "dark"
      ? "var(--content-color-dark)"
      : props.bgcolor === "light"
      ? "#fff"
      : "var(--point-color)"};
  color: ${(props) => (props.color === "white" ? "#ffffff" : "#767676")};
  font-size: ${(props) =>
    props.fontSize === "L" ? "24px" : props.fontSize === "M" ? "18px" : "16px"};
  font-weight: ${(props) => (props.fontWeight === "bold" ? "700" : "500")};
  border: ${(props) =>
    props.border === "yes" ? "1px solid var(--content-color-light)" : "none"};
  ${(props) =>
    props.bgcolor === "light" &&
    css`
      &:hover {
        border: 1px solid #000;
        color: #000;
      }
    `}
  ${(props) =>
    props.img &&
    css`
      display: flex;
      justify-content: center;
      gap: 8px;
      align-items: center;
      font-size: 18px;
      padding: 11px 0;
    `}
`;
export const CountButtonStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
  padding: 13px;
  width: 150px;
  border: 1px solid var(--content-color-light);
  border-radius: 5px;
  /* margin: 30px 0; */
  button {
    width: 20px;
    height: 20px;
    &:first-child {
      background: url(${Minus}) no-repeat center center;
    }
    &:last-child {
      background: url(${Plus}) no-repeat center center;
    }
  }
  p {
    font-size: 18px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 1px;
      height: 47px;
      top: -14px;
      left: -20px;
      background-color: var(--content-color-light);
    }
    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 47px;
      top: -14px;
      right: -20px;
      background-color: var(--content-color-light);
    }
  }
`;
// const BtnMinus = styled.button`
//   background: url(${Minus}) no-repeat center center;
// `;
// const BtnPlus = styled.button`
//   background: url(${Plus}) no-repeat center center;
// `;
export const TabButtonStyle = styled.button`
  width: 320px;
  box-sizing: content-box;
  padding: 19px 0 18px;
  background-color: #fff;
  border-bottom: 6px solid
    ${(props) => (props.type === "active" ? "var(--point-color)" : "#e0e0e0")};
  font-size: 18px;
  color: ${(props) =>
    props.type === "active"
      ? "var(--point-color)"
      : "var(--content-color-dark)"};
`;
export const TabMenuButtonStyle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  padding: 15px 20px;
  background-color: ${(props) =>
    props.type === "on" ? "var(--point-color)" : "#fff"};
  color: ${(props) => (props.type === "on" ? "#fff" : "#000")};
  border-radius: 5px;
  font-size: 16px;
  p {
    width: 20px;
    height: 20px;
    color: #fff;
    font-size: 12px;
    border-radius: 50%;
    background-color: var(--price-point-color);
    line-height: 20px;
  }
  ${(props) =>
    props.type !== "on" &&
    css`
      &:hover {
        background-color: #effff3;
      }
    `}
`;
export function Button({
  type,
  content,
  size,
  width,
  bgcolor,
  color,
  fontSize,
  fontWeight,
  border,
  disabled,
  img,
  onClick,
}) {
  return (
    <ButtonStyle
      type={type ? "button" : "submit"}
      size={size}
      width={width}
      bgcolor={bgcolor}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      border={border}
      disabled={disabled}
      onClick={onClick}
      img={img}
    >
      {img && <img src={img} alt="Plus" />}
      {content}
    </ButtonStyle>
  );
}
export function CountButton({ onClick1, onClick2, productCnt }) {
  return (
    <CountButtonStyle>
      <button onClick={onClick1} />
      <p>{productCnt}</p>
      <button onClick={onClick2} />
    </CountButtonStyle>
  );
}
export function TabButton({ type, content, onClick }) {
  return (
    <TabButtonStyle type={type} onClick={onClick}>
      {content}
    </TabButtonStyle>
  );
}
export function TabMenuButton({ type, content, cnt, onClick }) {
  return (
    <TabMenuButtonStyle type={type} onClick={onClick}>
      {content}
      {cnt && <p>{cnt}</p>}
    </TabMenuButtonStyle>
  );
}
