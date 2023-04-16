import React, { useState } from "react";
import styles from "./AboutModal.module.scss";

interface AboutModalProps {
  open: boolean;
  clickModal: (open: boolean) => void;
}

function AboutModal({ open, clickModal }: AboutModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  // 모달 상태 변경
  const openModalHandler = () => {
    setIsOpen(!isOpen);
    clickModal(!isOpen);
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
            <div className={styles["modal-backdrop__modal-view__title"]}>
              게임 방법
            </div>

            <div className={styles["modal-backdrop__modal-view__bottom"]}>
              <div
                className={
                  styles["modal-backdrop__modal-view__bottom__introduce"]
                }
              >
                <p>1. 카테고리 선택 후, 카메라 테스트를 진행합니다.</p>
                <p>2. 랜덤으로 제시된 세 가지 수어동작을 학습합니다. </p>
                <p>
                  3. '문제 풀기' 버튼을 눌러 제한시간동안 학습한 세 가지 동작 중
                  제시된 수어 문제를 풀이합니다.
                </p>
                <p>
                  4. 틀린 수어 정보는 오답노트에 저장되어 다시 학습 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AboutModal;
