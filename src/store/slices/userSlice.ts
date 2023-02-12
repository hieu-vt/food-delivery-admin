import { createAction, createSlice, PrepareAction } from '@reduxjs/toolkit';
import { persistUser, readUser } from '@app/services/localStorage.service';
import { DataUserModal } from '@app/domain/UserModel';

export interface UserState {
  user: DataUserModal | null;
}

const initialState: UserState = {
  user: readUser(),
};

export const setUser = createAction<PrepareAction<DataUserModal>>('user/setUser', (newUser) => {
  persistUser({
    ...newUser,
    avatar: {
      url: 'https://gamek.mediacdn.vn/133514250583805952/2022/12/15/p0dnxrcv-16710704848821827978943-1671090117596-1671090117711578053756.jpg',
    },
  });

  return {
    payload: newUser,
  };
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
