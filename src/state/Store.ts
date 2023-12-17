import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./foodSlice";
import appStateSlice from "./appStateSlice";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    appState: appStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
