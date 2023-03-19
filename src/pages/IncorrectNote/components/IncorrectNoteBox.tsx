import React from "react";
import styles from "./IncorrectNotePage.module.scss";

function IncorrectNoteBox() {
  return (
    <>
      <h1 className={styles.title}>오답노트</h1>
      <div className={styles["incorrect-wrap"]}>
        <div className={styles["incorrect-wrap__label"]}>자음</div>
        <div className={styles["incorrect-wrap__label"]}>모음</div>
        <div className={styles["incorrect-wrap__label"]}>알파벳</div>
        <div className={styles["incorrect-wrap__label"]}>숫자</div>
      </div>
    </>
  );
}

export default IncorrectNoteBox;
