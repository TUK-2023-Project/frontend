import React, { useState, useEffect } from "react";
import classNames from "classnames"; // 조건부로 css 클래스 넣어주는 라이브러리
import "./PlaygroundPage.scss"; // scss 임포트
import WebSocketDisplay from "../components/WebSocketDisplay";
import QuizTimer from "../components/QuizTimer";

function PlaygroudPage() {
  const [click, setClick] = useState<boolean | any>(false);

  useEffect(() => {
    console.log(click);
  }, [click]);

  // 버튼 클릭 후에 손좌표값 전송 시작
  const onClick = () => {
    console.log("클릭");
    // setInterval(onClick, 3000);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    setClick((prev: any) => !prev);
    // setSocketConnected(false);
  };

  return (
    <div>
      <h1>낙서장 페이지</h1>
      <button className={classNames("Button", "blue")} onClick={onClick}>
        손좌표값 보내기
      </button>
      <button className={classNames("Button", "gray")}>button</button>
      {click === true ? <WebSocketDisplay click={click} /> : ""}

      <div>
        <h1>타이머</h1>
        <QuizTimer time={5} />
      </div>
    </div>
  );
}

export default PlaygroudPage;
