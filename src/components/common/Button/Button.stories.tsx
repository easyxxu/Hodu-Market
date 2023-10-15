import type { Meta, Story } from "@storybook/react";
import React from "react";
import { styled } from "styled-components";
import Icon from "../../Icon/Icon";
import { action } from "@storybook/addon-actions";
import { Button, ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} as Meta;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const handleClick = () => {
  console.log("hello");
};
export const Large = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="large"
        color="point"
        children="Button"
        onClick={action("handleClick")}
      />
      <Button
        type="button"
        size="large"
        color="point"
        children="Button"
        disabled
      />
    </Wrapper>
  );
};

export const Medium = () => {
  return (
    <Wrapper>
      <Button type="button" size="medium" color="point" children="Button" />
      <Button type="button" size="medium" color="dark" children="Button" />
      <Button
        type="button"
        size="medium"
        color="point"
        children="Button"
        disabled
      />
      <Button type="button" size="medium" color="white" children="Button" />
    </Wrapper>
  );
};

export const MediumSmall = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="medium_small"
        color="point"
        children="Button"
      />
      <Button
        type="button"
        size="medium_small"
        color="point"
        children="Button"
        disabled
      />
      <Button
        type="button"
        size="medium_small"
        color="white"
        children="Button"
      />
    </Wrapper>
  );
};

export const Small = () => {
  return (
    <Wrapper>
      <Button type="button" size="small" color="point" children="Button" />
      <Button
        type="button"
        size="small"
        color="point"
        children="Button"
        disabled
      />
      <Button type="button" size="small" color="white" children="Button" />
    </Wrapper>
  );
};

export const withIcon = () => {
  return (
    <Wrapper>
      <Button type="button" size="medium_small" color="point">
        <Icon icon="plus" />
        상품업로드
      </Button>
      <Button type="button" size="medium_small" color="point">
        <Icon icon="shoppingbag" />
        판매자센터
      </Button>
    </Wrapper>
  );
};

export const customButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="large"
        color="point"
        customStyle={{ width: "416px" }}
      >
        바로구매
      </Button>
      <Button
        type="button"
        size="large"
        color="dark"
        customStyle={{ width: "200px" }}
      >
        장바구니
      </Button>
      <Button
        type="button"
        size="medium_small"
        color="point"
        customStyle={{ width: "122px" }}
      >
        중복확인
      </Button>
      <Button
        type="button"
        size="small"
        color="point"
        customStyle={{ width: "130px" }}
      >
        주문하기
      </Button>
    </Wrapper>
  );
};

export const myPageButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        customStyle={{ width: "150px" }}
        color="point"
        size="small"
      >
        로그아웃
      </Button>
    </Wrapper>
  );
};
export const errorPageButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="large"
        color="point"
        customStyle={{ width: "200px" }}
        children="메인으로"
      />
      <Button
        type="button"
        size="large"
        color="white"
        customStyle={{ width: "200px" }}
        children="이전 페이지"
      />
    </Wrapper>
  );
};
export const CartPageButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="medium_small"
        color="light"
        children="전체삭제"
      />
      <Button type="button" size="medium" color="point" children="주문하기" />
    </Wrapper>
  );
};
export const ProductAddButton = () => {
  const [active, setActive] = React.useState(false);
  return (
    <Wrapper>
      <Button
        type="button"
        name="DELEVERY"
        id="deliveryMethod"
        size="medium"
        color={active ? "white" : "point"}
        customStyle={{ fontSize: "16px" }}
        children="택배, 소포, 등기"
        onClick={() => setActive(!active)}
      />
      <Button
        type="button"
        size="medium"
        color="white"
        customStyle={{ fontSize: "16px" }}
        children="직접배송(화물배달)"
      />
      <Button
        type="button"
        size="small"
        color="white"
        customStyle={{ width: "200px" }}
        children="취소"
      />
      <Button
        type="submit"
        size="small"
        color="point"
        customStyle={{ width: "200px" }}
        children="저장하기"
      />
    </Wrapper>
  );
};
export const SellerDashboardButton = () => {
  return (
    <Button
      type="button"
      size="medium_small"
      color="point"
      customStyle={{ padding: "10px 0", fontWeight: "500" }}
    >
      <Icon icon="plus" />
      상품업로드
    </Button>
  );
};
export const DashboardItemButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="small"
        color="point"
        children="수정"
        customStyle={{ width: "80px" }}
      />
      <Button
        type="button"
        size="small"
        color="white"
        children="삭제"
        customStyle={{ width: "80px" }}
      />
    </Wrapper>
  );
};
export const ProductDetailButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="large"
        color="point"
        children="품절"
        disabled
      />
      <Button type="button" size="large" color="point" children="바로구매" />
      <Button type="button" size="large" color="white" children="장바구니" />
    </Wrapper>
  );
};
export const PaymentButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="medium_small"
        color="white"
        children="주문자 정보와 동일"
      />
      <Button
        type="button"
        size="small"
        color="point"
        customStyle={{ width: "154px" }}
        children="우편번호 조회"
      />
      <Button
        type="submit"
        size="large"
        color="point"
        customStyle={{ width: "418px" }}
        children="결제하기"
      />
    </Wrapper>
  );
};
export const OrderDetailButton = () => {
  return (
    <Button type="button" size="medium" color="light" children="뒤로가기" />
  );
};
export const ModalButton = () => {
  return (
    <Wrapper>
      <Button
        type="button"
        size="small"
        color="point"
        customStyle={{ width: "130px" }}
        children="계속 쇼핑하기"
      />
      <Button
        type="button"
        size="small"
        color="white"
        customStyle={{ width: "130px" }}
        children="장바구니 가기"
      />
      <Button type="button" size="small" color="white" children="아니오" />
      <Button type="button" size="small" color="point" children="예" />
    </Wrapper>
  );
};
export const HeaderButton = () => {
  return (
    <Button type="button" size="medium_small" color="point">
      <Icon icon="shoppingbag" />
      판매자센터
    </Button>
  );
};
export const CartItemButton = () => {
  return (
    <Button
      type="button"
      size="small"
      color="point"
      customStyle={{ width: "130px" }}
      children="주문하기"
    />
  );
};
export const CartContentButton = () => {
  return (
    <Button
      type="button"
      size="medium"
      color="point"
      customStyle={{ padding: "10px 0", fontSize: "16px" }}
      children="로그인 / 회원가입 하러가기"
    />
  );
};
export const LoginFormButton = () => {
  return <Button type="submit" size="large" color="point" children="로그인" />;
};
export const JoinFormButton = () => {
  return (
    <Wrapper>
      <Button type="button" size="small" color="point" children="중복확인" />
      <Button type="button" size="small" color="point" children="인증" />
      <Button type="submit" size="large" color="point" children="가입하기" />
    </Wrapper>
  );
};

// Story 작성 방법2
// const Template: Story<ButtonProps> = (args) => {
//   return <Button {...args} />;
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   color: "point",
//   children: "Button",
// };
// export const Medium = Template.bind({});
// Medium.args = {
//   size: "medium",
//   children: "Button",
// };

// export const MediumSmall = Template.bind({});
// MediumSmall.args = {
//   size: "medium_small",
//   color: "point",
//   children: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   color: "point",
//   children: "Button",
// };
