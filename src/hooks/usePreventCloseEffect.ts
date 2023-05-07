import { useEffect, useCallback } from "react";

// 새로 고침 막기 이벤트
const usePreventClose = () => {
  const preventClose = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  }, []);
  return preventClose;
};

export const usePreventCloseEffect = () => {
  const preventClose = usePreventClose();
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, [preventClose]);
};
