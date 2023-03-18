import React, { useState } from "react";
import QuizSolve from "./QuizSolve/index";
import QuizSelection from "./QuizSelection/index";
import QuizReview from "./QuizReview/index";
import { useSelector } from "react-redux";

const gamePage = (): JSX.Element => {
  const stageState = useSelector(
    (state: { SignQuiz: { stageState: number } }) => state.SignQuiz.stageState
  );
  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
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

  return (
    <div>
      <div
        style={{
          zIndex: 10,
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "orange",
          color: "red",
          display: "inline-block",
          padding: "10px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        {score}점
      </div>
      <div>{renderPage()}</div>
    </div>
  );
};

export default gamePage;
