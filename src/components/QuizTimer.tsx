import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTimer } from "react-timer-hook";
import ProgressBar from "@ramonak/react-progress-bar";

interface propsType {
  time: number;
}

const QuizTimer = ({ time }: propsType) => {
  const expiryTimestamp = new Date();
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + time);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log("Timer expired");
      // 타임 만료 로직 넣기
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
