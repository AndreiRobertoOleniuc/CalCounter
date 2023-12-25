import { createSlice } from "@reduxjs/toolkit";
import { Food } from "../shared/models/Food";
import { RootState } from "./Store";

const initialState = {
  food: [] as Food[],
  scannedOrSearchedFood: null as Food | null,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addFood: (state, action) => {
      state.food.push(action.payload);
    },
    deleteFood: (state, action) => {
      state.food = state.food.filter((food) => food.name !== action.payload);
    },
    setScannedOrSearchedFood: (state, action) => {
      state.scannedOrSearchedFood = action.payload;
    },
  },
});

export const { addFood, deleteFood, setScannedOrSearchedFood } =
  foodSlice.actions;

export const selectFoods = (state: RootState) => state.food.food;
export const selectScannedOrSearchedFood = (state: RootState) =>
  state.food.scannedOrSearchedFood;

export default foodSlice.reducer;
