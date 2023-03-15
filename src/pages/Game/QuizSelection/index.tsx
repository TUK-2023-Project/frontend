import React from "react";

interface Props {
  handleMovePage: () => void;
}

const QuizSelection = ({ handleMovePage }: Props) => {
  return (
    <div>
      <h1>카메라를 통해 실제 문제를 풀이함</h1>
      <button onClick={handleMovePage}>타임아웃 또는 정답을 풀이</button>
    </div>
  );
};

export default QuizSelection;
