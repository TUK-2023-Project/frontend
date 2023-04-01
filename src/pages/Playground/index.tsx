import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNewNickname } from "redux/actions/TestActions";
import "./PlaygroundPage.scss"; // scss 임포트
import { useQuery } from "@tanstack/react-query";
import { fetchingData } from "../../api/test";

function PlaygroudPage() {
  const dispatch = useDispatch();
  const nickname = useSelector(
    (state: { Test: { nickname: string } }) => state.Test.nickname
  );
  const [name, setName] = useState(nickname);

  const {
    isLoading,
    error,
    data: nicknameData,
  } = useQuery(["nicknameData"], fetchingData);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (nicknameData) {
      dispatch(setNewNickname(nicknameData.nicknameData));
    }
  }, [nicknameData]);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (error) {
    return <h1>error</h1>;
  }
  return (
    <div>
      <h1>낙서장 페이지</h1>
      <h2>이름: {nickname}</h2>
    </div>
  );
}

export default PlaygroudPage;
