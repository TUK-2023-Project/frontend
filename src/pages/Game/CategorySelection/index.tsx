import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveNextStage } from "redux/actions/SignQuizActions";
import { useNavigate } from "react-router-dom";
import CommonButton from "components/CommonButton/CommonButton";
import styles from "./CategorySelection.module.scss";

const QuizReview = () => {
  const navigate = useNavigate();
  const redirectToRankPage = () => {
    navigate("/rank");
  };
  const dispatch = useDispatch();
  const isEnd = useSelector(
    (state: { SignQuiz: { isEnd: boolean } }) => state.SignQuiz.isEnd
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSelected, setIsSelected] = useState(false);

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null
  );
  const handleClick = (index: number) => {
    if (selectedButtonIndex !== index) {
      setSelectedButtonIndex(index);
    }
  };

  const handleMove = () => {
    if (isEnd) {
      redirectToRankPage();
    } else {
      dispatch(moveNextStage());
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          {"풀이하고자 하는 퀴즈의 카테고리를 선택해주세요"}
        </h1>
        <h1
          className={
            isSelected
              ? styles["header__sub-title"]
              : styles["header__sub-title"]
          }
        >
          {"선택이 완료되었다면 오른손을 활짝 펼쳐 카메라에 비춰주세요"}
        </h1>
      </div>

      <div className={styles["category-wrapper"]}>
        <CommonButton
          buttonName={"자음"}
          handleClick={() => {
            handleClick(0);
          }}
          isSelected={selectedButtonIndex === 0}
        />
        <CommonButton
          buttonName={"모음"}
          handleClick={() => {
            handleClick(1);
          }}
          isSelected={selectedButtonIndex === 1}
        />
        <CommonButton
          buttonName={"알파벳"}
          handleClick={() => {
            handleClick(2);
          }}
          isSelected={selectedButtonIndex === 2}
        />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: "50%",
        }}
      >
        <CommonButton
          handleClick={handleMove}
          buttonName={"넘어가기용 데모 버튼(향후 삭제)"}
        />
      </div>
    </div>
  );
};

export default QuizReview;
