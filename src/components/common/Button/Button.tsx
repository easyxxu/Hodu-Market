import React from "react";
import styled, { css } from "styled-components";

//Button
interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  content: string;
  size?: "L" | "M" | "MS" | "S" | undefined;
  width?: string;
  bgcolor?: "disabled" | "dark" | "light";
  color?: "white";
  fontSize?: "L" | "M" | "S";
  fontWeight?: "bold";
  border?: "yes";
  disabled?: boolean;
  img?: string;
  onClick?: () => void;
}
export const ButtonStyle = styled.button<ButtonProps>`
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
}: ButtonProps) {
  return (
    <ButtonStyle
      type={type}
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
      content={content}
    >
      {img && <img src={img} alt="Plus" />}
      {content}
    </ButtonStyle>
  );
}

//TabButton
interface TabButtonProps {
  active: "active" | "unactive";
  content?: string;
  onClick?: () => void;
}
export const TabButtonStyle = styled.button<TabButtonProps>`
  width: 320px;
  box-sizing: content-box;
  padding: 19px 0 18px;
  background-color: #fff;
  border-bottom: 6px solid
    ${(props) => (props.active === "active" ? "var(--point-color)" : "#e0e0e0")};
  font-size: 18px;
  color: ${(props) =>
    props.active === "active"
      ? "var(--point-color)"
      : "var(--content-color-dark)"};
`;

export function TabButton({ active, content, onClick }: TabButtonProps) {
  return (
    <TabButtonStyle active={active} onClick={onClick} type="button">
      {content}
    </TabButtonStyle>
  );
}

// TabMenuButton
export const TabMenuButtonStyle = styled.button<TabMenuButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  padding: 15px 20px;
  background-color: ${(props) =>
    props.active === "on" ? "var(--point-color)" : "#fff"};
  color: ${(props) => (props.active === "on" ? "#fff" : "#000")};
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
    props.active !== "on" &&
    css`
      &:hover {
        background-color: #effff3;
      }
    `}
`;
interface TabMenuButtonProps {
  active: "on" | "off";
  content?: string;
  cnt?: number;
  onClick?: () => void;
}
export function TabMenuButton({
  active,
  content,
  cnt,
  onClick,
}: TabMenuButtonProps) {
  return (
    <TabMenuButtonStyle active={active} onClick={onClick} type="button">
      {content}
      {cnt && <p>{cnt}</p>}
    </TabMenuButtonStyle>
  );
}
