import React, { useState } from "react";
import styles from "./IncorrectNoteBox.module.scss";
import Slider from "react-slick";
import DetailModal from "../DetailModal";
import styled from "styled-components";
import { getIncorrectItemData } from "api/incorrectNote";

interface incorrectData {
  sign_id: number;
  word: string;
  wordtype: string;
}

interface IncorrectNoteBoxProps {
  label: string;
  item?: incorrectData[];
}

// 오답노트 리스트
function IncorrectNoteBox({ label, item }: IncorrectNoteBoxProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [signId, setSignId] = useState<number>(-1);
  const [clickData, setClickData] = useState<number>(-1);

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

  const handleClick = (signId: number) => {
    setClickData(signId);
  };

  const { data } = getIncorrectItemData(clickData);

  return (
    <div className={styles["slide-wrap"]}>
      <div className={styles["slide-wrap__label"]}>{label}</div>
      <div className={styles["slide-wrap__slide"]}>
        <StyledSlide {...settings}>
          {item?.map((value: incorrectData, key: number) => (
            <div
              className={styles["slide-wrap__slide__word"]}
              key={key}
              onClick={() => {
                setOpenModal(true);
                handleClick(value.sign_id);
                setSignId(value.sign_id);
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
          signId={signId}
          word={data?.sign_language_info.word}
          img={data?.sign_language_info.photo_url}
          contents={data?.sign_language_info.context}
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
