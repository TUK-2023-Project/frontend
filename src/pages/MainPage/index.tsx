import CommonButton from "components/CommonButton";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.scss";

function MainPage() {
  console.log(!(localStorage.getItem("accessToken") == null));
  return (
    <div className={styles.content}>
      <h1>
        수 퀴즈
        <br />
        Sign-language-Quiz
      </h1>
      {localStorage.getItem("accessToken") == null ? (
        <div className={styles["content__common-btn-wrap-no"]}>
          <Link to="/signin">
            <CommonButton buttonName="시작하기" />
          </Link>
        </div>
      ) : (
        <div className={styles["content__common-btn-wrap-yes"]}>
          <Link to="/game">
            <CommonButton buttonName="시작하기" />
          </Link>
          <Link to="/rank">
            <CommonButton buttonName="랭킹확인" />
          </Link>
          <Link to="/incorrectnote">
            <CommonButton buttonName="오답노트" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default MainPage;
