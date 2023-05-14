import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import CommonButton from "components/CommonButton";
import FireworksEffect from "../../components/FireworksEffect";
import styles from "./AllProblemsSolved.module.scss";

import { useUpdateRank } from "api/rank";
import { usePreventGoBackEffect } from "hooks/usePreventGoBackEffect";
import { WORD_TYPE } from "utils/constants";

const AllProblemsSolved = () => {
  usePreventGoBackEffect();

  const navigate = useNavigate();
  const redirectToRankPage = () => {
    navigate("/rank");
  };

  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
  );

  const categoryId = useSelector(
    (state: { SignQuiz: { categoryId: number } }) => state.SignQuiz.categoryId
  );

  const { submitRank } = useUpdateRank(redirectToRankPage);

  const handleMove = () => {
    submitRank(score);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgb(240 240 240 / 0%)",
      }}
    >
      <div style={{ zIndex: -1 }}>
        <FireworksEffect />
      </div>

      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "1rem",
        }}
      >
        {`${WORD_TYPE[categoryId]} 카테고리에 대한 모든 문제를 풀이하셨습니다`}
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "normal",
          color: "#555",
          marginBottom: "2rem",
          whiteSpace: "pre",
        }}
      >
        {
          "축하드립니다!! \n 수어 전문가에 한 발짝 더 가까워졌습니다. 계속해서 새로운 카테고리에 도전해보세요!"
        }
      </p>

      <div className={styles["content__button-wrapper"]}>
        <CommonButton handleClick={handleMove} buttonName={"랭킹 확인"} />
      </div>
    </div>
  );
};

export default AllProblemsSolved;
