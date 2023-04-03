const TestInitialState = {
  nickname: "",
};

export const TestReducer = (state = TestInitialState, action: any) => {
  switch (action.type) {
    case "SET_NICKNAME":
      return {
        ...state,
        nickname: action.payload,
      };
    default:
      return state;
  }
};
