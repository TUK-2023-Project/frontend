import { configureStore } from "@reduxjs/toolkit";
import { TaskReducer } from "./reducers/TaskReducer";
import { TestReducer } from "./reducers/TestReducer";

const store = configureStore({
  reducer: {
    Task: TaskReducer,
    Test: TestReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
