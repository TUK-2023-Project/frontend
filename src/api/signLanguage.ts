import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getNextQuestion } from "../redux/actions/SignQuizActions";
import axios from "axios";

const getQuizData = async (solvedQuestion: number[], categoryId: number) => {
  console.log(categoryId);
  console.log(solvedQuestion);

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  const res = await axios.get("../dummy/random_three_question.json");
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
    async () => await getQuizData(solvedQuestion, categoryId),
    {
      retry: 0,
      onSuccess: (data) => {
        dispatch(getNextQuestion(data.answer));
      },
    }
  );

  return { isLoading, error, data };
};
