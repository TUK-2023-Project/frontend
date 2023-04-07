import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getNextQuestion } from "../redux/actions/SignQuizActions";
import axios from "axios";
// import axios from "./baseAxios";

interface SignLanguageInfo {
  word: string;
  context: string;
  photo_url: string;
}

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

const getQuizInfo = async (quizId: number): Promise<SignLanguageInfo> => {
  console.log(quizId);

  // await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  // const res = await axios.get("../dummy/quizData.json");
  // const data = res.data;

  const formData = new FormData();
  formData.append("sign_id", quizId.toString());

  const response = await axios.post<{ sign_language_info: SignLanguageInfo }>(
    "http://localhost:8000/api/v1/signlanguage/info/",
    formData,
    {
      headers: {
        access: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwODc4NjYyLCJpYXQiOjE2ODA4NzE0NjIsImp0aSI6ImZkZGRmMGVlMjZjMTQxOGRiYThiNzRjNjIyY2M0NmNiIiwidXNlcl9pZCI6MX0.jk5rUUDorRomSVksbxcoE8Lzmtobrd05sPpjWL7730k`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.sign_language_info;
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
