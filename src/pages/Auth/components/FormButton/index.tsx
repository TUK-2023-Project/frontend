import React from "react";
import styles from "./FormButton.module.scss";

interface FormButtonProps {
  text: string;
  allow: boolean;
  url?: string;
  onClick?: () => void;
}

function FormButton({ text, allow, url, onClick = () => {} }: FormButtonProps) {
  return (
    <div className={styles["form-btn-wrap"]} onClick={onClick}>
      <button disabled={allow} className={styles["form-btn-wrap__form-btn"]}>
        {text}
      </button>
    </div>
  );
}

export default FormButton;
