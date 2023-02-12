import { FoodRequest, GetFoodRequest, createFood, getFoods } from '@app/api/food.api';
import { FoodResponse } from '@app/domain/FoodModal';
import { PrepareAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface FoodState {
  foods: Array<FoodResponse> | null;
}

const initialState: FoodState = {
  foods: null,
};

export const doCreateFood = createAsyncThunk('food/doCreateFood', async (foodPayload: FoodRequest, { dispatch }) => {
  return createFood(foodPayload).then(({ data }) => {
    return data;
  });
});

export const doGetFood = createAsyncThunk('food/doGetFood', async (foodParams: GetFoodRequest | null, { dispatch }) => {
  return getFoods(foodParams).then((data) => data);
});

export const setFoods = createAction<PrepareAction<Array<FoodResponse>>>('user/setFoods', (foods) => {
  return {
    payload: foods,
  };
});

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setFoods, (state, action) => {
      state.foods = action.payload;
    });
  },
});

export default foodSlice.reducer;
