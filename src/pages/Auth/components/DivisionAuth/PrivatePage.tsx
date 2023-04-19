import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IsLogin from "./IsLogin";
import MainPage from "pages/MainPage";

export default function PrivatePage({ Component, text, link }: any) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!IsLogin()) {
      navigate(link, { replace: true });
      alert(text);
    }
  }, [IsLogin]);

  return IsLogin() ? <Component /> : <MainPage />;
}
