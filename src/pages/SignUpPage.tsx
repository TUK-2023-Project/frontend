import FormBox from "components/FormBox";
import FormButton from "components/FormButton";
import React from "react";
import { Link } from "react-router-dom";
import "./SignPage.scss";

function SignUpPage() {
  return (
    <div className="FormWrap">
      <div className="Title">회원가입</div>
      <FormBox
        icon="images/user.svg"
        text="이메일"
        type="text"
        placeholder="aa@gmail.com"
      />
      <FormBox
        icon="images/user.svg"
        text="닉네임"
        type="text"
        placeholder="홍길동"
      />
      <FormBox
        icon="images/password.svg"
        text="비밀번호"
        type="password"
        placeholder="••••••••"
      />
      <FormBox
        icon="images/password.svg"
        text="비밀번호 재입력"
        type="password"
        placeholder="••••••••"
      />
      <FormButton text="회원가입" />
      <div className="Move">
        <span>이미 계정이 있으신가요?</span>
        <Link to="/signin">로그인</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
