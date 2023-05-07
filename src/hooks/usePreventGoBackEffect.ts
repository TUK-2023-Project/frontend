import { useEffect, useCallback } from "react";

// 뒤로 가기 막기 이벤트
const usePreventGoBack = () => {
  const preventGoBack = useCallback(() => {
    history.pushState(null, "", location.href);
    alert("뒤로가기 불가!");
  }, []);

  return preventGoBack;
};

export const usePreventGoBackEffect = () => {
  const preventGoBack = usePreventGoBack();

  useEffect(() => {
    (() => {
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", preventGoBack);
    })();

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [preventGoBack]);
};
