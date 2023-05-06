import { categoryMultiplier } from "utils/constants";

const InitialState = {
  score: 0,
  categoryId: -1,
  targetSignWord: {
    data: "ㅊ",
    id: 9,
  },
  stageState: -1,
  stageLevel: 1,
  isEnd: false,
  solvedQuestion: [] as number[],
};

export const SignQuizReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case "INCREASE_SCORE":
      return {
        ...state,
        score:
          state.score +
          Math.floor(
            Math.floor(
              Math.random() * 201 + 300 * (1 + (0.5 * state.stageState) / 100)
            ) *
              (!Number.isNaN(state.categoryId) &&
              categoryMultiplier[state.categoryId] !== 0
                ? categoryMultiplier[state.categoryId]
                : 1)
          ),
        stageLevel: state.stageLevel + 1,
        solvedQuestion: [...state.solvedQuestion, state.targetSignWord.id],
      };
    case "UPDATE_TARGET_ANSWER":
      return {
        ...state,
        targetSignWord: {
          id: action.data.id,
          data: action.data.word,
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
