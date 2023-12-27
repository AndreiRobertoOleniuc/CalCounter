import { createSlice } from "@reduxjs/toolkit";
import { User } from "../shared/models/User";

const initialState = {
  user: {
    id: 0,
    username: "andreioleniuc",
    password: "123456",
    firstName: "Andrei",
    lastName: "Oleniuc",
    email: "andreioleniucroberto@gmail.com",
    img: "https://lh3.googleusercontent.com/ogw/ANLem4aChQv9HbqfeC8_-HN4QuPGiId0240dFR-ohj3K4A=s64-c-mo",
    weight: 73.4,
    height: 172,
    age: 21,
  } as User | null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;
