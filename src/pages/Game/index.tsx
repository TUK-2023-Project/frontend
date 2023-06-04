import React, { useEffect, useState } from "react";
import QuizSolve from "./QuizSolve";
import QuizSelection from "./QuizSelection";
import QuizReview from "./QuizReview";
import CategorySelection from "./CategorySelection";
import { useSelector } from "react-redux";
import styles from "./game.module.scss";
import OneHand from "./components/HandDetection/OneHand";
import TwoHands from "./components/HandDetection/TwoHands";

const gamePage = (): JSX.Element => {
  const [scoreValue, setScoreValue] = useState(0);

  const stageState = useSelector(
    (state: { SignQuiz: { stageState: number } }) => state.SignQuiz.stageState
  );
  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
  );
  const targetSignWord = useSelector(
    (state: { SignQuiz: { targetSignWord: { data: string } } }) =>
      state.SignQuiz.targetSignWord.data
  );

  const categoryId = useSelector(
    (state: { SignQuiz: { categoryId: number } }) => state.SignQuiz.categoryId
  );

  const useTwoHandsModal = useSelector(
    (state: { SignQuiz: { useTwoHandsModal: boolean } }) =>
      state.SignQuiz.useTwoHandsModal
  );

  const handleCameraOpen = (): boolean => {
    if (stageState === -1 || stageState === 1) {
      return true;
    }
    return false;
  };

  const renderPage = (): JSX.Element => {
    switch (stageState) {
      case -1:
        return <CategorySelection />;
      case 0:
        return <QuizSelection />;
      case 1:
        return <QuizSolve />;
      case 2:
        return <QuizReview />;
      default:
        return <div>Page Not Found</div>;
    }
  };

  useEffect(() => {
    const animationDuration = 200;
    const step = 10;

    let currentScore = scoreValue;
    const targetScore = score;

    const animationFrame = setInterval(() => {
      const diff = targetScore - currentScore;
      const sign = Math.sign(diff);
      const delta =
        sign * Math.ceil((Math.abs(diff) * step) / animationDuration);

      currentScore += delta;

      if (
        (sign > 0 && currentScore >= targetScore) ||
        (sign < 0 && currentScore <= targetScore)
      ) {
        currentScore = targetScore;
        clearInterval(animationFrame);
      }

      setScoreValue(currentScore);
    }, step);

    return () => {
      clearInterval(animationFrame);
    };
  }, [score]);

  return (
    <div>
      <div className={styles["score-wrapper"]}>{scoreValue}점</div>
      <div>{renderPage()}</div>

      {categoryId !== -1 && (
        <>
          <div
            className={`${styles["camera-wrapper"]} ${
              stageState === -1 ? styles["camera-wrapper--first"] : ""
            } ${
              handleCameraOpen() && !useTwoHandsModal
                ? styles["camera-wrapper--visible"]
                : ""
            }`}
          >
            <OneHand
              open={Boolean(handleCameraOpen())}
              targetWord={targetSignWord}
              isInit={stageState === -1}
            />
            {/* <TwoHands open={Boolean(false)} targetWord={targetSignWord} /> */}
          </div>

          <div
            className={`${styles["camera-wrapper"]} ${
              stageState === -1 ? styles["camera-wrapper--first"] : ""
            } ${
              handleCameraOpen() && useTwoHandsModal
                ? styles["camera-wrapper--visible"]
                : ""
            }`}
          >
            <TwoHands
              open={Boolean(handleCameraOpen())}
              targetWord={targetSignWord}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default gamePage;
