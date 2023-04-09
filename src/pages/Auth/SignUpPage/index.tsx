import FormBox from "../components/FormBox";
import FormButton from "../components/FormButton";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "../Auth.module.scss";
import {
  registerUserData,
  checkDuplicateEmail,
  checkDuplicateNickname,
} from "api/authAxios";

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
  const handleEmail = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const currEmail = e.target.value;
      setEmail(currEmail);
      setEmailValid(false);
    },
    []
  );

  // 조건 다 충족되면 회원가입 버튼 활성화
  useEffect(() => {
    if (emailValid && nicknameValid && passwordValid && passwordConfirmValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, nicknameValid, passwordValid, passwordConfirmValid]);

  const checkEmail = () => {
    if (email === "") {
      setEmailValid(false);
      setEmailErrorMsg("이메일을 입력해주세요!");
    } else {
      if (emailRegex.test(email)) {
        setEmailErrorMsg("이메일 중복확인을 해주세요");
      } else {
        setEmailValid(false);
        setEmailErrorMsg("이메일 형식에 맞지 않습니다!");
      }
    }
  };
  // 이메일 중복 체크
  const { checkDupliEmail, data, isSuccess1 } = checkDuplicateEmail();

  const sendDuplicateEmail = () => {
    checkDupliEmail(email);
    if (isSuccess1) {
      if (data.status === 400) {
        console.log("중복");
        setEmailValid(false);
        setEmailErrorMsg("이미 등록된 이메일입니다. 다시 입력해주세요.");
      } else if (data.status === 200) {
        setEmailValid(true);
        console.log("중복아님");
        setEmailErrorMsg("");
      }
    }
  };

  // 닉네임 입력값
  const handleNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currNickname = e.target.value;
      setNickname(currNickname);
      setNickNameValid(false);
    },
    []
  );

  const checkNickname = () => {
    if (nickname === "") {
      setNickNameValid(false);
      setNicknameErrorMsg("닉네임을 입력해주세요!");
    } else {
      setNicknameErrorMsg("닉네임 중복확인을 해주세요");
    }
  };

  // 닉네임 중복체크
  const { checkDupliNickname, dataNickname, isSuccess3 } =
    checkDuplicateNickname();

  const sendDuplicateNickname = () => {
    checkDupliNickname(nickname);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (isSuccess3) {
      if (dataNickname.status === 400) {
        setNickNameValid(false);
        setNicknameErrorMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
      } else if (dataNickname.status === 200) {
        setNickNameValid(true);
        setNicknameErrorMsg("");
      }
    }
  };

  // 패스워드 입력값
  const handlePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currPwd = e.target.value;
      setPassword(currPwd);
    },
    []
  );
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
  const handlePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currPwdConfirm = e.target.value;
      setPasswordConfirm(currPwdConfirm);
    },
    [password]
  );
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

  const { submitUserData, isSuccess2 } = registerUserData();

  const sendRegister = () => {
    console.log("클릭");
    console.log(notAllow);
    console.log(isSuccess2);
    if (!notAllow) {
      console.log("회원가입 전송");
      submitUserData({ username: nickname, mail: email, pw: password });
    }
  };

  return (
    <div className={styles["form-wrap"]}>
      <div className={styles["form-wrap__title"]}>회원가입</div>
      <div className={styles["form-wrap__check-wrap"]}>
        <button
          className={
            !emailValid
              ? styles["form-wrap__check-wrap__button"]
              : `${styles["form-wrap__check-wrap__button"]} ${styles["form-wrap__check-wrap__button--varified"]}`
          }
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={sendDuplicateEmail}
        >
          중복 확인 *
        </button>
      </div>
      <FormBox
        icon="images/user.svg"
        text="이메일"
        type="text"
        placeholder="aa@gmail.com"
        condition={emailErrorMsg}
        onChange={handleEmail}
        data={email}
        blurEvent={checkEmail}
      />
      <div className={styles["form-wrap__check-wrap"]}>
        <button
          className={
            !nicknameValid
              ? styles["form-wrap__check-wrap__button"]
              : `${styles["form-wrap__check-wrap__button"]} ${styles["form-wrap__check-wrap__button--varified"]}`
          }
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={sendDuplicateNickname}
        >
          중복 확인 *
        </button>
      </div>
      <FormBox
        icon="images/user.svg"
        text="닉네임"
        type="text"
        placeholder="홍길동"
        condition={nicknameErrorMsg}
        onChange={handleNickname}
        data={nickname}
        blurEvent={checkNickname}
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
      <FormButton
        text="회원가입"
        allow={notAllow}
        url="/signin"
        onClick={sendRegister}
      />
      <div className={styles["form-wrap__move-wrap"]}>
        <span>이미 계정이 있으신가요?</span>
        <Link to="/signin">로그인</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
