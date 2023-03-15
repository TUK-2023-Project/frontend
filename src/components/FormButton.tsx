import React from "react";
import { Link } from "react-router-dom";
import "./FormButton.scss";

interface FormButtonProps {
  text: string;
  allow: boolean;
  url: string;
}

function FormButton({ text, allow, url }: FormButtonProps) {
  return (
    <div className="FormButtonWrap">
      <Link to={url}>
        <button disabled={allow} className="FormButton">
          {text}
        </button>
      </Link>
    </div>
  );
}

export default FormButton;
