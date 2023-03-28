import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
  rol: string;
};

const initialState: UserState = {
  rol: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateInfoUser: (state, action: PayloadAction<string>) => {
      state.rol = action.payload;
    }
  }
});

export const { updateInfoUser } = userSlice.actions;

export default userSlice.reducer;
