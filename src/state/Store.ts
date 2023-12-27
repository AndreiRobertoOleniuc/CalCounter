import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./foodSlice";
import appStateSlice from "./appStateSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    appState: appStateSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
