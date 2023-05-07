import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";
import styles from "./QuizSelection.module.scss";
import CommonButton from "components/CommonButton";
import LoadingSpinner from "components/LoadingSpinner";
import { loadNewQuestion } from "api/signLanguage";
import { usePreventGoBackEffect } from "hooks/usePreventGoBackEffect";
import { usePreventCloseEffect } from "hooks/usePreventCloseEffect";

const QuizSelection = () => {
  usePreventGoBackEffect();
  usePreventCloseEffect();

  const dispatch = useDispatch();

  const handleMove = () => {
    dispatch(moveNextStage());
  };

  const level = useSelector(
    (state: { SignQuiz: { stageLevel: number } }) => state.SignQuiz.stageLevel
  );
  const solvedQuestion = useSelector(
    (state: { SignQuiz: { solvedQuestion: number[] } }) =>
      state.SignQuiz.solvedQuestion
  );
  const categoryId = useSelector(
    (state: { SignQuiz: { categoryId: number } }) => state.SignQuiz.categoryId
  );

  const { isLoading, error, data } = loadNewQuestion(
    solvedQuestion,
    categoryId
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{level}번 문제 입니다.</h1>
        <h1 className={styles["header__sub-title"]}>
          {"세 단어의 수어 동작을 모두 학습해주세요"}
        </h1>
      </div>

      <div className={styles.content}>
        <div className={styles["content__card-wrapper"]}>
          <img
            className={styles["content__card-wrapper__image"]}
            src={data.questions[0].photo_url}
            alt="Image 1"
          />
          <h2 className={styles["content__card-wrapper__label"]}>
            {data.questions[0].word}
          </h2>
        </div>
        <div className={styles["content__card-wrapper"]}>
          <img
            src={data.questions[1].photo_url}
            alt="Image 2"
            className={styles["content__card-wrapper__image"]}
          />
          <h2 className={styles["content__card-wrapper__label"]}>
            {" "}
            {data.questions[1].word}
          </h2>
        </div>
        <div className={styles["content__card-wrapper"]}>
          <img
            src={data.questions[2].photo_url}
            alt="Image 3"
            className={styles["content__card-wrapper__image"]}
          />
          <h2 className={styles["content__card-wrapper__label"]}>
            {" "}
            {data.questions[2].word}
          </h2>
        </div>
      </div>
      <div className={styles["content__button-wrapper"]}>
        <CommonButton handleClick={handleMove} buttonName={"문제 풀기"} />
      </div>
    </div>
  );
};

export default QuizSelection;

// TODO: 개선사항 1. 각 이미지를 클릭했을때 상세 정보가 표현되면 좋을 듯
