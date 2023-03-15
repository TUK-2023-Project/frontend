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
      <h1>맞춰야 하는 단어 : {targetSignWord} </h1>

      <QuizTimer time={20} />
      <WebSocketDisplay click />
    </div>
  );
};

export default QuizSolve;
