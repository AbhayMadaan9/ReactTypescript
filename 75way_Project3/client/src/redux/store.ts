import { configureStore} from '@reduxjs/toolkit';
// import { authApi } from '../services/authApi';
import authslice from './user/authslice'
import {userApi} from '../services/userapi'
// import authReducer from '../features/authSlice'
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authslice,
    [userApi.reducerPath] : userApi.reducer,
  },
  middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware().concat(userApi.middleware),
  
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch)