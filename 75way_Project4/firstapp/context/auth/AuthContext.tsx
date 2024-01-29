import { createContext, useReducer } from "react";
import { initialState, AuthReducer } from './AuthReducer';

const AuthContext = createContext(initialState); // state is imported from authreducer

type Props = {
  children: React.ReactNode; // Corrected spelling here
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const value = {
    data: state.data,
    registeruser: (user: { username: string; email: string; password: string; }) => {
      dispatch({
        type: "REGISTER",
        payload: user
      });
    },
    loginuser: (user: { authtoken: string; }) => {
      dispatch({
        type: "LOGIN",
        payload: user.authtoken
      });
    },
    logoutuser: () => {
      dispatch({
        type: "LOGOUT",
        payload: null
      });
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
