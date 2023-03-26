import CommonButton from "components/CommonButton/CommonButton";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.scss";

function MainPage() {
  return (
    <div className={styles.content}>
      <h1>
        수 퀴즈
        <br />
        Sign-language-Quiz
      </h1>
      <div className={styles["content__common-btn-wrap"]}>
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
    </div>
  );
}

export default MainPage;
