import React, { useState } from "react";
import "./FormBox.scss";

interface FormBoxProps {
  icon: string;
  text: string;
  type: string;
  placeholder: string;
  condition: string;
  onChange?: any;
  data: string;
  valid: boolean;
}

function FormBox({
  icon,
  text,
  type,
  placeholder,
  condition,
  onChange = () => {},
  data,
  valid,
}: FormBoxProps) {
  const [value, setValue] = useState<string>(data);

  const handleDataChange = (e: any) => {
    setValue(e.target.value);
    onChange({ target: { name: placeholder, value: e.target.value } });
  };
  return (
    <div className="FormBox">
      <div className="Form">
        <div className="FormIcon">
          <img src={icon} alt="icon" />
        </div>
        <div className="FormInput">
          <div className="FormInfo">{text}</div>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleDataChange}
          />
        </div>
      </div>
      {!valid && data.length > 0 && (
        <div className="FormCondition">{condition}</div>
      )}
    </div>
  );
}

export default FormBox;
