const InitialState = {
  score: 0,
  categoryId: -1,
  targetSignWord: {
    data: "ㅂ",
    id: 5,
  },
  stageState: -1,
  stageLevel: 1,
  isEnd: false,
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
        stageLevel: state.stageLevel + 1,
      };

    case "UPDATE_TARGET_ANSWER":
      return {
        ...state,
        targetSignWord: {
          id: action.data.id,
          data: action.data.data,
        },
      };

    case "SET_INITIAL_STATE":
      return InitialState;

    case "UPDATE_STAGE_STATE":
      return {
        ...state,
        stageState: (state.stageState + 1) % 3,
      };

    case "TIME_OUT":
      return {
        ...state,
        isEnd: true,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        categoryId: action.id,
      };

    default:
      return state;
  }
};
