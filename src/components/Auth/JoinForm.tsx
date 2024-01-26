import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import {
  companyRegistrationNumApi,
  idDuplicateCheckApi,
  signupBuyerApi,
  signupSellerApi,
} from "../../apis/authApi";
import { Button } from "../common/Button/Button";
import * as S from "./JoinFormStyle";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
interface FormValue {
  username: string;
  password: string;
  password2: string;
  name: string;
  phoneSecond: string;
  phoneThird: string;
  agree: boolean;
  company_registration_number?: string;
  store_name?: string;
}
let renderCount = 0;
export default function JoinForm() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    getFieldState,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValue>({
    mode: "onBlur",
  });
  console.log("#RenderCnt: ", renderCount);
  const idFieldState = getFieldState("username");
  const pw1FieldState = getFieldState("password");
  const pw2FieldState = getFieldState("password2");
  const companyNumFieldState = getFieldState("company_registration_number");
  const idValid = idFieldState.invalid;
  const pw1Valid = pw1FieldState.invalid;
  const pw1ValidDirty = pw1FieldState.isDirty;
  console.log("#pw1ValidDirty: ", pw1ValidDirty);
  const pw2Valid = pw2FieldState.invalid;
  const pw2ValidDirty = pw2FieldState.isDirty;
  const companyNumValid = companyNumFieldState.invalid;
  const agreeValid = watch("agree");

  const idRegex = /^[a-zA-Z0-9]{1,20}$/;
  const pwRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const idErrorMsg = "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
  const pwErrorMsg = "8자 이상, 영문 소문자, 숫자를 사용하세요.";
  const requiredErrorMsg = "필수 입력입니다.";
  const [idSuccessMsg, setIdSuccessMsg] = useState<string | null>("");
  const [companyNumSuccessMsg, setCompanyNumSuccessMsg] = useState<
    string | null
  >("");
  const [joinAgree, setJoinAgree] = useState(false);

  const [joinType, setJoinType] = useState("buyer");
  const [idDuplicateValid, setIdDuplicateValid] = useState(false);
  const [phoneFirst, setPhoneFirst] = useState<string>("010");
  const [phoneListVisible, setPhoneListVisible] = useState(false);
  const [companyNumCheckValid, setCompanyNumCheckValid] = useState(false);

  const navigate = useNavigate();
  // Form Submit API 통신
  const onSubmitHandler: SubmitHandler<FormValue> = async (data) => {
    console.log(data);
    const {
      username,
      password,
      password2,
      name,
      phoneSecond,
      phoneThird,
      company_registration_number,
      store_name,
    } = data;
    try {
      if (joinType === "buyer") {
        const res = await signupBuyerApi({
          username: username,
          password: password,
          password2: password2,
          name: name,
          phone_number: `${phoneFirst}${phoneSecond}${phoneThird}`,
        });
        console.log(res);
      } else if (joinType === "seller") {
        await signupSellerApi({
          username: username,
          password: password,
          password2: password2,
          name: name,
          phone_number: `${phoneFirst}${phoneSecond}${phoneThird}`,
          company_registration_number: company_registration_number,
          store_name: store_name,
        });
      }
      navigate("/login");
      // console.log("회원가입 성공!");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("회원가입 오류", err);
        alert(err.response?.data.phone_number[0]);
      }
    }
  };

  // 모든 input값 유효하다면 버튼 활성화
  const handleSubmitBtn = () => {
    if (joinType === "buyer") {
      return isValid && idDuplicateValid && agreeValid;
    } else if (joinType === "seller") {
      return isValid && idDuplicateValid && companyNumCheckValid && agreeValid;
    }
  };

  // 회원가입 타입 설정
  const handlerJoinTypeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (button.name === "buyer") {
      setJoinType("buyer");
    } else if (button.name === "seller") {
      setJoinType("seller");
    }
  };
  // 전화번호 설정
  const handlePhoneListItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    setPhoneFirst(button.textContent!);
    setPhoneListVisible(false);
  };

  const phoneFirstList = ["010", "011", "016", "017", "018", "019"];

  const phoneList = (
    <ul>
      {phoneFirstList.map((phonePrefix) => (
        <li key={phonePrefix}>
          <button type="button" onClick={handlePhoneListItemClick}>
            {phonePrefix}
          </button>
        </li>
      ))}
    </ul>
  );

  // ID 중복 검사 API
  const idDuplicateCheck = async () => {
    const id = getValues("username");
    try {
      const res = await idDuplicateCheckApi(id);
      if (res.data.Success === "멋진 아이디네요 :)") {
        setIdSuccessMsg(res.data.Success);
        setIdDuplicateValid(true);
        return true;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          err.response?.data.FAIL_Message === "이미 사용 중인 아이디입니다."
        ) {
          setIdSuccessMsg(null);
          setError("username", {
            type: "manual",
            message: err.response.data.FAIL_Message,
          });
        }
      }
      return false;
    }
  };

  // 비밀번호 재확인
  function pwDoubleCheck(value: string) {
    const confirmPassword = getValues("password");
    if (confirmPassword.length === 0) return false;
    return confirmPassword === value;
  }

  // 사업자번호 유효성 체크
  const companyRegisterationNumCheck = async () => {
    const companyRegisterNum = getValues("company_registration_number");
    if (companyRegisterNum === undefined) return;
    try {
      const res = await companyRegistrationNumApi(companyRegisterNum);
      setCompanyNumSuccessMsg(res.data.Success);
      setCompanyNumCheckValid(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.FAIL_Message) {
          setCompanyNumSuccessMsg(null);
          setError("company_registration_number", {
            type: "manual",
            message: err.response.data.FAIL_Message,
          });
        }
      }
    }
  };

  return (
    <S.JoinContainer>
      <h1 className="a11y-hidden">회원가입</h1>
      <S.JoinTypeBtn>
        <S.BuyerJoinBtn
          name="buyer"
          onClick={handlerJoinTypeChange}
          $active={joinType === "buyer" ? "active" : "inactive"}
        >
          구매회원가입
        </S.BuyerJoinBtn>
        <S.SellerJoinBtn
          name="seller"
          onClick={handlerJoinTypeChange}
          $active={joinType === "seller" ? "active" : "inactive"}
        >
          판매회원가입
        </S.SellerJoinBtn>
      </S.JoinTypeBtn>
      <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
        <S.JoinFormContainer>
          <label htmlFor="id">아이디</label>
          <S.IdContainer>
            <S.SmInput
              {...register("username", {
                required: requiredErrorMsg,
                pattern: { value: idRegex, message: idErrorMsg },
              })}
              type="text"
              id="id"
              autoComplete="off"
              $valid={!idValid}
            />
            <Button
              type="button"
              size="small"
              color="point"
              children="중복확인"
              onClick={idDuplicateCheck}
            />
          </S.IdContainer>
          <S.ErrorMsg $valid={!!idSuccessMsg}>
            {idSuccessMsg ||
              (errors.username && errors.username.message?.toString())}
          </S.ErrorMsg>
          <label htmlFor="password">
            비밀번호
            <S.CheckIconStyle
              fill={
                !pw1Valid && pw1ValidDirty ? "var(--point-color)" : "#f2f2f2"
              }
            />
          </label>
          <S.Input
            {...register("password", {
              required: requiredErrorMsg,
              pattern: { value: pwRegex, message: pwErrorMsg },
            })}
            type="password"
            id="password"
            $valid={!pw1Valid}
          />
          <S.ErrorMsg>
            {errors.password && errors.password.message?.toString()}
          </S.ErrorMsg>
          <label htmlFor="password2">
            비밀번호 재확인
            <S.CheckIconStyle
              fill={
                !pw2Valid && pw2ValidDirty ? "var(--point-color)" : "#f2f2f2"
              }
            />
          </label>
          <S.Input
            {...register("password2", {
              required: requiredErrorMsg,
              validate: pwDoubleCheck,
            })}
            type="password"
            id="password2"
            $valid={!pw2Valid}
          />
          <S.ErrorMsg>
            {errors.password2 && errors.password2.message?.toString()}
          </S.ErrorMsg>
          <label htmlFor="name">이름</label>
          <S.Input
            {...register("name", {
              required: true,
            })}
            type="text"
            id="name"
            autoComplete="off"
          />
          <fieldset>
            <label htmlFor="phone">휴대폰번호</label>
            <S.PhoneContainer>
              <S.PhoneFirstBtn
                type="button"
                id="phone"
                $state={phoneListVisible ? "active" : "inactive"}
                onClick={() => setPhoneListVisible(!phoneListVisible)}
              >
                {phoneFirst}
              </S.PhoneFirstBtn>
              {phoneListVisible && phoneList}
              <S.PhoneInput
                {...register("phoneSecond", {
                  required: true,
                  maxLength: 4,
                })}
                type="text"
                maxLength={4}
              />
              <S.PhoneInput
                {...register("phoneThird", {
                  required: true,
                  maxLength: 4,
                })}
                type="text"
                maxLength={4}
              />
            </S.PhoneContainer>
          </fieldset>
          {joinType === "seller" && (
            <>
              <label htmlFor="companyRegisterationNum">사업자 등록번호</label>
              <S.SellerContainer>
                <S.SmInput
                  {...register("company_registration_number", {
                    required: requiredErrorMsg,
                  })}
                  type="text"
                  id="companyRegisterationNum"
                  $valid={!companyNumValid}
                  minLength={10}
                  maxLength={10}
                />
                <Button
                  type="button"
                  size="small"
                  color="point"
                  children="인증"
                  onClick={companyRegisterationNumCheck}
                />
              </S.SellerContainer>
              <S.ErrorMsg $valid={!!companyNumSuccessMsg}>
                {companyNumSuccessMsg ||
                  (errors.company_registration_number &&
                    errors.company_registration_number.message?.toString())}
              </S.ErrorMsg>
              <label htmlFor="storeName">스토어 이름</label>
              <S.Input
                {...register("store_name", {
                  required: true,
                })}
                type="text"
                id="storeName"
              />
            </>
          )}
        </S.JoinFormContainer>
        <S.AgreeContainer>
          <S.AgreeInput
            {...register("agree", { required: true })}
            checked={joinAgree}
            onChange={(e) => {
              setJoinAgree(e.target.checked);
              setValue("agree", e.target.checked, { shouldValidate: true });
            }}
            type="checkbox"
            id="agree"
            required
          />
          <S.AgreeLabel htmlFor="agree">
            <div>
              호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에
              대한 내용을 확인하였고 동의합니다.
            </div>
          </S.AgreeLabel>
        </S.AgreeContainer>
        <Button
          type="submit"
          size="large"
          color="point"
          $customStyle={{ width: "100%" }}
          children="가입하기"
          disabled={!handleSubmitBtn() ? true : false}
        />
      </S.Form>
      {/* <DevTool control={control} /> */}
    </S.JoinContainer>
  );
}
