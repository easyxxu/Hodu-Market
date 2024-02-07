// import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { loginApi } from "../../apis/authApi";
import useModal from "../../hooks/useModal";
import { Button } from "../common/Button/Button";
import { modalsList } from "../common/Modal/Modals";
import { media } from "../style/media";

interface FormValue {
  username: string;
  password: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    // control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onBlur",
  });
  const [loginType, setLoginType] = useState("BUYER");
  const { openModal } = useModal();

  const handleNoFeature = () => {
    openModal(modalsList.noFeature);
  };
  // 로그인 타입 설정
  const handleLoginTypeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (button.name === "buyer") {
      setLoginType("BUYER");
    } else if (button.name === "seller") {
      setLoginType("SELLER");
    }
  };

  const onSumbmitHandler: SubmitHandler<FormValue> = async ({
    username,
    password,
  }) => {
    const formData = {
      username,
      password,
      login_type: loginType,
    };

    try {
      const res = await loginApi(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_type", res.data.user_type);
      navigate("/");
    } catch (err) {
      setError("username", {
        type: "manual",
        message: "아이디 또는 비밀번호가 틀렸습니다.",
      });
    }
  };
  return (
    <LoginContainer>
      <h2 className="a11y-hidden">로그인</h2>
      <LoginTypeBtn>
        <BuyerLoginBtn
          name="buyer"
          onClick={handleLoginTypeChange}
          $active={loginType === "BUYER" ? "active" : "inactive"}
        >
          구매회원 로그인
        </BuyerLoginBtn>
        <SellerLoginBtn
          name="seller"
          onClick={handleLoginTypeChange}
          $active={loginType === "SELLER" ? "active" : "inactive"}
        >
          판매회원 로그인
        </SellerLoginBtn>
      </LoginTypeBtn>
      <LoginFormContainer onSubmit={handleSubmit(onSumbmitHandler)}>
        <label htmlFor="username" className="a11y-hidden" />
        <input
          {...register("username", {
            required: "아이디를 입력해주세요.",
          })}
          type="text"
          id="username"
          name="username"
          placeholder="아이디"
        />
        <label htmlFor="password" className="a11y-hidden" />
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
        />
        <ErrorMsg>
          {errors.username?.message?.toString() ||
            errors.password?.message?.toString()}
        </ErrorMsg>
        <Button type="submit" size="large" color="point" children="로그인" />
      </LoginFormContainer>
      <LoginLinkContainer>
        <Link to="/join">회원가입</Link>
        <button type="button" onClick={handleNoFeature}>
          비밀번호 찾기
        </button>
      </LoginLinkContainer>
      {/* <DevTool control={control} /> */}
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 550px;
  margin: 50px auto;
  ${media.Small`
    width: 350px;
  `}
`;
const LoginTypeBtn = styled.div`
  display: flex;
  button {
    width: 50%;
    font-size: 1.125em;
    padding: 20px 76px 38px;
  }
  ${media.Small`
    button{
      padding: 10px 20px 30px;
    }
  `}
`;
const BuyerLoginBtn = styled.button<{ $active: string }>`
  ${(props) =>
    props.$active === "active"
      ? css`
          z-index: 2;
          background-color: #fff;
          border-top: 1px solid #c4c4c4;
          border-left: 1px solid #c4c4c4;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        `
      : css`
          background-color: #f2f2f2;
          border: 1px solid #c4c4c4;
          border-radius: 10px;
        `}
`;
const SellerLoginBtn = styled.button<{ $active: string }>`
  ${(props) =>
    props.$active === "active"
      ? css`
          z-index: 2;
          background-color: #fff;
          border-top: 1px solid #c4c4c4;
          border-right: 1px solid #c4c4c4;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        `
      : css`
          background-color: #f2f2f2;
          border: 1px solid #c4c4c4;
          border-radius: 10px;
        `}
`;
const LoginFormContainer = styled.form`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #c4c4c4;
  padding: 34px 35px 36px;
  border-radius: 10px;
  transform: translateY(-20px);
  position: relative;
  z-index: 1;
  margin-bottom: 30px;
  input {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 20px 0;
    &:focus {
      border-bottom: 1px solid #21bf48;
    }
  }
  input:first-of-type {
    margin-bottom: 6px;
  }
  button {
    margin-top: 36px;
  }
  ${media.Small`
  padding: 17px 17.5px 18px;
  margin-bottom: 15px;
    button{
      width: 100%;
      margin-top: 10px;
    }
  `}
`;
const LoginLinkContainer = styled.div`
  text-align: center;
  position: relative;
  a {
    color: #333;
    &:first-of-type {
      margin-right: 33px;
      &::after {
        content: "|";
        position: absolute;
        transform: translate(15px, 2px);
      }
    }
  }
  button {
    color: #333;
    font-size: var(--font-sm);
    font-weight: 400;
  }
`;
const ErrorMsg = styled.small`
  color: var(--price-point-color);
  align-self: flex-start;
  margin-top: 26px;
`;
