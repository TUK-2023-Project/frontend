import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";
import { useNavigate } from "react-router-dom";
import CommonButton from "components/CommonButton";
import styles from "./QuizReview.module.scss";
import { reviewQuizData } from "api/signLanguage";
import { useUpdateRank } from "api/rank";
import LoadingSpinner from "components/LoadingSpinner";
import { playAudio } from "utils/audioPlayer";
import { usePreventCloseEffect } from "hooks/usePreventCloseEffect";
import { usePreventGoBackEffect } from "hooks/usePreventGoBackEffect";
import { addIncorrectData } from "api/incorrectNote";

const QuizReview = () => {
  const navigate = useNavigate();
  const redirectToRankPage = () => {
    navigate("/rank");
  };
  const dispatch = useDispatch();

  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
  );
  const isEnd = useSelector(
    (state: { SignQuiz: { isEnd: boolean } }) => state.SignQuiz.isEnd
  );
  const targetSignWord = useSelector(
    (state: { SignQuiz: { targetSignWord: { data: string; id: number } } }) =>
      state.SignQuiz.targetSignWord
  );

  const { submitRank, isSuccess2 } = useUpdateRank(redirectToRankPage);
  const { isLoading, error, data, isSuccess } = reviewQuizData(
    targetSignWord.id
  );
  const handleMove = () => {
    if (isEnd) {
      submitRank(score);
    } else {
      dispatch(moveNextStage());
    }
  };

  usePreventGoBackEffect();
  usePreventCloseEffect();

  const { addIncorrectList } = addIncorrectData();
  console.log("호출몇번이나되는거냐");

  useEffect(() => {
    if (isSuccess && isEnd) {
      addIncorrectList(targetSignWord.id);
    }
  }, [isSuccess]);

  useEffect(() => {
    void (async () => {
      const sound = isEnd ? "/sounds/wrong.mp3" : "/sounds/answer.mp3";
      const { pause } = await playAudio(sound);
      return () => {
        console.log("dd");
        pause();
      };
    })();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.header__title}>{targetSignWord.data}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.content__info}>
          <h1 className={styles.content__info__title}>
            {isEnd ? "시간이 초과되었습니다" : "정답 입니다!"}
          </h1>
          <p className={styles["content__info__sub-title"]}>
            {data.sign_language_info.context}
          </p>
        </div>

        <div className={styles.content__info}>
          <img
            src={data.sign_language_info.photo_url}
            alt="이미지 설명"
            className={styles.content__info__image}
          />
        </div>
      </div>

      <div className={styles["content__button-wrapper"]}>
        <CommonButton
          handleClick={handleMove}
          buttonName={isEnd ? "랭킹 확인" : "다음 문제 풀기"}
        />
      </div>
    </div>
  );
};

export default QuizReview;
