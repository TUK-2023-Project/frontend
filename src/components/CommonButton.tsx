import React from "react";
import styles from "./CommonButton.module.scss";

interface CommonButtonProps {
  buttonName: string;
  handleClick?: () => void;
}

function CommonButton({ buttonName, handleClick }: CommonButtonProps) {
  return (
    <button className={styles["common-btn"]} onClick={handleClick}>
      {buttonName}
    </button>
  );
}

export default CommonButton;
