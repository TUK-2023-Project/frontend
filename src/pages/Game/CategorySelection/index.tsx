import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectCategory } from "redux/actions/SignQuizActions";
import CommonButton from "components/CommonButton";
import styles from "./CategorySelection.module.scss";
import { WORD_TYPE } from "utils/constants";
const CategorySelection = () => {
  const dispatch = useDispatch();

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(-1);
  const [infoMessage, setInfoMessage] = useState("");

  const handleClick = (index: number) => {
    if (selectedButtonIndex !== index) {
      setSelectedButtonIndex(index);
      dispatch(selectCategory(index + 1));
    }

    if (index >= 2) {
      setInfoMessage(
        "단어&문장의 경우 두 손을 활용해 게임을 진행해주세요 (두 손)"
      );
    } else {
      setInfoMessage(
        "자음, 모음의 경우 오른손을 이용해 게임을 진행해주세요 (한 손)"
      );
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
            selectedButtonIndex !== null
              ? styles["header__sub-title"]
              : styles["header__sub-title"]
          }
        >
          {"선택이 완료되었다면 오른손을 활짝 펼쳐 카메라에 비춰주세요"}
        </h1>
        <h1
          className={
            selectedButtonIndex !== null
              ? styles["header__sub-title"]
              : styles["header__sub-title"]
          }
          style={{
            color: "red",
            fontWeight: "bold",
          }}
        >
          {infoMessage}
        </h1>
      </div>

      <div className={styles["category-wrapper"]}>
        <CommonButton
          buttonName={WORD_TYPE[1]}
          handleClick={() => {
            handleClick(0);
          }}
          isSelected={selectedButtonIndex === 0}
        />
        <CommonButton
          buttonName={WORD_TYPE[2]}
          handleClick={() => {
            handleClick(1);
          }}
          isSelected={selectedButtonIndex === 1}
        />
        <CommonButton
          buttonName={WORD_TYPE[3]}
          handleClick={() => {
            handleClick(2);
          }}
          isSelected={selectedButtonIndex === 2}
        />
        <CommonButton
          buttonName={WORD_TYPE[4]}
          handleClick={() => {
            handleClick(3);
          }}
          isSelected={selectedButtonIndex === 3}
        />
        <CommonButton
          buttonName={WORD_TYPE[5]}
          handleClick={() => {
            handleClick(4);
          }}
          isSelected={selectedButtonIndex === 4}
        />
      </div>
    </div>
  );
};

export default CategorySelection;
