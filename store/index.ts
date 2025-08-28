// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import trainingReducer from "./trainingSlice";

export const store = configureStore({
  reducer: {
    training: trainingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
