import React from "react";
import QuizTimer from "../components/QuizTimer";
import { useSelector } from "react-redux";
import styles from "./QuizSolve.module.scss";
import { usePreventGoBackEffect } from "hooks/usePreventGoBackEffect";

const QuizSolve = () => {
  const targetSignWord = useSelector(
    (state: { SignQuiz: { targetSignWord: { data: string } } }) =>
      state.SignQuiz.targetSignWord.data
  );

  const categoryId = useSelector(
    (state: { SignQuiz: { categoryId: number } }) => state.SignQuiz.categoryId
  );

  usePreventGoBackEffect();

  // FIXME: 개선사항 1. 각 이미지를 클릭했을때 상세 정보가 표현되면 좋을 듯

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{targetSignWord}</h1>
        <h1 className={styles["header__sub-title"]}>
          {"제한시간 내에 위 단어를 표현해주세요"}
        </h1>
        <QuizTimer time={categoryId === 3 ? 20 : 10} />
      </div>
    </div>
  );
};

export default QuizSolve;
