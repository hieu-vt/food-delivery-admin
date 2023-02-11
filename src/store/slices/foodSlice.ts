import { FoodModel } from '@app/domain/FoodModal';
import { persistUser } from '@app/services/localStorage.service';
import { PrepareAction, createAction, createSlice } from '@reduxjs/toolkit';

export interface FoodState {
  foods: Array<FoodModel> | null;
}

const initialState: FoodState = {
  foods: null,
};

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
