import React from "react";
import WebSocketDisplay from "./components/WebSocketDisplay";
import QuizTimer from "./components/QuizTimer";
import { useSelector } from "react-redux";

const QuizSolve = () => {
  const targetSignWord = useSelector(
    (state: { SignQuiz: { targetSignWord: { data: string } } }) =>
      state.SignQuiz.targetSignWord.data
  );

  return (
    <div>
      <div className="header">
        <h1 className="header__title">{targetSignWord}</h1>
        <h1 className="header__sub-title">
          {"제한시간 내에 위 단어를 표현해주세요"}
        </h1>

        <QuizTimer time={10} />
      </div>
      <WebSocketDisplay click />
    </div>
  );
};

export default QuizSolve;
