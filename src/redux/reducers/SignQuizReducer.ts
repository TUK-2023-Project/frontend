const InitialState = {
  score: 0,
  targetSignWord: null,
};

/**
 * 작성자 : 정태원
 * 날짜 : 3/11
 * 내용 :  CORRECT_ANSWER 함수에 대해 추후 난이도나 시간에 따라 점수를 추가하거나 랜덤성을 부여하는 것도 고려하면 좋을 것 같습니다.
 */

export const SignQuizReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case "CORRECT_ANSWER":
      return {
        ...state,
        score: state.score + 500,
      };

    case "SET_TARGET_ANSWER":
      return {
        ...state,
        targetSignWord: action.data.targetWord,
      };

    case "RESET_GAME":
      return InitialState;

    default:
      return state;
  }
};
