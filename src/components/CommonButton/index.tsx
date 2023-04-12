import React from "react";
import styles from "./CommonButton.module.scss";

interface CommonButtonProps {
  buttonName: string;
  handleClick?: () => void;
  isSelected?: boolean;
}

function CommonButton({
  buttonName,
  handleClick,
  isSelected = false,
}: CommonButtonProps) {
  return (
    <button
      className={`${styles["common-btn"]} ${
        isSelected ? styles["common-btn--selected"] : ""
      }`}
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
}

export default CommonButton;
