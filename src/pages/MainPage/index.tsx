import CommonButton from "components/CommonButton";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.scss";
import AboutModal from "./components/AboutModal";

function MainPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  const clickModal = (open: boolean) => {
    setModalOpen(open);
  };

  return (
    <>
      <div className={styles.content}>
        <h1>
          <div className={styles.content__title}>
            <p>수 퀴즈</p>
            <img
              className={styles.content__title__aboutImg}
              src="images/about.svg"
              alt="about"
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </div>
          Sign-language-Quiz
        </h1>
        <div className={styles["content__common-btn-wrap"]}>
          <Link to="/game">
            <CommonButton buttonName="시작하기" />
          </Link>
          <Link to="/rank">
            <CommonButton buttonName="랭킹확인" />
          </Link>
          <Link to="/incorrectnote">
            <CommonButton buttonName="오답노트" />
          </Link>
        </div>
      </div>
      <AboutModal open={modalOpen} clickModal={clickModal} />
    </>
  );
}

export default MainPage;
