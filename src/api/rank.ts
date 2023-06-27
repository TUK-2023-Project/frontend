import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "./baseAxios";

const updateRankInfo = async (gameScore: number) => {
  await axios.post("ranks/save/", {
    score: gameScore,
  });
};

const getRankInfo = async () => {
  const response = await axios.get("ranks/");
  return response.data;
};

const getSelfRank = async () => {
  const response = await axios.get("ranks/self");
  return response.data;
};

export const useUpdateRank = (onSuccess: () => void) => {
  const { isLoading, error, mutate } = useMutation(updateRankInfo, {
    onError: (error) => {
      console.log("랭킹 등록 실패", error);
    },
    onSuccess: () => {
      console.log("랭킹 등록 성공");
      onSuccess();
    },
  });

  const submitRank = (gameScore: number) => {
    mutate(gameScore);
  };

  return { isLoading, error, submitRank };
};

export const loadRankList = () => {
  const { isLoading, error, data } = useQuery(
    ["getRankInfo"],
    async () => {
      return await getRankInfo();
    },
    {
      retry: 0,
    }
  );

  return { isLoading, error, data };
};

export const loadSelfRank = (isLogin: boolean) => {
  const { isLoading, error, data } = useQuery(
    ["getSelfRank"],
    async () => {
      return await getSelfRank();
    },
    {
      enabled: isLogin,
      retry: 0,
    }
  );

  return { isLoading, error, data };
};
