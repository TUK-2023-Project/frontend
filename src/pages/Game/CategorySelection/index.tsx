import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectCategory, moveNextStage } from "redux/actions/SignQuizActions";
import CommonButton from "components/CommonButton/CommonButton";
import styles from "./CategorySelection.module.scss";

const CategorySelection = () => {
  const dispatch = useDispatch();

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(
    null
  );
  const handleClick = (index: number) => {
    if (selectedButtonIndex !== index) {
      setSelectedButtonIndex(index);
    }
  };

  const handleMove = () => {
    if (selectedButtonIndex !== null) {
      dispatch(selectCategory(selectedButtonIndex));
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
            selectedButtonIndex !== null
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

export default CategorySelection;
