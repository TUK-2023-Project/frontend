import React from "react";
import QuizSolve from "./QuizSolve";
import QuizSelection from "./QuizSelection";
import QuizReview from "./QuizReview";
import CategorySelection from "./CategorySelection";
import { useSelector } from "react-redux";
import styles from "./game.module.scss";
const gamePage = (): JSX.Element => {
  const stageState = useSelector(
    (state: { SignQuiz: { stageState: number } }) => state.SignQuiz.stageState
  );
  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
  );

  console.log(stageState);
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
    </div>
  );
};

export default gamePage;
