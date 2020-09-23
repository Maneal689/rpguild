import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  uid?: string;
  waitingData: boolean;
  [key: string]: any;
}

const initialState: User = { waitingData: true };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: function (state: User, action: PayloadAction<User>) {
      state = { ...action.payload };
      state.waitingData = false;
      return state;
    },
    logout: () => ({ waitingData: false }),
  },
});

/**
 * Thunks BEGIN
 */
const thunks = {};

const mutations = Object.assign({}, thunks, userSlice.actions);

export const { setUser, logout } = mutations;

export default userSlice.reducer;
