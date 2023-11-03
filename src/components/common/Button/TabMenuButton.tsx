import styled, { css } from "styled-components";
import { media } from "../../style/media";

// TabMenuButton
export const TabMenuButtonStyle = styled.button<TabMenuButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
  background-color: ${(props) =>
    props.active === "on" ? "var(--point-color)" : "#fff"};
  color: ${(props) => (props.active === "on" ? "#fff" : "#000")};
  border-radius: 5px;
  font-size: 1em;
  p {
    width: 20px;
    height: 20px;
    color: #fff;
    font-size: 0.75em;
    border-radius: 50%;
    background-color: var(--price-point-color);
    line-height: 20px;
  }
  ${media.Small`
    padding: 5px 10px;
  `}
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
