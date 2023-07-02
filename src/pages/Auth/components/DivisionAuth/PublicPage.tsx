import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IsLogin from "utils/auth";
import MainPage from "pages/MainPage";

export default function PublicPage({ Component, text, link }: any) {
  const navigate = useNavigate();
  useEffect(() => {
    if (IsLogin()) {
      navigate(link, { replace: true });
      alert(text);
    }
  }, [IsLogin]);

  return IsLogin() ? <MainPage /> : <Component />;
}
