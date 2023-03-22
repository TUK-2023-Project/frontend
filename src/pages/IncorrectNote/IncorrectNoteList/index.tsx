import React from "react";
import IncorrectNoteBox from "../components/ListCarousel";
import styles from "./IncorrectNoteListPage.module.scss";

function IncorrectNotePage() {
  return (
    <div className={styles["incorrect-wrap"]}>
      <h1 className={styles["incorrect-wrap__title"]}>오답노트</h1>
      <div className={styles["incorrect-wrap__incorrectlist"]}>
        <IncorrectNoteBox label="자음" />
        <IncorrectNoteBox label="모음" />
        <IncorrectNoteBox label="알파벳" />
        <IncorrectNoteBox label="숫자" />
      </div>
    </div>
  );
}

export default IncorrectNotePage;
