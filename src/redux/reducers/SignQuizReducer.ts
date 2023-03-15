const InitialState = {
  score: 0,
  targetSignWord: {
    id: 5,
    data: "o",
  },
  stageState: 0,
};

/**
 * 작성자 : 정태원
 * 날짜 : 3/11
 * 내용 :  CORRECT_ANSWER 함수에 대해 추후 난이도나 시간에 따라 점수를 추가하거나 랜덤성을 부여하는 것도 고려하면 좋을 것 같습니다.
 */

export const SignQuizReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case "INCREASE_SCORE":
      return {
        ...state,
        score: state.score + 500,
      };

    case "UPDATE_TARGET_ANSWER":
      return {
        ...state,
        targetSignWord: action.data.targetWord,
      };

    case "SET_INITIAL_STATE":
      return InitialState;

    case "UPDATE_STAGE_STATE":
      return {
        ...state,
        stageState: (state.stageState + 1) % 3,
      };

    default:
      return state;
  }
};
