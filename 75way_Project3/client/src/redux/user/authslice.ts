import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    accesstoken: string;
    }
    const initialState: UserState = {
      accesstoken: "",
    };
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ accesstoken: string }>
    ) => {
      state.accesstoken = action.payload.accesstoken;
        window.localStorage.setItem("authtoken", action.payload.accesstoken);
    },
  RemoveToken: (state)=>{
    state.accesstoken = "";
    window.localStorage.removeItem("authtoken");
  }
  },
});

export const { setToken, RemoveToken } = authSlice.actions;

export default authSlice.reducer;
