import React from "react";
import "./FormBox.scss";

interface FormBoxProps {
  icon: string;
  text: string;
  type: string;
  placeholder: string;
}

function FormBox({ icon, text, type, placeholder }: FormBoxProps) {
  return (
    <div className="FormBox">
      <div className="Form">
        <div className="FormIcon">
          <img src={icon} alt="icon" />
        </div>
        <div className="FormInput">
          <div className="FormInfo">{text}</div>
          <input type={type} id="email" placeholder={placeholder} />
        </div>
      </div>
    </div>
  );
}

export default FormBox;
