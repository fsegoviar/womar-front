import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { parseJwt } from '../utils';

type LoginState = {
  logged: boolean;
};

const isLogged = (): boolean => {
  const { IdUser } = parseJwt();

  if (IdUser) {
    return true;
  }

  return false;
};

const initialState: LoginState = {
  logged: isLogged()
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeStateLogin: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    }
  }
});

export const { changeStateLogin } = loginSlice.actions;

export default loginSlice.reducer;
