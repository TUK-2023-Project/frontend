import React, { useEffect, useState } from "react";
import styles from "./DetailModal.module.scss";
import { deleteIncorrectData } from "api/incorrectNote";

interface DetailProps {
  open: boolean;
  closeAction: () => void;
  signId: number;
  word?: string;
  video?: string;
  contents?: string;
}

// 오답노트 상세내용(모달)
function DetailModal({
  open,
  closeAction,
  signId,
  word,
  video,
  contents,
}: DetailProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  // 모달 상태 변경
  const openModalHandler = () => {
    closeAction();
  };

  const { deleteIncorrectList, isSuccess, isError } = deleteIncorrectData();

  // 오답 노트 삭제
  const onRemove = () => {
    if (window.confirm("오답노트를 삭제하시겠습니까?")) {
      deleteIncorrectList(signId);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      alert("삭제되었습니다.");
      closeAction();
    } else if (isError) {
      alert("삭제를 실패하였습니다.");
      closeAction();
    }
  }, [isSuccess, isError]);
  console.log(video);

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
              <video
                muted
                autoPlay
                loop
                className={styles["modal-backdrop__modal-view__bottom__image"]}
              >
                {video !== undefined && video !== null && (
                  <source
                    // src={video}
                    src={`${video}`}
                    type="video/mp4"
                  />
                )}
              </video>

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
