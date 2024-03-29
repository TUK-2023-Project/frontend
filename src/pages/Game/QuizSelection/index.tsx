import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";
import styles from "./QuizSelection.module.scss";
import CommonButton from "components/CommonButton";
import LoadingSpinner from "components/LoadingSpinner";
import AllProblemsSolved from "./AllProblemsSolved";
import { loadNewQuestion } from "api/signLanguage";
import { usePreventGoBackEffect } from "hooks/usePreventGoBackEffect";
import VideoModal from "components/VideoModal";

const QuizSelection = () => {
  usePreventGoBackEffect();

  const dispatch = useDispatch();

  const handleMove = () => {
    dispatch(moveNextStage());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const openModalWithVideo = (url: string) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const { isLoading, error, data, allQuestionsSolved } = loadNewQuestion(
    solvedQuestion,
    categoryId
  );

  if (allQuestionsSolved) {
    return <AllProblemsSolved />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <VideoModal
        open={isModalOpen}
        closeAction={closeModal}
        videoUrl={videoUrl}
      />

      <div className={styles.header}>
        <h1 className={styles.header__title}>{level}번 문제 입니다.</h1>
        <h1 className={styles["header__sub-title"]}>
          {"세 단어의 수어 동작을 모두 학습해주세요"}
        </h1>
        <h1 className={styles["header__sub-title"]}>
          {"[각 단어를 눌러 상세한 영상정보를 확인할 수 있습니다]"}
        </h1>
      </div>

      <div className={styles.content}>
        <div
          className={styles["content__card-wrapper"]}
          onClick={() => {
            openModalWithVideo(data.questions[0].video_url);
          }}
        >
          <img
            className={styles["content__card-wrapper__image"]}
            src={data.questions[0].photo_url}
            alt="Image 1"
          />
          <h2 className={styles["content__card-wrapper__label"]}>
            {data.questions[0].word}
          </h2>
        </div>
        <div
          className={styles["content__card-wrapper"]}
          onClick={() => {
            openModalWithVideo(data.questions[1].video_url);
          }}
        >
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
        <div
          className={styles["content__card-wrapper"]}
          onClick={() => {
            openModalWithVideo(data.questions[2].video_url);
          }}
        >
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
