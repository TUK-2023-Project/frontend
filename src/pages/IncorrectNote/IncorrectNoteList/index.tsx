import React, { useEffect, useState } from "react";
import IncorrectNoteBox from "../components/ListCarousel";
import styles from "./IncorrectNoteListPage.module.scss";

function IncorrectNotePage() {
  interface incorrectData {
    word: string;
    content: string;
    img: string;
  }
  const [consonant, setConsonant] = useState<incorrectData[]>();
  const [vowel, setVowel] = useState<incorrectData[]>();
  const [alphabet, setAlphabet] = useState<incorrectData[]>();
  const [number, setNumber] = useState<incorrectData[]>();
  // 오답노트 리스트 가져오기
  async function getIncorrectNoteData() {
    try {
      await fetch("../dummy/incorrectNote.json", {
        headers: {
          Accept: "application/json",
        },
        method: "GET",
      })
        .then((response: { json: () => any }) => response.json())
        .then((result: any) => {
          setConsonant(result.자음);
          setVowel(result.모음);
          setAlphabet(result.알파벳);
          setNumber(result.숫자);
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    void getIncorrectNoteData();
  }, []);

  return (
    <div className={styles["incorrect-wrap"]}>
      <h1 className={styles["incorrect-wrap__title"]}>오답노트</h1>
      <div className={styles["incorrect-wrap__incorrectlist"]}>
        <IncorrectNoteBox label="자음" data={consonant} />
        <IncorrectNoteBox label="모음" data={vowel} />
        <IncorrectNoteBox label="알파벳" data={alphabet} />
        <IncorrectNoteBox label="숫자" data={number} />
      </div>
    </div>
  );
}

export default IncorrectNotePage;
