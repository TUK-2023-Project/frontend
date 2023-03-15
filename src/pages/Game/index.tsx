import React, { useState } from "react";
import QuizSolve from "./QuizSolve/index";
import QuizSelection from "./QuizSelection/index";
import QuizReview from "./QuizReview/index";

const gamePage = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<string>("page1");

  const renderPage = (): JSX.Element => {
    switch (currentPage) {
      case "page1":
        return (
          <QuizSelection
            handleMovePage={() => {
              setCurrentPage("page2");
            }}
          />
        );
      case "page2":
        return (
          <QuizSolve
            handleMovePage={() => {
              setCurrentPage("page3");
            }}
          />
        );
      case "page3":
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
