import React from "react";

interface Props {
  handleMovePage: () => void;
}

const QuizReview = ({ handleMovePage }: Props) => {
  return (
    <div>
      <h1>3가지 문제와 정답라벨을 받아오는 페이지</h1>
      <button onClick={handleMovePage}>
        문제 암기 끝 (버튼을 눌러 다음 페이지로 이동)
      </button>
    </div>
  );
};

export default QuizReview;
