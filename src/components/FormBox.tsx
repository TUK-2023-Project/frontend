/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from "react";
import styles from "./FormBox.module.scss";

interface FormBoxProps {
  icon: string;
  text: string;
  type: string;
  placeholder: string;
  condition: string;
  onChange?: any;
  data: string;
  blurEvent: () => void;
}

function FormBox({
  icon,
  text,
  type,
  placeholder,
  condition,
  onChange = () => {},
  data,
  blurEvent,
}: FormBoxProps) {
  const [value, setValue] = useState<string>(data);

  const handleDataChange = (e: any) => {
    setValue(e.target.value);
    onChange({ target: { name: placeholder, value: e.target.value } });
  };

  return (
    <div className={styles["form-box"]}>
      <div className={styles["form-box__form"]}>
        <div className={styles["form-box__form__form-icon"]}>
          <img src={icon} alt="icon" />
        </div>
        <div className={styles["form-box__form__form-input"]}>
          <div className={styles["form-box__form__form-input__form-info"]}>
            {text}
          </div>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleDataChange}
            onBlur={blurEvent}
          />
        </div>
      </div>
      <div className={styles["form-box__form-condition"]}>{condition}</div>
    </div>
  );
}

export default FormBox;
