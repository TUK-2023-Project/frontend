declare global {
  interface Window {
    Kakao: any;
  }
}
export const shareKakao = (rank: number, score: number) => {
  const route = process.env.REACT_APP_SHARE_URL;
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (window.Kakao) {
    const kakao = window.Kakao;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_SHARE_KAKAO_KEY);
    }
    kakao.Link.sendScrap({
      requestUrl: route,
      templateId: 93368,
      templateArgs: {
        TITLE: "수어 학습 퀴즈(수퀴즈)",
        DESC: `해당 라운드에서의 점수는 ${score}이고, 최고 등수는 ${rank}등을 기록하였습니다. 수어를 배우며 순위를 기록해보시겠습니까?`,
      },
    });
    // kakao.Link.sendDefault({
    //   objectType: "feed",
    //   content: {
    //     title: "수어 학습 퀴즈(수퀴즈)",
    //     description: `해당 라운드에서의 점수는 ${score}이고, 최고 등수는 ${rank}등을 기록하였습니다. 수어를 배우며 순위를 기록해보시겠습니까?`,
    //     imageUrl: ,
    //     link: {
    //       mobileWebUrl: route,
    //       webUrl: route,
    //     },
    //   },
    //   buttons: [
    //     {
    //       title: "수퀴즈",
    //       link: {
    //         mobileWebUrl: route,
    //         webUrl: route,
    //       },
    //     },
    //   ],
    // });
  }
};
