import React, { useState } from "react";
import styles from "./DetailModal.module.scss";

interface DetailProps {
  open: boolean;
  clickModal: (open: boolean) => void;
  word?: string;
  img?: string;
  contents?: string;
}

// 오답노트 상세내용(모달)
function DetailModal({ open, clickModal, word, img, contents }: DetailProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  // 모달 상태 변경
  const openModalHandler = () => {
    setIsOpen(!isOpen);
    clickModal(!isOpen);
  };

  // 오답 노트 삭제
  const onRemove = () => {
    if (window.confirm("오답노트를 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
    }
  };

  return (
    <>
      {isOpen ? (
        <div className={styles["modal-backdrop"]} onClick={openModalHandler}>
          <div
            className={styles["modal-backdrop__modal-view"]}
            onClick={(e: any) => {
              e.stopPropagation(); // 이벤트 버블링 막는 메소드
            }}
          >
            <div
              className={styles["modal-backdrop__modal-view__exitbtn"]}
              onClick={openModalHandler}
            >
              <img src="images/closebtn.svg" alt="closeBtn" />
            </div>
            <div className={styles["modal-backdrop__modal-view__word"]}>
              {word}
            </div>

            <div className={styles["modal-backdrop__modal-view__bottom"]}>
              <img
                src={img}
                className={styles["modal-backdrop__modal-view__bottom__image"]}
                alt="수어 이미지"
              />

              <div
                className={
                  styles["modal-backdrop__modal-view__bottom__contents"]
                }
              >
                {contents}
              </div>
            </div>
            <div
              className={styles["modal-backdrop__modal-view__delete"]}
              onClick={onRemove}
            >
              <p>오답노트 삭제</p>
              <img src="images/delete.svg" alt="휴지통" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DetailModal;
