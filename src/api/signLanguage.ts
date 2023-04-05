import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getNextQuestion } from "../redux/actions/SignQuizActions";
import axios from "axios";

const getQuizData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  const res = await axios.get("../dummy/random_three_question.json");
  const data = res.data;
  console.log(data);
  return data;
};

export const loadNewQuestion = () => {
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery(["quizData"], getQuizData, {
    retry: 0,
    onSuccess: (data) => {
      dispatch(getNextQuestion(data.answer));
    },
  });

  return { isLoading, error, data };
};
