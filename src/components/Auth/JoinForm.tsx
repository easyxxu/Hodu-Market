import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  companyRegistrationNumApi,
  idDuplicateCheckApi,
  signupBuyerApi,
  signupSellerApi,
} from "../../apis/authApi";
import { Button } from "../common/Button/Button";
import * as S from "./JoinFormStyle";
import axios from "axios";
export default function JoinForm() {
  const [buyerInfo, setBuyerInfo] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    phone_number: "",
  });
  const [sellerInfo, setSellerInfo] = useState({
    username: "", // 아이디
    password: "",
    password2: "",
    phone_number: "", // 전화번호는 010으로 시작하는 10~11자리 숫자
    name: "", // 이름
    company_registration_number: "",
    store_name: "",
  });
  const [joinType, setJoinType] = useState("buyer");
  const [idValidErrorMsg, setIdValidErrorMsg] = useState("");
  const [pwValidErrorMsg, setPwValidErrorMsg] = useState("");
  const [pwDoubleCheckErrorMsg, setPwDoubleCheckErrorMsg] = useState("");
  const [companyRegistrationNumMsg, setCompanyRegistrationNumMsg] =
    useState("");
  const [idValid, setIdValid] = useState(false);
  const [idDuplicateValid, setIdDuplicateValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwDoubleValid, setPwDoubleValid] = useState(false);
  const [phoneFirst, setPhoneFirst] = useState<string>("010");
  const [phoneSecond, setPhoneSecond] = useState<string>("");
  const [phoneThird, setPhoneThird] = useState<string>("");
  const [phoneListVisible, setPhoneListVisible] = useState(false);
  const [companyRegistrationNumValid, setCompanyRegistrationNumValid] =
    useState(false);
  const [joinAgree, setJoinAgree] = useState(false);
  const navigate = useNavigate();

  // Form Submit API 통신
  const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (joinType === "buyer") {
        await signupBuyerApi(buyerInfo);
      } else if (joinType === "seller") {
        await signupSellerApi(sellerInfo);
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
      return (
        idValid && idDuplicateValid && pwValid && pwDoubleValid && joinAgree
      );
    } else if (joinType === "seller") {
      return (
        idValid &&
        idDuplicateValid &&
        pwValid &&
        pwDoubleValid &&
        joinAgree &&
        companyRegistrationNumValid
      );
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

  const handlePhoneSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneSecond(e.target.value);
  };

  const handlePhoneThirdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneThird(e.target.value);
  };

  useEffect(() => {
    // 전화번호 업데이트
    const updatePhoneInfo = () => {
      if (phoneFirst && phoneSecond && phoneThird) {
        if (joinType === "buyer") {
          setBuyerInfo({
            ...buyerInfo,
            phone_number: `${phoneFirst}${phoneSecond}${phoneThird}`,
          });
        } else if (joinType === "seller") {
          setSellerInfo({
            ...sellerInfo,
            phone_number: `${phoneFirst}${phoneSecond}${phoneThird}`,
          });
        }
      }
    };
    updatePhoneInfo();
  }, [phoneFirst, phoneSecond, phoneThird]);

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
  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinAgree(e.target.checked);
  };

  // onChange 발생
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (joinType === "buyer") {
      setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
    } else if (joinType === "seller") {
      setSellerInfo({ ...sellerInfo, [e.target.name]: e.target.value });
    }
  };

  // onBlur 발생
  const idValidCheck = (e: React.FocusEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9]{1,20}$/;
    if (!regex.test(e.target.value) && e.target.value.length > 0) {
      setIdValidErrorMsg(
        "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다."
      );
      setIdValid(false);
    } else if (e.target.value.length < 1) {
      setIdValidErrorMsg("필수 정보입니다");
    } else {
      setIdValidErrorMsg("");
      setIdValid(true);
    }
  };
  // ID 중복 검사 API
  const idDuplicateCheck = async (id: string) => {
    try {
      const res = await idDuplicateCheckApi(id);
      if (
        idValidErrorMsg !==
          "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다." &&
        res.data.Success === "멋진 아이디네요 :)"
      ) {
        setIdValidErrorMsg(res.data.Success);
        setIdDuplicateValid(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.FAIL_Message === "이미 사용 중인 아이디입니다.")
          setIdValidErrorMsg(err.response.data.FAIL_Message);
        setIdDuplicateValid(false);
      }
    }
  };
  const pwValidCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(e.target.value) && e.target.value.length > 0) {
      setPwValidErrorMsg("8자 이상, 영문 소문자, 숫자를 사용하세요.");
      setPwValid(false);
      setPwDoubleValid(false);
    } else if (e.target.value.length < 1) {
      setPwValidErrorMsg("필수 정보입니다.");
      setPwValid(false);
      setPwDoubleValid(false);
    } else {
      setPwValidErrorMsg("");
      setPwValid(true);
    }
  };
  // 비밀번호 재확인
  const pwDoubleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (joinType === "buyer") {
      if (
        (buyerInfo.password !== e.target.value &&
          buyerInfo.password.length > 0) ||
        pwValid === false
      ) {
        setPwDoubleCheckErrorMsg("비밀번호가 일치하지 않습니다.");
        setPwDoubleValid(false);
      } else {
        setPwDoubleCheckErrorMsg("");
        setPwDoubleValid(true);
      }
    } else if (joinType === "seller") {
      if (
        (sellerInfo.password !== e.target.value &&
          sellerInfo.password.length > 0) ||
        pwValid === false
      ) {
        setPwDoubleCheckErrorMsg("비밀번호가 일치하지 않습니다.");
        setPwDoubleValid(false);
      } else {
        setPwDoubleCheckErrorMsg("");
        setPwDoubleValid(true);
      }
    }
  };
  // 사업자번호 유효성 체크
  const companyRegisterationNumCheck = async (registerNum: string) => {
    try {
      const res = await companyRegistrationNumApi(registerNum);
      setCompanyRegistrationNumMsg(res.data.Success);
      setCompanyRegistrationNumValid(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("사업자번호 유효성 오류: ", err);
        if (
          err.response?.data.FAIL_Message ===
          "이미 등록된 사업자등록번호입니다."
        ) {
          setCompanyRegistrationNumMsg("이미 등록된 사업자등록번호입니다.");
        } else if (
          err.response?.data.FAIL_Message ===
          "company_registration_number 필드를 추가해주세요 :)"
        ) {
          setCompanyRegistrationNumMsg(
            "company_registration_number 필드를 추가해주세요 :)"
          );
        }
        setCompanyRegistrationNumValid(false);
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
          active={joinType === "buyer" ? "active" : "inactive"}
        >
          구매회원가입
        </S.BuyerJoinBtn>
        <S.SellerJoinBtn
          name="seller"
          onClick={handlerJoinTypeChange}
          active={joinType === "seller" ? "active" : "inactive"}
        >
          판매회원가입
        </S.SellerJoinBtn>
      </S.JoinTypeBtn>
      <S.Form onSubmit={handleSubmitJoin}>
        <S.JoinFormContainer>
          <label htmlFor="id">아이디</label>
          <S.IdContainer>
            <S.SmInput
              name="username"
              id="id"
              type="text"
              autoComplete="off"
              onChange={handleInputChange}
              onBlur={idValidCheck}
              valid={
                idValidErrorMsg.length > 0 && idValid === false
                  ? "false"
                  : "true"
              }
            />
            <Button
              type="button"
              content="중복확인"
              onClick={() =>
                idDuplicateCheck(buyerInfo.username || sellerInfo.username)
              }
            />
          </S.IdContainer>
          <S.ErrorMsg
            valid={
              idValid === true && idDuplicateValid === true ? "success" : "fail"
            }
          >
            {idValidErrorMsg}
          </S.ErrorMsg>
          <label htmlFor="password">
            비밀번호
            <S.CheckIconStyle
              fill={pwValid ? "var(--point-color)" : "#f2f2f2"}
            />
          </label>
          <S.Input
            name="password"
            id="password"
            type="password"
            onChange={handleInputChange}
            onBlur={pwValidCheck}
            valid={pwValidErrorMsg.length > 0 && !pwValid ? "false" : "true"}
          />
          <S.ErrorMsg>{pwValidErrorMsg}</S.ErrorMsg>
          <label htmlFor="password2">
            비밀번호 재확인
            <S.CheckIconStyle
              fill={pwDoubleValid ? "var(--point-color)" : "#f2f2f2"}
            />
          </label>
          <S.Input
            name="password2"
            id="password2"
            type="password"
            onChange={handleInputChange}
            onBlur={pwDoubleCheck}
            valid={
              pwDoubleCheckErrorMsg.length > 0 && !pwDoubleValid
                ? "false"
                : "true"
            }
          />
          <S.ErrorMsg>{pwDoubleCheckErrorMsg}</S.ErrorMsg>
          <label htmlFor="name">이름</label>
          <S.Input
            name="name"
            id="name"
            type="text"
            autoComplete="off"
            onChange={handleInputChange}
          />
          <fieldset>
            <label htmlFor="phone">휴대폰번호</label>
            <S.PhoneContainer>
              <S.PhoneFirstBtn
                type="button"
                id="phone"
                state={phoneListVisible ? "active" : "inactive"}
                onClick={() => setPhoneListVisible(!phoneListVisible)}
              >
                {phoneFirst || "010"}
              </S.PhoneFirstBtn>
              {phoneListVisible && phoneList}
              <S.PhoneInput
                name="phoneSecond"
                value={phoneSecond}
                onChange={handlePhoneSecondChange}
                maxLength={4}
                type="text"
              />
              <S.PhoneInput
                name="phoneThird"
                value={phoneThird}
                onChange={handlePhoneThirdChange}
                maxLength={4}
                type="text"
              />
            </S.PhoneContainer>
          </fieldset>
          {joinType === "seller" && (
            <>
              <label htmlFor="companyRegisterationNum">사업자 등록번호</label>
              <S.SellerContainer>
                <S.SmInput
                  name="company_registration_number"
                  id="companyRegisterationNum"
                  type="text"
                  onChange={handleInputChange}
                  valid={
                    companyRegistrationNumMsg.length > 0 &&
                    companyRegistrationNumValid === false
                      ? "false"
                      : "true"
                  }
                />
                <Button
                  type="button"
                  content="인증"
                  onClick={() =>
                    companyRegisterationNumCheck(
                      sellerInfo.company_registration_number
                    )
                  }
                />
              </S.SellerContainer>
              <S.ErrorMsg
                valid={companyRegistrationNumValid ? "success" : "fail"}
              >
                {companyRegistrationNumMsg}
              </S.ErrorMsg>
              <label htmlFor="storeName">스토어 이름</label>
              <S.Input
                id="storeName"
                type="text"
                name="store_name"
                onChange={handleInputChange}
              />
            </>
          )}
        </S.JoinFormContainer>
        <S.AgreeContainer>
          <S.AgreeInput
            type="checkbox"
            id="agree"
            name="agree"
            // value={joinAgree}
            onChange={handleAgreeChange}
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
          size="M"
          width="100%"
          bgcolor={!handleSubmitBtn() ? "disabled" : undefined}
          color="white"
          fontSize="M"
          fontWeight="bold"
          content="가입하기"
          disabled={!handleSubmitBtn()}
        />
      </S.Form>
    </S.JoinContainer>
  );
}
