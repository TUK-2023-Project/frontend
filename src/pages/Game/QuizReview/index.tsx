import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeOut, moveNextStage } from "redux/actions/SignQuizActions";

interface Props {
  handleMovePage: () => void;
}

const QuizReview = ({ handleMovePage }: Props) => {
  const dispatch = useDispatch();
  const isEnd = useSelector(
    (state: { SignQuiz: { isEnd: boolean } }) => state.SignQuiz.isEnd
  );

  const checkGameStage = () => {
    if (isEnd) {
      dispatch(timeOut());
      // 라우터 이동
    } else {
      dispatch(moveNextStage());
    }
  };

  return (
    <div>
      <h1>푼 문제를 다시 한번 확인하는 페이지</h1>
      <button onClick={checkGameStage}>
        게임을 종료하거나 다음 페이지로 이동
      </button>
    </div>
  );
};

export default QuizReview;
