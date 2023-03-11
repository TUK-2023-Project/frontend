import { configureStore } from "@reduxjs/toolkit";
import { SignQuizReducer } from "./reducers/SignQuizReducer";
import { TestReducer } from "./reducers/TestReducer";

const store = configureStore({
  reducer: {
    SignQuiz: SignQuizReducer,
    Test: TestReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
