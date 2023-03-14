import React from "react";
import "./FormButton.scss";

interface FormButtonProps {
  text: string;
}

function FormButton({ text }: FormButtonProps) {
  return (
    <div className="FormButtonWrap">
      <div className="FormButton">{text}</div>
    </div>
  );
}

export default FormButton;
