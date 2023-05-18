import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "./baseAxios";
import { useCallback } from "react";

// 오답노트 추가
const addIncorrectNote = async (signId: number) => {
  await axios.post("incorrect/add/", { sign_id: signId });
};

const deleteIncorrectNote = async (signId: number) => {
  const response = await axios.post("incorrect/delete/", {
    sign_id: signId,
  });
  return response.data;
};

// 오답노트 리스트 가져오기
const getIncorrectNoteList = async () => {
  const response = await axios.get("incorrect/list");
  return response.data.data_list;
};

// 오답노트 상세 정보 가져오기
const getIncorrectNoteListItem = async (signId: number) => {
  const response = await axios.get("signlanguage/info/", {
    params: {
      sign_id: signId,
    },
  });
  return response.data;
};

export const addIncorrectData = () => {
  const { mutate, isLoading, isSuccess } = useMutation(addIncorrectNote, {
    onError: (error) => {
      console.log("오답노트 추가 실패", error);
    },
    onSuccess: () => {
      console.log("오답노트 추가");
    },
  });
  const addIncorrectList = (signId: number) => {
    mutate(signId);
  };

  return { isLoading, isSuccess, addIncorrectList };
};

export const deleteIncorrectData = () => {
  const { mutate, isLoading, data, isSuccess, isError } = useMutation(
    deleteIncorrectNote,
    {
      onMutate: (variable) => {},
      onError: (error, variable, context) => {
        console.log(error);
      },
      onSuccess: (data, variable, context) => {
        console.log("오답노트 삭제", variable);
      },
      onSettled: () => {},
    }
  );
  const deleteIncorrectList = useCallback(
    (signId: number) => {
      mutate(signId);
    },
    [mutate]
  );
  return { isLoading, data, isSuccess, isError, deleteIncorrectList };
};
export const getIncorrectListData = () => {
  const { isLoading, error, data } = useQuery(
    ["incorrectList"],
    async () => await getIncorrectNoteList(),
    {
      retry: 0,
      onSuccess: () => {},
    }
  );
  return { isLoading, error, data };
};
export const getIncorrectItemData = (signId: number) => {
  const { isLoading, error, data } = useQuery(
    ["incorrectItem", signId],
    async () => await getIncorrectNoteListItem(signId),
    {
      enabled: signId !== -1,
      retry: 0,
      onSuccess: () => {},
    }
  );
  return { isLoading, error, data };
};
