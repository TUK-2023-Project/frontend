import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { gameOver } from "redux/actions/SignQuizActions";
import styles from "./Ranking.module.scss";
import CommonButton from "components/CommonButton";
import { useNavigate } from "react-router-dom";
import FlowerEfftect from "../Game/components/FlowerEffect";
import { loadRankList, loadSelfRank } from "api/rank";
import LoadingSpinner from "components/LoadingSpinner";
import { getLottieOptions } from "utils/lottie";
import handLottie from "lotties/rank.json";
import { shareKakao } from "../../utils/shareKakaoLink";
import { playAudio } from "utils/audioPlayer";
import { usePreventGoBackEffect } from "hooks/usePreventGoBackEffect";

interface Rank {
  rank: number;
  user_name: string;
  score: number;
}

const Ranking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector(
    (state: { SignQuiz: { score: number } }) => state.SignQuiz.score
  );
  const isEnd = useSelector(
    (state: { SignQuiz: { isEnd: boolean } }) => state.SignQuiz.isEnd
  );

  const redirectToOtherPage = (page: string) => {
    navigate(`/${page}`);
  };

  const handleMove = (page: string) => {
    dispatch(gameOver());
    redirectToOtherPage(page);
  };

  const handleShare = () => {
    shareKakao(selfRank.rank, score);
  };

  if (isEnd) {
    usePreventGoBackEffect();
  }

  // 카카오톡 공유하기 sdk 추가
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { isLoading, error, data } = loadRankList();
  const { isLoading: selfRankLoading, data: selfRank } = loadSelfRank();

  useEffect(() => {
    if (isEnd) {
      void (async () => {
        const sound = "/sounds/end.mp3";
        const { pause } = await playAudio(sound);

        return () => {
          pause();
        };
      })();
    }
  }, []);

  if (isLoading || selfRankLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      {isEnd && <FlowerEfftect />}

      <div className={styles.content}>
        <div className={styles.content__title}>
          <h1 className={styles.content__title__text}>랭킹</h1>
          <div className={styles.content__title__image}>
            <Lottie
              options={getLottieOptions(handLottie)}
              height={100}
              width={100}
            />
          </div>
        </div>
        {isEnd && (
          <>
            <h1 className={styles["content__sub-title"]}>
              이번 게임의 점수 : {score}
            </h1>
            <h1 className={styles.content__title}>
              당신의 최고 순위 : {selfRank.rank} 등
            </h1>
          </>
        )}
        <div>
          <table className={styles.content__table}>
            <thead className={styles.content__table__title}>
              <tr>
                <th>랭킹</th>
                <th>이름</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: Rank) => (
                <tr key={item.user_name}>
                  <td>{item.rank}</td>
                  <td>{item.user_name}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEnd ? (
        <div className={styles.footer}>
          <CommonButton
            handleClick={() => {
              handleMove("incorrectnote");
            }}
            buttonName={"오답노트 확인"}
          />
          <CommonButton handleClick={handleShare} buttonName={"공유하기"} />
          <CommonButton
            handleClick={() => {
              handleMove("main");
            }}
            buttonName={"메인으로"}
          />
        </div>
      ) : (
        <div className={styles["footer-no"]}>
          <CommonButton
            handleClick={() => {
              handleMove("main");
            }}
            buttonName={"메인으로"}
          />
        </div>
      )}
    </div>
  );
};

export default Ranking;
