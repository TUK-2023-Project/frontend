import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getNextQuestion } from "../redux/actions/SignQuizActions";
import axios from "axios";
// import axios from "./baseAxios";

const getQuizList = async (solvedQuestion: number[], categoryId: number) => {
  console.log(categoryId);
  console.log(solvedQuestion);

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  const res = await axios.get("../dummy/random_three_question.json");
  const data = res.data;

  /**
   * 이름 : 정태원
   * 날짜 : 4/5
   * 내용 : 실 api가 연동되면 주석을 풀고 테스트하기
   */

  // const data = await axios.post(`url_info`, {
  //   type: categoryId,
  //   completedQuestions: solvedQuestion,
  // });

  return data;
};

const getQuizInfo = async (quizId: number) => {
  console.log(quizId);

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  const res = await axios.get("../dummy/quizData.json");
  const data = res.data;
  return data;
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
  const { isLoading, error, data } = useQuery(
    ["getQuizInfo", quizId],
    async () => await getQuizInfo(quizId),
    {
      retry: 0,
    }
  );

  return { isLoading, error, data };
};
