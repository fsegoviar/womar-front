import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
  rol: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  comuna: string;
  comunaId: number;
  email: string;
  fono: string;
  id: string;
  nombre: string;
  region: string;
  regionId: number;
  imgPerfil: string;
};

const initialState: UserState = {
  rol: '',
  apellidoMaterno: '',
  apellidoPaterno: '',
  comuna: '',
  comunaId: 0,
  email: '',
  fono: '',
  id: '',
  nombre: '',
  region: '',
  regionId: 0,
  imgPerfil: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateRolUser: (state, action: PayloadAction<string>) => {
      const result = { ...state, rol: action.payload };
      return result;
    },
    updateInfoUser: (state, action: PayloadAction<UserState>) => {
      return Object.assign({}, state, action.payload);
    },
    updateUserProfile: (state, action: PayloadAction<UserState>) => {
      state = Object.assign({}, state, action.payload);
      return Object.assign({}, state, action.payload);
    }
  }
});

export const { updateInfoUser, updateRolUser, updateUserProfile } =
  userSlice.actions;

export default userSlice.reducer;
