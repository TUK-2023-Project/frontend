import React from "react";
import { useDispatch } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";
interface Props {
  handleMovePage: () => void;
}

const QuizSelection = ({ handleMovePage }: Props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>결과 문제를 확인</h1>
      <button
        onClick={() => {
          dispatch(moveNextStage());
        }}
      >
        게임 결과에 따라 랭킹페이지 또는 이어서 게임을 진행
      </button>
    </div>
  );
};

export default QuizSelection;
