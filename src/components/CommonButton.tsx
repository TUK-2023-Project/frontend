import React from "react";
import styles from "./CommonButton.module.scss";

interface CommonButtonProps {
  buttonName: string;
}

function CommonButton({ buttonName }: CommonButtonProps) {
  return <button className={styles["common-btn"]}>{buttonName}</button>;
}

export default CommonButton;
