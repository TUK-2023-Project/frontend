import { useMutation } from "@tanstack/react-query";
import baseAxios from "./baseAxios";
import { useState } from "react";

// 회원가입 api
interface UserDataType {
  username: string;
  mail: string;
  pw: string;
}

const registerUser = async ({ username, mail, pw }: UserDataType) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  await baseAxios.post("users/register/", {
    name: username,
    email: mail,
    password: pw,
  });
};

export const registerUserData = () => {
  const success = false;
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

  return { isLoading, error, data, isSuccess1, checkDupliEmail };
};

// const duplicateNickname = async (username: string) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
//   await baseAxios.post("users/emailcheck", {
//     name: username,
//   });
// };

// export const checkDuplicateNickname = () => {
//   const { isLoading, error, mutate } = useMutation(duplicateNickname, {
//     onError: (error) => {
//       console.log("중복 확인 실패", error);
//     },
//     onSuccess: (data, variables, context) => {
//       console.log("중복 확인 성공");
//       console.log("success", data, variables, context);
//     },
//   });

//   const checkDupliNickname = (nickname: string) => {
//     mutate(nickname);
//   };

//   return { isLoading, error, mutate, checkDupliNickname };
// };
