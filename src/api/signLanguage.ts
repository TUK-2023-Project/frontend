import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getNextQuestion } from "../redux/actions/SignQuizActions";
import axios from "./baseAxios";

const getQuizList = async (solvedQuestion: number[], categoryId: number) => {
  let solvedListString: string | number = 0; // 기본값으로 0 할당
  if (solvedQuestion.length > 0) {
    solvedListString = solvedQuestion.join(","); // solvedQuestion 배열을 문자열로 변환
  }

  const response = await axios.get("signlanguage/three/", {
    params: {
      category_id: categoryId,
      solvedlist: solvedListString,
    },
  });
  return response.data;
};

const getQuizInfo = async (quizId: number) => {
  const response = await axios.get("signlanguage/info/", {
    params: {
      sign_id: quizId,
    },
  });
  return response.data;
};

export const loadNewQuestion = (
  solvedQuestion: number[],
  categoryId: number
) => {
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery(
    ["quizData", solvedQuestion, categoryId],
    async () => await getQuizList(solvedQuestion, categoryId),
    {
      retry: 0,
      onSuccess: (data) => {
        dispatch(getNextQuestion(data.answer));
      },
    }
  );

  return { isLoading, error, data };
};

export const reviewQuizData = (quizId: number) => {
  const { isLoading, error, data, isSuccess } = useQuery(
    ["getQuizInfo", quizId],
    async () => await getQuizInfo(quizId),
    {
      retry: 0,
    }
  );

  return { isLoading, error, data, isSuccess };
};
