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
        <Link to="/signin">
          <CommonButton buttonName="랭킹확인" />
        </Link>
<<<<<<< Updated upstream:src/pages/MainPage/index.tsx
        <Link to="/rank">
=======
        <Link to="/incorrectnote">
>>>>>>> Stashed changes:src/pages/MainPage.tsx
          <CommonButton buttonName="오답노트" />
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
