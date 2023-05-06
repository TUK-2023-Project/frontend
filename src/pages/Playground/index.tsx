import React from "react";
import { useSelector } from "react-redux";
import "./PlaygroundPage.scss"; // scss 임포트

function PlaygroudPage() {
  const nickname = useSelector(
    (state: { Test: { nickname: string } }) => state.Test.nickname
  );

  return (
    <div>
      <h1>낙서장 페이지</h1>
      <h2>이름: {nickname}</h2>
    </div>
  );
}

export default PlaygroudPage;
