import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserInfo {
  isSignedIn: boolean;
  uid: string | null;
  email: string | null;
  theme: "light" | "dark";
}

const initialState = {
  isSignedIn: false,
  uid: null,
  theme: "dark",
} as UserInfo;

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<UserInfo["theme"]>) {
      state.theme = action.payload;
    },
    signIn(state, action: PayloadAction<Pick<UserInfo, "uid" | "email">>) {
      state.isSignedIn = true;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.uid = null;
      state.email = null;
    },
  },
});
