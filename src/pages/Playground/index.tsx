import React from "react";
import { useSelector } from "react-redux";
import "./PlaygroundPage.scss"; // scss 임포트
import { loadUserNameData } from "../../api/test";

function PlaygroudPage() {
  const nickname = useSelector(
    (state: { Test: { nickname: string } }) => state.Test.nickname
  );

  const { isLoading, error } = loadUserNameData();

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div>
      <h1>낙서장 페이지</h1>
      <h2>이름: {nickname}</h2>
    </div>
  );
}

export default PlaygroudPage;
