import React from "react";
import styled, { css } from "styled-components";
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
    props.bgColor === "disabled"
      ? "var(--content-color-light)"
      : props.bgColor === "dark"
      ? "var(--content-color-dark)"
      : props.bgColor === "light"
      ? "#fff"
      : "var(--point-color)"};
  color: ${(props) => (props.color === "white" ? "#ffffff" : "#767676")};
  font-size: ${(props) =>
    props.fontSize === "L" ? "24px" : props.fontSize === "M" ? "18px" : "16px"};
  font-weight: ${(props) => (props.fontWeight === "bold" ? "700" : "500")};
  border: ${(props) =>
    props.border === "yes" ? "1px solid var(--content-color-light)" : "none"};
  ${(props) =>
    props.bgColor === "light" &&
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
const TabButtonStyle = styled.button`
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
const TabMenuButtonStyle = styled.button`
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
function Button({
  type,
  content,
  size,
  width,
  bgColor,
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
      bgColor={bgColor}
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

function TabButton({ type, content, onClick }) {
  return (
    <TabButtonStyle type={type} onClick={onClick}>
      {content}
    </TabButtonStyle>
  );
}
function TabMenuButton({ type, content, cnt, onClick }) {
  return (
    <TabMenuButtonStyle type={type} onClick={onClick}>
      {content}
      {cnt && <p>{cnt}</p>}
    </TabMenuButtonStyle>
  );
}
export { Button, TabButton, TabMenuButton };
