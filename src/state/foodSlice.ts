import { createSlice } from "@reduxjs/toolkit";

interface Food {
  name: string;
  calories: number;
}

const initialState = {
  food: [] as Food[],
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addFood: (state, action) => {
      state.food.push(action.payload);
    },
  },
});

export const { addFood } = foodSlice.actions;

export default foodSlice.reducer;
