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

  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState<string>("");
  const [pwErrorMsg, setPwErrorMsg] = useState<string>("");
  const [pwConfirmErrorMsg, setPwConfirmErrorMsg] = useState<string>("");

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

  // 닉네임 입력값
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  // 닉네임 유효성 체크
  const ckeckNickname = () => {
    console.log(nickname);
    if (nickname === "") {
      setNickNameValid(false);
      setNicknameErrorMsg("닉네임을 입력해주세요!");
    } else {
      setNickNameValid(true);
      setNicknameErrorMsg("");
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

  // 패스워드 재확인 입력값
  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };
  // 비밀번호 재확인 유효성 체크
  const ckeckPasswordConfirm = () => {
    console.log(passwordConfrim);
    if (passwordConfrim === "") {
      setPasswordConfirmValid(false);
      setPwConfirmErrorMsg("비밀번호를 재확인 해주세요!");
    } else {
      if (password === passwordConfrim) {
        setPasswordConfirmValid(true);
        setPwConfirmErrorMsg("");
      } else {
        setPasswordConfirmValid(false);
        setPwConfirmErrorMsg("입력하신 비밀번호와 일치하지 않습니다.");
      }
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
        condition={emailErrorMsg}
        onChange={handleEmail}
        data={email}
        blurEvent={ckeckEmail}
      />
      <FormBox
        icon="images/user.svg"
        text="닉네임"
        type="text"
        placeholder="홍길동"
        condition={nicknameErrorMsg}
        onChange={handleNickname}
        data={nickname}
        blurEvent={ckeckNickname}
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
      <FormBox
        icon="images/password.svg"
        text="비밀번호 재입력"
        type="password"
        placeholder="••••••••"
        condition={pwConfirmErrorMsg}
        onChange={handlePasswordConfirm}
        data={passwordConfrim}
        blurEvent={ckeckPasswordConfirm}
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
