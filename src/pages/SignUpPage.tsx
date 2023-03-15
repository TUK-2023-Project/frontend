import FormBox from "components/FormBox";
import FormButton from "components/FormButton";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SignPage.scss";

function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfrim, setPasswordConfirm] = useState<string>("");

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [nicknameValid, setNickNameValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordConfirmValid, setPasswordConfirmValid] =
    useState<boolean>(false);
  const [notAllow, setNotAllow] = useState<boolean>(true);

  // 정규 표현식
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordRegex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

  // 이메일 유효성 체크
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // 닉네임 유효성 체크
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (nickname.length > 0 && nickname.length < 9) {
      setNickNameValid(true);
    } else {
      setNickNameValid(false);
    }
  };
  // 비밀번호 유효성 체크
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordRegex.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  // 비밀번호 재확인 유효성 체크
  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (password === passwordConfrim) {
      setPasswordConfirmValid(true);
    } else {
      setPasswordConfirmValid(false);
    }
  };

  // 조건 다 충족되면 회원가입 버튼 활성화
  useEffect(() => {
    if (emailValid && nicknameValid && passwordValid && passwordConfirmValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, nicknameValid, passwordValid, passwordConfirmValid]);

  return (
    <div className="FormWrap">
      <div className="Title">회원가입</div>
      <FormBox
        icon="images/user.svg"
        text="이메일"
        type="text"
        placeholder="aa@gmail.com"
        condition="올바른 이메일을 입력해주세요."
        onChange={handleEmail}
        data={email}
        valid={emailValid}
      />
      <FormBox
        icon="images/user.svg"
        text="닉네임"
        type="text"
        placeholder="홍길동"
        condition="8글자 이하로 입력해주세요."
        onChange={handleNickname}
        data={nickname}
        valid={nicknameValid}
      />
      <FormBox
        icon="images/password.svg"
        text="비밀번호"
        type="password"
        placeholder="••••••••"
        condition="영문, 숫자, 특수문자 포함 8자 이상 입력해주세요."
        onChange={handlePassword}
        data={password}
        valid={passwordValid}
      />
      <FormBox
        icon="images/password.svg"
        text="비밀번호 재입력"
        type="password"
        placeholder="••••••••"
        condition="입력하신 비밀번호와 일치하지 않습니다."
        onChange={handlePasswordConfirm}
        data={passwordConfrim}
        valid={passwordConfirmValid}
      />
      <FormButton text="회원가입" allow={notAllow} url="/signin" />
      <div className="Move">
        <span>이미 계정이 있으신가요?</span>
        <Link to="/signin">로그인</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
