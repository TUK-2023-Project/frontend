import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTimer } from "react-timer-hook";
import ProgressBar from "@ramonak/react-progress-bar";
import { useDispatch } from "react-redux";
import { moveNextStage, timeOut } from "redux/actions/SignQuizActions";

interface propsType {
  time: number;
}

const QuizTimer = ({ time }: propsType) => {
  const dispatch = useDispatch();
  const expiryTimestamp = new Date();
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + time);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log("Timer expired");
      dispatch(timeOut());
      dispatch(moveNextStage());
    },
  });

  return (
    <div className="progressbar-container">
      <ProgressBar
        maxCompleted={time - 1}
        isLabelVisible={false}
        transitionTimingFunction="linear"
        bgColor={"green"}
        completed={seconds - 1}
        labelAlignment="center"
        labelColor="#e80909"
      />
    </div>
  );
};
export default QuizTimer;
