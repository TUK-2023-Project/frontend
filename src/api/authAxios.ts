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
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
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
    onMutate: (variable) => {
      console.log("onMutate", variable);
    },
    onError: (error, variable, context) => {
      console.log(error);
      console.log(variable);
      console.log(context);
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
      moveLogin("/signin");
    },
    onSettled: () => {
      console.log("end");
    },
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
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
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
    onError: (error) => {
      console.log("중복 확인 실패", error);
    },
    onSuccess: (data, variables) => {
      console.log("중복 확인 성공");
      console.log("success", data, variables);
    },
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
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
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
    onError: (error) => {
      console.log("중복 확인 실패", error);
    },
    onSuccess: (data, variables) => {
      console.log("중복 확인 성공");
      console.log("success", data, variables);
    },
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
      onMutate: (variable) => {
        console.log("onMutate", variable);
      },
      onError: (error, variable, context) => {
        console.log(error);
        console.log(variable);
        console.log(context);
      },
      onSuccess: (data, variables, context) => {
        console.log("success", data, variables, context);
        moveHome("/");
        localStorage.clear();
        localStorage.setItem("token", data.access);
      },
      onSettled: (data, error, variables, context) => {
        console.log("end");
        console.log("settled", data, error, variables, context);
      },
    }
  );

  const submitLogin = ({ mail, pw }: LoginUser) => {
    mutate({ mail, pw });
  };

  return { mutate, isLoading, isError, error, isSuccess, submitLogin, data };
};
