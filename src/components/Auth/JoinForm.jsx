// import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { idDuplicateCheckApi, signupBuyerApi } from "../../apis/signupApi";
import { Button } from "../common/Button/Button";
import * as S from "./JoinFormStyle";
export default function JoinForm() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    password2: "",
    name: "",
    phone_number: "",
  });
  const [idValidErrorMsg, setIdValidErrorMsg] = useState("");
  const [pwValidErrorMsg, setPwValidErrorMsg] = useState("");
  const [pwDoubleCheckErrorMsg, setPwDoubleCheckErrorMsg] = useState("");
  const [idValid, setIdValid] = useState(false);
  const [idDuplicateValid, setIdDuplicateValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwDoubleValid, setPwDoubleValid] = useState(false);
  const [phoneFirst, setPhoneFirst] = useState("010");
  const [phoneSecond, setPhoneSecond] = useState("");
  const [phoneThird, setPhoneThird] = useState("");
  const [phoneListVisible, setPhoneListVisible] = useState(false);
  const [joinAgree, setJoinAgree] = useState(false);
  // const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signupBuyerApi(userInfo);
    console.log(res);
  };
  console.log(userInfo);
  const handleSubmitBtn = () => {
    return idValid && idDuplicateValid && pwValid && pwDoubleValid && joinAgree;
  };

  const updatePhoneInfo = () => {
    console.log("실행됨", phoneFirst, phoneSecond, phoneThird);
    if (phoneFirst && phoneSecond && phoneThird) {
      setUserInfo({
        ...userInfo,
        phone_number: `${phoneFirst}${phoneSecond}${phoneThird}`,
      });
    }
  };

  const handlePhoneListItemClick = (e) => {
    setPhoneFirst(e.target.textContent);
    setPhoneListVisible(false);
    updatePhoneInfo(); // 호출 추가
  };

  const handlePhoneSecondChange = (e) => {
    setPhoneSecond(e.target.value);
    updatePhoneInfo(); // 호출 추가
  };

  const handlePhoneThirdChange = (e) => {
    setPhoneThird(e.target.value);
    updatePhoneInfo(); // 호출 추가
  };
  const handleAgreeChange = (e) => {
    setJoinAgree(e.target.checked);
  };

  // onChange 발생
  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const phoneFirstList = ["010", "011", "016", "017", "018", "019"];

  const phoneList = (
    <ul>
      {phoneFirstList.map((phonePrefix) => (
        <li key={phonePrefix} onClick={handlePhoneListItemClick}>
          {phonePrefix}
        </li>
      ))}
    </ul>
  );

  // onBlur 발생
  const idValidCheck = (e) => {
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
  const idDuplicateCheck = async (id) => {
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
      if (err.response.data.FAIL_Message === "이미 사용 중인 아이디입니다.")
        setIdValidErrorMsg(err.response.data.FAIL_Message);
      setIdDuplicateValid(false);
    }
  };
  const pwValidCheck = (e) => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(e.target.value) && e.target.value.length > 0) {
      console.log(e.target.value, regex.test(e.target.value));
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

  const pwDoubleCheck = (e) => {
    if (userInfo.password !== e.target.value && userInfo.password.length > 0) {
      setPwDoubleCheckErrorMsg("비밀번호가 일치하지 않습니다.");
      setPwDoubleValid(false);
    } else if (pwValidErrorMsg === "필수 정보입니다.") {
      setPwDoubleCheckErrorMsg("비밀번호가 일치하지 않습니다.");
      setPwDoubleValid(false);
    } else {
      setPwDoubleCheckErrorMsg("");
      setPwDoubleValid(true);
    }
  };
  // console.log("userInfo", userInfo);
  return (
    <S.JoinContainer>
      <h1 className="a11y-hidden">회원가입</h1>
      <S.JoinTypeBtn>
        <S.BuyerJoinBtn>구매회원가입</S.BuyerJoinBtn>
        <S.SellerJoinBtn>판매회원가입</S.SellerJoinBtn>
      </S.JoinTypeBtn>
      <S.Form>
        <S.JoinFormContainer>
          <label htmlFor="id">아이디</label>
          <S.IdContainer
            valid={
              idValidErrorMsg.length > 0 && idValid === false ? "false" : null
            }
          >
            <input
              name="username"
              id="id"
              type="text"
              onChange={handleInputChange}
              onBlur={idValidCheck}
            />
            <Button
              type="button"
              content="중복확인"
              onClick={() => idDuplicateCheck(userInfo.username)}
            />
          </S.IdContainer>
          <S.ErrorMsg
            valid={
              idValid === true && idDuplicateValid === true ? "success" : null
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
          <input
            name="password"
            id="password"
            type="password"
            onChange={handleInputChange}
            onBlur={pwValidCheck}
          />
          <S.ErrorMsg>{pwValidErrorMsg}</S.ErrorMsg>
          <label htmlFor="password2">
            비밀번호 재확인
            <S.CheckIconStyle
              fill={pwDoubleValid ? "var(--point-color)" : "#f2f2f2"}
            />
          </label>
          <input
            name="password2"
            id="password2"
            type="password"
            onChange={handleInputChange}
            onBlur={pwDoubleCheck}
          />
          <S.ErrorMsg>{pwDoubleCheckErrorMsg}</S.ErrorMsg>
          <label htmlFor="name">이름</label>
          <input
            name="name"
            id="name"
            type="text"
            onChange={handleInputChange}
          />
          <fieldset>
            <label htmlFor="phone">휴대폰번호</label>
            <S.PhoneContainer>
              <S.PhoneFirstBtn
                type="button"
                state={phoneListVisible ? "active" : null}
                onClick={() => setPhoneListVisible(!phoneListVisible)}
              >
                {phoneFirst || "010"}
              </S.PhoneFirstBtn>
              {phoneListVisible && phoneList}
              <input
                name="phoneSecond"
                value={phoneSecond}
                onChange={handlePhoneSecondChange}
                maxLength="4"
                type="text"
              />
              <input
                name="phoneThird"
                value={phoneThird}
                onChange={handlePhoneThirdChange}
                maxLength="4"
                type="text"
              />
            </S.PhoneContainer>
          </fieldset>
        </S.JoinFormContainer>
        <S.AgreeContainer>
          <S.AgreeInput
            type="checkbox"
            id="agree"
            value={joinAgree}
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
          width="M"
          bgcolor={!handleSubmitBtn() ? "disabled" : null}
          color="white"
          fontSize="M"
          fontWeight="bold"
          content="가입하기"
          disabled={!handleSubmitBtn()}
          onClick={handleSubmit}
        />
      </S.Form>
    </S.JoinContainer>
  );
}
