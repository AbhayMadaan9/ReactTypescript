import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
    username: string;
    email: string;
}
export interface UserState {
    Users: User[];
    currentUser?: User | null;
    }
    const initialState: UserState = {
      Users: [],
      currentUser: null
    };
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (
      state,
      action: PayloadAction<{ users: User[]; }>
    ) => {
      state.Users = action.payload.users;
    },
  setUser: (state, action: PayloadAction<{ currentUser: User}>)=>{
    state.currentUser = action.payload.currentUser
    
  }
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
