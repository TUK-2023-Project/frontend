import { useMutation, useQuery, useQueries } from "@tanstack/react-query";
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

export const loadRankData = (isEnd: boolean) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["getRankInfo"],
        queryFn: getRankInfo,
        retry: 0,
      },
      {
        queryKey: ["getSelfRank"],
        queryFn: getSelfRank,
        retry: 0,
        enabled: isEnd,
      },
    ],
  });

  return results;
};
