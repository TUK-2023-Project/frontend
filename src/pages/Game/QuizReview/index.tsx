import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";
import { useNavigate } from "react-router-dom";
import styles from "./QuizReview.module.scss";

const QuizReview = () => {
  const navigate = useNavigate();
  const redirectToRankPage = () => {
    navigate("/rank");
  };
  const dispatch = useDispatch();
  const isEnd = useSelector(
    (state: { SignQuiz: { isEnd: boolean } }) => state.SignQuiz.isEnd
  );
  const targetSignWord = useSelector(
    (state: { SignQuiz: { targetSignWord: { data: string } } }) =>
      state.SignQuiz.targetSignWord.data
  );

  const checkGameStage = () => {
    if (isEnd) {
      redirectToRankPage();
    } else {
      dispatch(moveNextStage());
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{targetSignWord}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.content__info}>
          <h1 className={styles.content__info__title}>
            {isEnd ? "시간이 초과되었습니다" : "정답 입니다!"}
          </h1>
          <p className={styles["content__info__sub-title"]}>
            단어 "ㄱ"은 오른손으로 손가락을 전부 편 모습입니다. 햇갈리지 않게
            조심해야합니다"
          </p>
        </div>

        <div className={styles.content__info}>
          <img
            src="https://www.korean.go.kr/asset/img/SJ/img_001_9.jpg"
            alt="이미지 설명"
            className={styles.content__info__image}
          />
        </div>
      </div>

      <div className={styles["content__button-wrapper"]}>
        <button
          style={{
            width: "11rem",
            height: "3rem",
            borderRadius: "1.5rem",
            background: "#fad795",
            fontSize: "1.5rem",
            fontWeight: 900,
            border: "1.8px solid black",
          }}
          onClick={checkGameStage}
        >
          {isEnd ? "랭킹 확인" : "다음 문제 풀기"}
        </button>
      </div>
    </div>
  );
};

export default QuizReview;
