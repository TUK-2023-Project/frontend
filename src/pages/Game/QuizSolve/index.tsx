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
      <div
        style={{
          backgroundColor: "gray",
          borderRadius: "20px",
          opacity: 0.8,
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
          padding: "30px",
          margin: "auto",
          width: "90%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "24px",
          }}
        >
          {targetSignWord}
        </h1>
        <h1
          style={{
            textAlign: "center",

            fontSize: "16px",
          }}
        >
          {"제한시간 내에 위 단어를 표현해주세요"}
        </h1>

        <QuizTimer time={200} />
      </div>
      <WebSocketDisplay click />
    </div>
  );
};

export default QuizSolve;
