import React, { useEffect, useState } from "react";
import IncorrectNoteBox from "../components/ListCarousel";
import styles from "./IncorrectNoteListPage.module.scss";
import { Link } from "react-router-dom";
import { getIncorrectListData } from "api/incorrectNote";
import LoadingSpinner from "components/LoadingSpinner";
import { WORD_TYPE } from "utils/constants";

interface incorrectData {
  sign_id: number;
  word: string;
  wordtype: string;
}
interface labelData {
  labelName: string;
  labelList: incorrectData[];
}
function IncorrectNotePage() {
  const [label, setLabel] = useState<labelData[]>([]);

  // 오답노트 리스트 가져오기
  const { isLoading, error, data } = getIncorrectListData();

  useEffect(() => {
    if (data !== undefined) {
      setLabel([
        {
          labelName: WORD_TYPE[1],
          labelList: data.filter((item: any) => item.wordtype === "1"),
        },
        {
          labelName: WORD_TYPE[2],
          labelList: data.filter((item: any) => item.wordtype === "2"),
        },
        {
          labelName: WORD_TYPE[3],
          labelList: data.filter((item: any) => item.wordtype === "3"),
        },
        {
          labelName: WORD_TYPE[4],
          labelList: data.filter((item: any) => item.wordtype === "4"),
        },
        {
          labelName: WORD_TYPE[5],
          labelList: data.filter((item: any) => item.wordtype === "5"),
        },
      ]);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className={styles["incorrect-wrap"]}>
      <Link to="/main" className={styles["incorrect-wrap__home"]}>
        <img src="images/home.svg" alt="home" />
      </Link>
      <h1 className={styles["incorrect-wrap__title"]}>오답노트</h1>
      <div className={styles["incorrect-wrap__incorrectlist"]}>
        {label?.map((data, index) => (
          <IncorrectNoteBox
            key={index}
            label={data.labelName}
            item={data.labelList}
          />
        ))}
      </div>
    </div>
  );
}

export default IncorrectNotePage;
