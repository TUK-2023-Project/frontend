import FormBox from "components/FormBox";
import FormButton from "components/FormButton";
import React from "react";
import { Link } from "react-router-dom";
import "./SignPage.scss";

function SignInPage() {
  return (
    <div className="FormWrap">
      <div className="Title">로그인</div>
      <FormBox
        icon="images/user.svg"
        text="이메일"
        type="text"
        placeholder="aa@gmail.com"
      />
      <FormBox
        icon="images/password.svg"
        text="비밀번호"
        type="password"
        placeholder="••••••••"
      />
      <FormButton text="로그인" />
      <div className="Move">
        <span>계정이 없으신가요?</span>
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
}

export default SignInPage;
