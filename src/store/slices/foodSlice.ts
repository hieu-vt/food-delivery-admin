import { FoodRequest, createFood } from '@app/api/food.api';
import { FoodModel } from '@app/domain/FoodModal';
import { persistUser } from '@app/services/localStorage.service';
import { PrepareAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface FoodState {
  foods: Array<FoodModel> | null;
}

const initialState: FoodState = {
  foods: null,
};

export const doCreateFood = createAsyncThunk('food/doCreateFood', async (foodPayload: FoodRequest, { dispatch }) => {
  return createFood(foodPayload).then(({ data }) => {
    return data;
  });
});

export const setFoods = createAction<PrepareAction<Array<FoodModel>>>('user/setFoods', (newUser) => {
  persistUser(newUser);

  return {
    payload: newUser,
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
