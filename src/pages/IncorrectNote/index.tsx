import React from "react";
import styles from "./IncorrectNotePage.module.scss";

function IncorrectNotePage() {
  return (
    <>
      <h1 className={styles.title}>오답노트</h1>
      <div className={styles["incorrect-wrap"]}></div>
    </>
  );
}

export default IncorrectNotePage;
