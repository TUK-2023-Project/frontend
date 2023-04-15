import CommonButton from "components/CommonButton";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import LogoutBtn from "pages/Auth/components/LogoutBtn";
import AboutModal from "./components/AboutModal";

interface LottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: never[];
  layers: never[];
}

function MainPage() {
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("accessToken");

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isAuth == null) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  const clickModal = (open: boolean) => {
    setModalOpen(open);
  };

  return (
    <>
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
      <AboutModal open={modalOpen} clickModal={clickModal} />
    </>
  );
};

export default MainPage;
