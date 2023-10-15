import { styled } from "styled-components";

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
