import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { CART_STATE } from "../../pages/Cart/Cart";
import { Button } from "../common/Button/Button";
interface Props {
  cartState: string | undefined;
}

export function CartContent({ cartState }: Props) {
  const navigate = useNavigate();
  const goLogin = () => navigate("/login");

  return (
    <Container>
      {cartState === CART_STATE.NOT_LOGGED_IN && (
        <CartNoLogin onGoLogin={goLogin} />
      )}
      {cartState === CART_STATE.SELLER_LOGGED_IN && (
        <CartLoginSeller onGoLogin={goLogin} />
      )}
      {cartState === CART_STATE.EMPTY_CART && <CartNoItemBuyer />}
    </Container>
  );
}
interface onGoProps {
  onGoLogin: () => void;
}
function CartNoLogin({ onGoLogin }: onGoProps) {
  return (
    <>
      <p>로그인을 해야 장바구니에 담을 수 있어요!</p>
      <Button
        type="button"
        size="medium"
        color="point"
        $customStyle={{ padding: "10px 0", fontSize: "16px" }}
        children="로그인 / 회원가입 하러가기"
        onClick={onGoLogin}
      />
    </>
  );
}

function CartNoItemBuyer() {
  return (
    <>
      <p>장바구니에 담긴 상품이 없습니다.</p>
      <p>원하는 상품을 담아보세요.</p>
    </>
  );
}

function CartLoginSeller({ onGoLogin }: onGoProps) {
  return (
    <>
      <p>구매회원으로 로그인해주세요.</p>
      <Button
        type="button"
        size="medium"
        color="point"
        $customStyle={{ padding: "10px 0", fontSize: "16px" }}
        children="로그인 / 회원가입 하러가기"
        onClick={onGoLogin}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 200px 0;
  p {
    font-size: 18px;
    text-align: center;
    &:last-child {
      color: var(--content-color-dark);
    }
  }
`;
