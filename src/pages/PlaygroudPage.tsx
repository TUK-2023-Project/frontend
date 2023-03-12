import React, { useState, useEffect } from "react";
import classNames from "classnames"; // 조건부로 css 클래스 넣어주는 라이브러리
import "./PlaygroundPage.scss"; // scss 임포트
import WebSocketDisplay from "../components/WebSocketDisplay";
import { useDispatch, useSelector } from "react-redux";
import { incrementScore, resetScore } from "../redux/actions/TestActions";

function PlaygroudPage() {
  const [click, setClick] = useState<boolean | any>(false);

  const dispatch = useDispatch();
  const score = useSelector(
    (state: { Test: { score: number } }) => state.Test.score
  );

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
        <h1>Redux 데이터 테스트</h1>
        <p>Score: {score}</p>
        <button onClick={() => dispatch(incrementScore())}>증가</button>

        <button onClick={() => dispatch(resetScore())}>초기화</button>
      </div>
    </div>
  );
}

export default PlaygroudPage;
