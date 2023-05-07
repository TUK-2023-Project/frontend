import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles["notfound-wrapper"]}>
      <h1 className={styles["notfound-wrapper__title"]}>수 퀴즈</h1>
      <p className={styles["notfound-wrapper__content1"]}>
        페이지가 존재하지 않습니다.
      </p>
      <p className={styles["notfound-wrapper__content2"]}>
        링크를 잘못 입력하셨거나 페이지가 삭제/이동되었을 수 있습니다.
      </p>
      <button
        className={styles["notfound-wrapper__backBtn"]}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img
          className={styles["notfound-wrapper__backBtn__icon"]}
          src="images/back.svg"
          alt="뒤로가기 아이콘"
        />
        뒤로가기
      </button>
    </div>
  );
}

export default NotFound;
