/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from "react";
import styles from "./IncorrectNoteBox.module.scss";
import Slider from "react-slick";
import DetailModal from "../DetailModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface incorrectData {
  word: string;
  content: string;
  img: string;
}

interface IncorrectNoteBoxProps {
  label: string;
  data?: incorrectData[];
}

// 오답노트 리스트
function IncorrectNoteBox({ label, data }: IncorrectNoteBoxProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedImg, setSelectedImg] = useState<string>("");
  const [selectedContent, setSelectedContent] = useState<string>("");

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    vertical: false,

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

  const handleClick = (select: any) => {
    console.log(select);
    setSelectedWord(select.word);
    setSelectedImg(select.img);
    setSelectedContent(select.content);
  };

  return (
    <div className={styles["slide-wrap"]}>
      <div className={styles["slide-wrap__label"]}>{label}</div>
      <div className={styles["slide-wrap__slide"]}>
        {data?.map((value, key) => (
          <>
            <Slider {...settings}>
              <div className={styles["slide-wrap__detail"]}>
                <div
                  className={styles["slide-wrap__detail__word"]}
                  onClick={(e) => {
                    setOpenModal(true);
                    handleClick(value);
                  }}
                >
                  {value.word}
                </div>
              </div>
            </Slider>
            {openModal ? (
              <DetailModal
                open={true}
                clickModal={clickModal}
                word={selectedWord}
                img={selectedImg}
                contents={selectedContent}
              />
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
}

export default IncorrectNoteBox;
