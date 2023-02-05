import React from "react";
import classNames from "classnames"; // 조건부로 css 클래스 넣어주는 라이브러리
import "./PlaygroundPage.scss"; // scss 임포트
import CameraDisplay from "../components/CameraDisplay";

function PlaygroudPage() {
  return (
    <div>
      <h1>낙서장 페이지</h1>
      <button className={classNames("Button", "blue")}>button</button>
      <button className={classNames("Button", "gray")}>button</button>
      <CameraDisplay />
    </div>
  );
}

export default PlaygroudPage;
