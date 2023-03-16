import React from "react";
import { useSelector } from "react-redux";

const Ranking = () => {
  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
  );

  return (
    <div>
      <h1>랭킹 정보 확인 페이지</h1>
      <div>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default Ranking;
