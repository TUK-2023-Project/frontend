import React from "react";
import { useDispatch } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";

const QuizSelection = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>3가지 문제와 정답라벨을 받아오는 페이지</h1>
      <button
        onClick={() => {
          dispatch(moveNextStage());
        }}
      >
        문제를 전부 암기했다면 사용자가 누르는 버튼
      </button>
    </div>
  );
};

export default QuizSelection;
