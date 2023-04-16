import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTimer } from "react-timer-hook";
import ProgressBar from "@ramonak/react-progress-bar";
import { useDispatch } from "react-redux";
import { moveNextStage, timeOut } from "redux/actions/SignQuizActions";

interface QuizTimerProps {
  time: number;
}

const QuizTimer = ({ time }: QuizTimerProps) => {
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

  const [barColor, setBarColor] = useState("green");

  const calculateColor = (curTime: number, maxTime: number) => {
    const green = Math.round((curTime / maxTime) * 255);
    const red = 255 - green;
    return `rgb(${red}, ${green}, 0)`;
  };

  useEffect(() => {
    setBarColor(calculateColor(seconds - 1, time));
  }, [seconds]);

  return (
    <div className="progressbar-container">
      <ProgressBar
        maxCompleted={time - 1}
        isLabelVisible={false}
        transitionTimingFunction="linear"
        bgColor={barColor}
        completed={seconds - 1}
        labelAlignment="center"
        labelColor="#e80909"
      />
    </div>
  );
};
export default QuizTimer;
