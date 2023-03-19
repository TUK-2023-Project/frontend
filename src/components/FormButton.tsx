import React from "react";
import { Link } from "react-router-dom";
import styles from "./FormButton.module.scss";

interface FormButtonProps {
  text: string;
  allow: boolean;
  url: string;
}

function FormButton({ text, allow, url }: FormButtonProps) {
  return (
    <div className={styles["form-btn-wrap"]}>
      <Link to={url}>
        <button disabled={allow} className={styles["form-btn-wrap__form-btn"]}>
          {text}
        </button>
      </Link>
    </div>
  );
}

export default FormButton;
