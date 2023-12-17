//This should be a redux slice, which is displaying the state of the applicaiton, in either UTILS, HOME or Login
// Path: src/state/appStateSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentState: "HOME" as "HOME" | "UTILS" | "LOGIN",
  utilsPage: "Search" as "Search" | "Scanner" | "Details",
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    setUtilsPage: (state, action) => {
      state.utilsPage = action.payload;
    },
  },
});

export const { setCurrentState, setUtilsPage } = appStateSlice.actions;

export default appStateSlice.reducer;
