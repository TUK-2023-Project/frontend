import React from "react";
import "./CommonButton.scss";

interface CommonButtonProps {
  buttonName: string;
}

function CommonButton({ buttonName }: CommonButtonProps) {
  return <button className="CommonBtn">{buttonName}</button>;
}

export default CommonButton;
