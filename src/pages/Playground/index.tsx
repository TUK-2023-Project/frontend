import React from "react";
import "./PlaygroundPage.scss"; // scss 임포트
import TwoHands from "pages/Game/components/HandDetection/TwoHands";

function PlaygroudPage() {
  return (
    <div>
      <h1>낙서장 페이지</h1>
      <TwoHands targetWord="원숭이" open />
    </div>
  );
}

export default PlaygroudPage;
