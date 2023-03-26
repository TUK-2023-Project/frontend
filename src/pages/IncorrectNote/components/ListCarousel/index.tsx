import React, { useState, useEffect } from "react";
import styles from "./IncorrectNoteBox.module.scss";
import Slider from "react-slick";
import DetailModal from "../DetailModal";
import styled from "styled-components";

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
    dots: false, // 슬라이드 밑에 점 여부
    infinite: false, // 무한 반복 여부
    speed: 500, // 속도
    slidesToShow: 4, // 4장씩 보이도록
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    initialSlide: 0,
    arrows: true,
    vertical: false,
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
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
        <StyledSlide {...settings}>
          {data?.map((value, key) => (
            <div
              className={styles["slide-wrap__slide__word"]}
              onClick={() => {
                setOpenModal(true);
                handleClick(value);
              }}
            >
              {value.word}
            </div>
          ))}
        </StyledSlide>
      </div>
      {openModal ? (
        <DetailModal
          open={true}
          clickModal={clickModal}
          word={selectedWord}
          img={selectedImg}
          contents={selectedContent}
        />
      ) : null}
    </div>
  );
}

export default IncorrectNoteBox;

export const StyledSlide = styled(Slider)`
  /* Slider */
  .slick-slide {
    div {
      cursor: pointer;
      margin: 0.5rem;
    }
    height: 100%;
    min-height: 1px;
  }

  /* Arrows */
  .slick-prev,
  .slick-next {
    &:before {
      color: black;
    }
  }
`;
