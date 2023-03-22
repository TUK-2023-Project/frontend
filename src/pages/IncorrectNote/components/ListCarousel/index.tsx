/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from "react";
import styles from "./IncorrectNoteBox.module.scss";
import Slider from "react-slick";
import DetailModal from "../DetailModal";

interface IncorrectNoteBoxProps {
  label: string;
}

function IncorrectNoteBox({ label }: IncorrectNoteBoxProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const clickModal = (open: boolean) => {
    setOpenModal(open);
  };
  return (
    <div className={styles["slide-wrap"]}>
      <div className={styles["slide-wrap__label"]}>{label}</div>
      <div className={styles["slide-wrap__slide"]}>
        <Slider {...settings}>
          <div
            className={styles["slide-wrap__detail"]}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <div className={styles["slide-wrap__detail__word"]}>ㄱ</div>
          </div>
          {/* <div className={styles["slide-wrap__word"]}>ㄱ</div>
          <div className={styles["slide-wrap__word"]}>ㄱ</div> */}
        </Slider>
        {openModal ? (
          <DetailModal
            open={true}
            clickModal={clickModal}
            word="ㄱ"
            img="images/user.svg"
            contents="기역입니다."
          />
        ) : null}
      </div>
    </div>
  );
}

export default IncorrectNoteBox;
