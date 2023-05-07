import React from "react";
import QuizTimer from "../components/QuizTimer";
import { useSelector } from "react-redux";
import styles from "./QuizSolve.module.scss";
import { usePreventGoBackEffect } from "hooks/usePreventGoBackEffect";
import { usePreventCloseEffect } from "hooks/usePreventCloseEffect";

const QuizSolve = () => {
  const targetSignWord = useSelector(
    (state: { SignQuiz: { targetSignWord: { data: string } } }) =>
      state.SignQuiz.targetSignWord.data
  );

  usePreventGoBackEffect();
  usePreventCloseEffect();

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{targetSignWord}</h1>
        <h1 className={styles["header__sub-title"]}>
          {"제한시간 내에 위 단어를 표현해주세요"}
        </h1>
        <QuizTimer time={10} />
      </div>
    </div>
  );
};

export default QuizSolve;
