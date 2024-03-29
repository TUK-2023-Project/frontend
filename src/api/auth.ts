import { useMutation } from "@tanstack/react-query";
import baseAxios from "./baseAxios";
import { useNavigate } from "react-router-dom";

// 회원가입 api
interface UserDataType {
  username: string;
  mail: string;
  pw: string;
}

const registerUser = async ({ username, mail, pw }: UserDataType) => {
  await baseAxios.post("users/register/", {
    name: username,
    email: mail,
    password: pw,
  });
};

export const registerUserData = () => {
  const moveLogin = useNavigate();
  const {
    mutate,
    isLoading,
    isError,
    error,
    data,
    isSuccess: isSuccess2,
  } = useMutation(registerUser, {
    onMutate: (variable) => {},
    onError: () => {
      alert("회원 등록을 실패하였습니다. 다시 이용해주세요!");
    },
    onSuccess: (data, variables, context) => {
      moveLogin("/signin");
    },
    onSettled: () => {},
  });

  const submitUserData = ({ username, mail, pw }: UserDataType) => {
    mutate({ username, mail, pw });
  };

  return {
    mutate,
    isLoading,
    isError,
    error,
    data,
    isSuccess2,
    submitUserData,
  };
};

// 회원가입 중복 체크 api
const duplicateEmail = async (mail: string) => {
  const { data } = await baseAxios.post("users/emailcheck/", {
    email: mail,
  });
  return data;
};

export const checkDuplicateEmail = () => {
  const {
    isLoading,
    error,
    mutate,
    isSuccess: isSuccess1,
    data,
  } = useMutation(duplicateEmail, {
    onError: () => {},
    onSuccess: (data, variables) => {},
  });

  const checkDupliEmail = (email: string) => {
    mutate(email);
  };

  return {
    isLoading,
    error,
    data,
    isSuccess1,
    checkDupliEmail,
  };
};

const duplicateNickname = async (username: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  const { data } = await baseAxios.post("users/namecheck/", {
    name: username,
  });
  return data;
};

export const checkDuplicateNickname = () => {
  const {
    isLoading,
    error,
    mutate,
    data: dataNickname,
    isSuccess: isSuccess3,
  } = useMutation(duplicateNickname, {
    onError: () => {},
    onSuccess: (data, variables) => {},
  });
  const checkDupliNickname = (nickname: string) => {
    mutate(nickname);
  };

  return {
    isLoading,
    error,
    mutate,
    isSuccess3,
    dataNickname,
    checkDupliNickname,
  };
};

// 로그인 api
interface LoginUser {
  mail: string;
  pw: string;
}

const loginUser = async ({ mail, pw }: LoginUser) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  const { data } = await baseAxios.post("users/login/", {
    email: mail,
    password: pw,
  });
  return data;
};

export const loginUserData = () => {
  const moveHome = useNavigate();
  const { mutate, isLoading, isError, error, isSuccess, data } = useMutation(
    loginUser,
    {
      onMutate: (variable) => {},
      onError: () => {
        alert("존재하지 않는 정보입니다. 다시 입력해주세요!");
      },
      onSuccess: (data, variables, context) => {
        if (data.CODE === "004") {
          alert("이메일이 일치하지 않습니다. 다시 입력해주세요!");
        } else if (data.CODE === "003") {
          alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요!");
        } else {
          moveHome("/");
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
        }
      },
      onSettled: (data, error, variables, context) => {},
    }
  );

  const submitLogin = ({ mail, pw }: LoginUser) => {
    mutate({ mail, pw });
  };

  return { mutate, isLoading, isError, error, isSuccess, submitLogin, data };
};

export const updateAccessToken = async (refreshToken: string) => {
  const response = await baseAxios.post("users/login/refresh/", {
    refresh: refreshToken,
  });
  return response.data.access;
};
