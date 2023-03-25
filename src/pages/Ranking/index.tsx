import React from "react";
import { useSelector } from "react-redux";
import styles from "./Ranking.module.scss";
import CommonButton from "components/CommonButton/CommonButton";
import { useNavigate } from "react-router-dom";
import FlowerEfftect from "../Game/components/FlowerEffect";

const Ranking = () => {
  const navigate = useNavigate();
  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
  );

  const redirectToMainPage = () => {
    navigate("/main");
  };

  const handleMove = () => {
    redirectToMainPage();
  };

  const data = [
    { rank: 1, name: "Alice", score: 100 },
    { rank: 2, name: "Bob", score: 90 },
    { rank: 3, name: "Charlie", score: 80 },
    { rank: 4, name: "David", score: 70 },
    { rank: 6, name: "Eve", score: 50 },
    { rank: 7, name: "Eve", score: 50 },
    { rank: 7, name: "Eve", score: 50 },
    { rank: 8, name: "Eve", score: 50 },
    { rank: 9, name: "Eve", score: 50 },
    { rank: 10, name: "Eve", score: 50 },
  ];

  return (
    <div>
      {score !== 0 && <FlowerEfftect />}
      <div className={styles.content}>
        <></>
        {score !== 0 && (
          <>
            <h1 className={styles.content__title}>점수 : {score}</h1>
            <h1 className={styles.content__title}>순위 : {"3등"}</h1>
          </>
        )}
        <div>
          <table className={styles.content__table}>
            <thead className={styles.content__table__title}>
              <tr>
                <th>랭킹</th>
                <th>이름</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.rank}>
                  <td>{item.rank}</td>
                  <td>{item.name}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.footer}>
        <CommonButton handleClick={handleMove} buttonName={"오답노트 확인"} />
        <CommonButton handleClick={handleMove} buttonName={"공유하기"} />
        <CommonButton
          handleClick={redirectToMainPage}
          buttonName={"메인으로"}
        />
      </div>
    </div>
  );
};

export default Ranking;
