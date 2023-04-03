import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setNewNickname } from "../redux/actions/TestActions";

const getUserName = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Loading 테스트
  const res = await fetch("../dummy/duplication.json");
  const json = await res.json();
  console.log(json);
  return json;
};

export const loadUserNameData = () => {
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery(["nicknameData"], getUserName, {
    retry: 0,
    onSuccess: (data) => {
      dispatch(setNewNickname(data.nicknameData));
    },
  });

  return { isLoading, error, data };
};
