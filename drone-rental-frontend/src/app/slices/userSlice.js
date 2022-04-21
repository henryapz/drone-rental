/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: undefined,
  openLoginModal: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      const { payload } = action;
      state.userData = payload;
    },
    logoutUser() {
      return initialState;
    },
    updateUserInfo(state, action) {
      const { payload } = action;
      const { token } = state.userData;
      state.userData = { token, ...payload };
    },
    openLogInModal(state, action) {
      state.openLoginModal = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { loginUser, logoutUser, updateUserInfo, openLogInModal } = actions;

export default reducer;
