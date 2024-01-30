import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearCookies, getaccesstoken, getrefreshtoken } from "../services/getcookie";

export interface UserState {
    accesstoken: string | null;
    refreshtoken: string | null;
    }
    const initialState: UserState = {
      accesstoken: null,
      refreshtoken: null
    };
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state
    ) => {
      state.accesstoken = getaccesstoken();
      state.refreshtoken = getrefreshtoken();
        // window.localStorage.setItem("authtoken", action.payload.accesstoken);
    },
    setAuthToken: (
      state
    ) => {
      state.accesstoken = getaccesstoken();
        // window.localStorage.setItem("authtoken", action.payload.accesstoken);
    },
  RemoveToken: (state)=>{
    state.accesstoken = null;
    state.refreshtoken = null;
    // window.localStorage.removeItem("authtoken");
    clearCookies()
  }
  },
});

export const { setToken, RemoveToken } = authSlice.actions;

export default authSlice.reducer;
function clearCookie(arg0: string) {
  throw new Error("Function not implemented.");
}

