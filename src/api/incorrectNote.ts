import { useQuery } from "@tanstack/react-query";
import axios from "./baseAxios";

// 오답노트 추가
const addIncorrectNote = async (signId: number) => {
  const response = await axios.get("incorrect/add/", {
    params: {
      sign_id: signId,
    },
  });
  return response.data;
};

const deleteIncorrectNote = async (signId: number) => {
  const response = await axios.get("incorrect/delete", {
    params: {
      sign_id: signId,
    },
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

export const addIncorrectData = (signId: number) => {
  const { isLoading, error, data } = useQuery(
    ["addIncorrect"],
    async () => await addIncorrectNote(signId),
    {
      retry: 0,
    }
  );
  return { isLoading, error, data };
};
export const deleteIncorrectData = (signId: number) => {
  const { isLoading, error, data } = useQuery(
    ["deleteIncorrect"],
    async () => await deleteIncorrectNote(signId),
    {
      retry: 0,
      onSuccess: () => {
        console.log("성공");
      },
    }
  );
  return { isLoading, error, data };
};
export const getIncorrectListData = () => {
  const { isLoading, error, data } = useQuery(
    ["incorrectList"],
    async () => await getIncorrectNoteList(),
    {
      retry: 0,
      onSuccess: () => {
        console.log("성공");
      },
    }
  );
  return { isLoading, error, data };
};
export const getIncorrectItemData = (signId: number) => {
  const { isLoading, error, data } = useQuery(
    ["incorrectItem", signId],
    async () => await getIncorrectNoteListItem(signId),
    {
      retry: 0,
      onSuccess: () => {
        console.log("성공", data);
      },
    }
  );
  return { isLoading, error, data };
};
