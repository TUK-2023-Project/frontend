import CommonButton from "components/CommonButton";
import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.scss";

function MainPage() {
  return (
    <div className="MainWrap">
      <h1>
        수 퀴즈
        <br />
        Sign-language-Quiz
      </h1>
      <div className="CommonBtnWrap">
        <Link to="/signin">
          <CommonButton buttonName="시작하기" />
        </Link>
        <Link to="/signin">
          <CommonButton buttonName="랭킹확인" />
        </Link>
        <Link to="/signin">
          <CommonButton buttonName="오답노트" />
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
