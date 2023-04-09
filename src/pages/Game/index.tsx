import React from "react";
import QuizSolve from "./QuizSolve";
import QuizSelection from "./QuizSelection";
import QuizReview from "./QuizReview";
import CategorySelection from "./CategorySelection";
import { useSelector } from "react-redux";
import styles from "./game.module.scss";
import WebSocketDisplay from "./components/WebSocketDisplay";

const gamePage = (): JSX.Element => {
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

  return (
    <div>
      <div className={styles["score-wrapper"]}>{score}점</div>
      <div>{renderPage()}</div>

      {categoryId !== -1 && (
        <div
          className={`${styles["camera-wrapper"]} ${
            stageState === -1 ? styles["camera-wrapper--first"] : ""
          } ${handleCameraOpen() ? styles["camera-wrapper--visible"] : ""}`}
        >
          <WebSocketDisplay
            open={Boolean(handleCameraOpen())}
            targetWord={targetSignWord}
            isInit={stageState}
          />
        </div>
      )}
    </div>
  );
};

export default gamePage;
