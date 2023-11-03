import React from "react";
import styled, { css, CSSObject } from "styled-components";
import { media } from "../../style/media";

//Button
// interface ButtonProps {
//   type: "submit" | "button" | undefined;
//   name?: string;
//   id?: string;
//   content: string;
//   size?: "L" | "M" | "MS" | "S" | undefined;
//   width?: string;
//   bgcolor?: "disabled" | "dark" | "light";
//   color?: "white";
//   fontSize?: "L" | "M" | "S";
//   fontWeight?: "bold";
//   border?: "active";
//   disabled?: boolean;
//   img?: string;
//   onClick?: React.MouseEventHandler<HTMLButtonElement>;
// }

// export const ButtonStyle = styled.button<ButtonProps>`
//   display: block;
//   border-radius: 5px;
//   width: ${(props) =>
//     props.width === "L"
//       ? "480px"
//       : props.width === "M"
//       ? "220px"
//       : props.width === "MS"
//       ? "168px"
//       : props.width === "S"
//       ? "80px"
//       : props.width};
//   padding: ${(props) =>
//     props.size === "L" || props.size === "M"
//       ? "19px 0px"
//       : props.size === "MS"
//       ? "16px 0px"
//       : "10px 0px"};
//   background-color: ${(props) =>
//     props.bgcolor === "disabled"
//       ? "var(--content-color-light)"
//       : props.bgcolor === "dark"
//       ? "var(--content-color-dark)"
//       : props.bgcolor === "light"
//       ? "#fff"
//       : "var(--point-color)"};
//   color: ${(props) => (props.color === "white" ? "#ffffff" : "#767676")};
//   font-size: ${(props) =>
//     props.fontSize === "L" ? "18px" : props.fontSize === "M" ? "24px" : "16px"};
//   font-weight: ${(props) => (props.fontWeight === "bold" ? "700" : "500")};
//   border: ${(props) =>
//     props.border === "active"
//       ? "1px solid var(--content-color-light)"
//       : "none"};
//   ${(props) =>
//     props.bgcolor === "light" &&
//     css`
//       &:hover {
//         border: 1px solid #000;
//         color: #000;
//       }
//     `}
//   ${(props) =>
//     props.img &&
//     css`
//       display: flex;
//       justify-content: center;
//       gap: 8px;
//       align-items: center;
//       font-size: 18px;
//       padding: 11px 0;
//       ${media.Small`
//         padding: 5px 0;
//       `}
//     `}
// `;

// export function Button({
//   type,
//   content,
//   size,
//   width,
//   bgcolor,
//   color,
//   fontSize,
//   fontWeight,
//   border,
//   disabled,
//   img,
//   name,
//   id,
//   onClick,
// }: ButtonProps) {
//   return (
//     <ButtonStyle
//       type={type}
//       size={size}
//       width={width}
//       bgcolor={bgcolor}
//       color={color}
//       fontSize={fontSize}
//       fontWeight={fontWeight}
//       border={border}
//       disabled={disabled}
//       onClick={onClick}
//       img={img}
//       content={content}
//       name={name}
//       id={id}
//     >
//       {img && <img src={img} alt="Plus" />}
//       {content}
//     </ButtonStyle>
//   );
// }
export interface ButtonProps {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /** 클릭했을 때 호출할 함수 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 버튼 타입을 설정 */
  type: "submit" | "button" | undefined;
  /** 버튼 색상을 설정 */
  color: "light" | "dark" | "white" | "point";
  /** 버튼 크기를 설정 */
  size?: "large" | "medium" | "medium_small" | "small";
  /** 버튼 name 속성 */
  name?: string;
  /** 버튼 id 속성 */
  id?: string;
  /** 버튼 비활성화 */
  disabled?: boolean;
  /** 커스텀 속성 */
  $customStyle?: CSSObject;
}

const ButtonStyle = styled.button<ButtonProps>`
  border-radius: 5px;
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ size }) => size && SIZES[size]}
  ${({ color }) => COLORS[color]}
  ${({ $customStyle }) =>
    css`
      ${$customStyle}
    `}
  svg {
    width: 2em;
    margin-right: 1em;
  }
  &:disabled {
    background-color: var(--content-color-light);
  }
`;

const COLORS = {
  light: css`
    background-color: var(--content-color-light);
    &:hover:enabled {
      background-color: var(--content-color-dark);
    }
  `,
  dark: css`
    background-color: var(--content-color-dark);
    &:hover:enabled {
      background-color: var(--content-color-dark-hover);
    }
    /* &:disabled {
      background-color: var(--content-color-light);
    } */
  `,
  white: css`
    background-color: var(--color-white);
    color: var(--content-color-dark);
    border: 1px solid var(--content-color-light);
    &:hover:enabled {
      border: 1px solid var(--content-color-dark);
      color: var(--color-black);
    }
    /* &:disabled {
      background-color: var(--content-color-light);
    } */
  `,
  point: css`
    background-color: var(--point-color);
    /* &:disabled {
      background-color: var(--content-color-light);
    } */
  `,
};

const SIZES = {
  large: css`
    width: 480px;
    padding: 19px 0px;
    font-size: var(--font-md);
    font-weight: 700;
  `,
  medium: css`
    width: 220px;
    padding: 19px 0;
    font-size: var(--font-lg);
    font-weight: 700;
  `,
  medium_small: css`
    width: 168px;
    padding: 16px 0;
    font-size: var(--font-sm);
  `,
  small: css`
    width: 100px;
    padding: 10px 0;
    font-size: var(--font-sm);
  `,
};

export function Button({
  children,
  onClick,
  type,
  color,
  size,
  name,
  disabled,
  $customStyle,
}: ButtonProps) {
  return (
    <ButtonStyle
      type={type}
      size={size}
      color={color}
      name={name}
      disabled={disabled}
      onClick={onClick}
      $customStyle={$customStyle}
    >
      {children}
    </ButtonStyle>
  );
}
