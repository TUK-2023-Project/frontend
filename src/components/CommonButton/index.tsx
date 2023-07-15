import React from "react";
import styles from "./CommonButton.module.scss";

interface CommonButtonProps {
  buttonName: string;
  handleClick?: () => void;
  isSelected?: boolean;
  color?: string;
}

function CommonButton({
  buttonName,
  handleClick,
  isSelected = false,
  color = "yellow",
}: CommonButtonProps) {
  return (
    <button
      className={`${styles["common-btn"]} ${
        isSelected ? styles["common-btn--selected"] : ""
      } ${styles[color]}`}
      onClick={handleClick}
    >
      {buttonName}
    </button>
  );
}

export default CommonButton;
