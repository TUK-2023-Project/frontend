import { configureStore } from "@reduxjs/toolkit";
import { SignQuizReducer } from "./reducers/SignQuizReducer";

const store = configureStore({
  reducer: {
    SignQuiz: SignQuizReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
