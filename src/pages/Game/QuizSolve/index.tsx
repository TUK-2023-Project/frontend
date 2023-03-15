import React from "react";

interface Props {
  handleMovePage: () => void;
}

const QuizSolve = ({ handleMovePage }: Props) => {
  return (
    <div>
      <h1>결과 문제를 확인</h1>
      <button onClick={handleMovePage}>
        게임 결과에 따라 랭킹페이지 또는 이어서 게임을 진행
      </button>
    </div>
  );
};

export default QuizSolve;
