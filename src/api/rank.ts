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

export const useUpdateRank = () => {
  const { isLoading, error, mutate } = useMutation(updateRankInfo, {
    onError: (error) => {
      console.log("랭킹 등록 실패", error);
    },
    onSuccess: () => {
      console.log("랭킹 등록 성공");
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