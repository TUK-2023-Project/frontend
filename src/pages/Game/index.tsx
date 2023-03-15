import React, { useState } from "react";
import QuizSolve from "./QuizSolve/index";
import QuizSelection from "./QuizSelection/index";
import QuizReview from "./QuizReview/index";
import { useSelector } from "react-redux";

const gamePage = (): JSX.Element => {
  const stageState = useSelector(
    (state: { SignQuiz: { stageState: number } }) => state.SignQuiz.stageState
  );
  const [currentPage, setCurrentPage] = useState<string>("page1");

  console.log(currentPage);
  console.log(stageState);
  const renderPage = (): JSX.Element => {
    switch (stageState) {
      case 0:
        return <QuizSelection />;
      case 1:
        return <QuizSolve />;
      case 2:
        return (
          <QuizReview
            handleMovePage={() => {
              setCurrentPage("page1");
            }}
          />
        );
      default:
        return <div>Page Not Found</div>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default gamePage;
