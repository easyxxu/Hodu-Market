import React from "react";
import styled, { css, CSSObject } from "styled-components";

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
  /** 접근성 */
  ariaLabel?: string;
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
    margin: 0 0.5em;
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
  ariaLabel,
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
      aria-label={ariaLabel}
    >
      {children}
    </ButtonStyle>
  );
}
