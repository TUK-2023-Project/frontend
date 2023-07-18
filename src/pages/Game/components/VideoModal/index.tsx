import React from "react";
import styles from "./VideoModal.module.scss";

interface VideoModalProps {
  open: boolean;
  closeAction: () => void;
  videoUrl: string;
}

const VideoModal = ({ open, closeAction, videoUrl }: VideoModalProps) => {
  // 모달 상태 변경
  const closeModalHandler = () => {
    closeAction();
  };

  return (
    <>
      {open ? (
        <div className={styles["modal-backdrop"]} onClick={closeModalHandler}>
          <div
            className={styles["modal-backdrop__modal-view"]}
            onClick={(e: any) => {
              e.stopPropagation();
            }}
          >
            <div
              className={styles["modal-backdrop__modal-view__exitbtn"]}
              onClick={closeModalHandler}
            >
              <img src="images/closebtn.svg" alt="closeBtn" />
            </div>
            <div className={styles["modal-backdrop__modal-view__content"]}>
              <video width="640" height="480" controls>
                <source src={videoUrl} type="video/mp4" />
                비디오를 지원하지 않는 브라우저입니다
              </video>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default VideoModal;
