import { configureStore } from "@reduxjs/toolkit";
import { TaskReducer } from "./reducers/TaskReducer";

const store = configureStore({
  reducer: {
    Task: TaskReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
