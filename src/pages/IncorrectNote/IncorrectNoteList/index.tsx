import React, { useEffect, useState } from "react";
import IncorrectNoteBox from "../components/ListCarousel";
import styles from "./IncorrectNoteListPage.module.scss";
import { Link } from "react-router-dom";
import { getIncorrectListData } from "api/incorrectNote";
import LoadingSpinner from "components/LoadingSpinner";
interface incorrectData {
  sign_id: number;
  word: string;
  wordtype: string;
}
function IncorrectNotePage() {
  const [consonant, setConsonant] = useState<incorrectData[]>();
  const [vowel, setVowel] = useState<incorrectData[]>();

  // 오답노트 리스트 가져오기
  const { isLoading, error, data } = getIncorrectListData();

  useEffect(() => {
    const consonantList = [];
    const vowelList = [];
    for (let i = 0; i < data?.length; i++) {
      if (data[i].wordtype === "1") {
        consonantList.push(data[i]);
      } else if (data[i].wordtype === "2") {
        vowelList.push(data[i]);
      }
    }
    setConsonant(consonantList);
    setVowel(vowelList);
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
        <IncorrectNoteBox label="자음" item={consonant} />
        <IncorrectNoteBox label="모음" item={vowel} />
      </div>
    </div>
  );
}

export default IncorrectNotePage;
