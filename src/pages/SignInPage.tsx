import FormBox from "components/FormBox";
import FormButton from "components/FormButton";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SignPage.scss";

function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [pwErrorMsg, setPwErrorMsg] = useState<string>("");

  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [notAllow, setNotAllow] = useState<boolean>(true);

  // 정규 표현식
  const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordRegex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

  // 이메일 입력값
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  // 이메일 유효성 체크
  const ckeckEmail = () => {
    if (email === "") {
      setEmailValid(false);
      setEmailErrorMsg("이메일을 입력해주세요!");
    } else {
      if (emailRegex.test(email)) {
        setEmailValid(true);
        setEmailErrorMsg("");
      } else {
        setEmailValid(false);
        setEmailErrorMsg("이메일 형식에 맞지 않습니다!");
      }
    }
  };

  // 패스워드 입력값
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // 비밀번호 유효성 체크
  const ckeckPassword = () => {
    console.log(password);
    if (password === "") {
      setPasswordValid(false);
      setPwErrorMsg("비밀번호를 입력해주세요!");
    } else {
      console.log(passwordRegex.test(password));
      if (passwordRegex.test(password)) {
        setPasswordValid(true);
        setPwErrorMsg("");
      } else {
        setPasswordValid(false);
        setPwErrorMsg(
          "영문, 숫자, 특수문자 포함 8자 이상 20자 이하로 입력해주세요."
        );
      }
    }
  };

  // 조건 다 충족되면 로그인 버튼 활성화
  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid]);

  return (
    <div className="FormWrap">
      <div className="Title">로그인</div>
      <FormBox
        icon="images/user.svg"
        text="이메일"
        type="text"
        placeholder="aa@gmail.com"
        condition={emailErrorMsg}
        onChange={handleEmail}
        data={email}
        blurEvent={ckeckEmail}
      />
      <FormBox
        icon="images/password.svg"
        text="비밀번호"
        type="password"
        placeholder="••••••••"
        condition={pwErrorMsg}
        onChange={handlePassword}
        data={password}
        blurEvent={ckeckPassword}
      />
      <FormButton text="로그인" allow={notAllow} url="/main" />
      <div className="Move">
        <span>계정이 없으신가요?</span>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}

export default SignInPage;
