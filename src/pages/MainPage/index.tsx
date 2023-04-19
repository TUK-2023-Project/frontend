import CommonButton from "components/CommonButton";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import LogoutBtn from "pages/Auth/components/LogoutBtn";

function MainPage() {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("accessToken");

  useEffect(() => {
    if (isAuth == null) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      {isAuth == null ? (
        <></>
      ) : (
        <div className={styles.logout}>
          <LogoutBtn />
        </div>
      )}
      <div className={styles.content}>
        <h1>
          수 퀴즈
          <br />
          Sign-language-Quiz
        </h1>
        {isAuth == null ? (
          <div className={styles["content__common-btn-wrap-no"]}>
            <Link to="/signin">
              <CommonButton buttonName="시작하기" />
            </Link>
            <Link to="/rank">
              <CommonButton buttonName="랭킹확인" />
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
    </>
  );
}

export default MainPage;
