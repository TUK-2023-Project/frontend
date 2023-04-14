import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IsLogin from "./IsLogin";

export default function PrivatePage({
  Component1,
  Component2,
  text,
  link,
}: any) {
  const navigate = useNavigate();
  useEffect(() => {
    if (IsLogin()) {
      navigate(link, { replace: true });
      alert(text);
    }
  }, [IsLogin]);

  return IsLogin() ? <Component1 /> : <Component2 />;
}
