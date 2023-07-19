import CommonButton from "components/CommonButton";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import LogoutBtn from "pages/Auth/components/LogoutBtn";
import AboutModal from "./components/AboutModal";
import Lottie from "react-lottie";
import quizBoardLottie from "lotties/quizBoard.json";
import handLottie from "lotties/hand.json";
import { getLottieOptions } from "utils/lottie";

function MainPage() {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("accessToken");

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isAuth == null) {
      navigate("/");
    }
  }, [navigate]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles["background-wrapper"]}>
        <div className={styles["background-wrapper__right"]}>
          <Lottie
            options={getLottieOptions(quizBoardLottie)}
            height={300}
            width={300}
          />
        </div>
        <div className={styles["background-wrapper__left"]}>
          <Lottie
            options={getLottieOptions(handLottie)}
            height={200}
            width={200}
          />
        </div>
      </div>

      {isAuth == null ? (
        <></>
      ) : (
        <div className={styles.logout}>
          <LogoutBtn />
        </div>
      )}
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
        {isAuth == null ? (
          <div className={styles["content__common-btn-wrap-no"]}>
            <Link to="/signin">
              <CommonButton buttonName="시작하기" />
            </Link>
            <Link to="/rank">
              <CommonButton buttonName="랭킹확인" />
            </Link>
          </div>
        ) : (
          <div className={styles["content__common-btn-wrap-yes"]}>
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
        )}
      </div>
      <footer className={styles.footer}>
        {
          "본 저작물은 국립국어원 한국수어사전에서 제공한 수형사진과 영상정보를 활용하였으며 해당 저작물은 https://sldict.korean.go.kr/front/main/main.do에서 무료로 다운받으실수 있습니다. \n © 2023 [한국공학대학교 S-13] All Rights Reserved."
        }
      </footer>
      <AboutModal open={modalOpen} closeAction={handleCloseModal} />
    </>
  );
}

export default MainPage;
