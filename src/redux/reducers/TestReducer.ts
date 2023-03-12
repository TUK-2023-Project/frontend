const TestInitialState = {
  score: 0,
};

export const TestReducer = (state = TestInitialState, action: any) => {
  switch (action.type) {
    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + 1,
      };

    case "RESET_SCORE":
      return TestInitialState;

    default:
      return state;
  }
};
