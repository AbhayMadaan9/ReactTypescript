import React, { createContext, useReducer } from "react";
import { initialState, ThemeReducer, Themeobj } from './ThemeReducer';

const ThemeContext = createContext<Themeobj | undefined>(undefined);

type Props = {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const value = {
    theme: state.theme,
    setLightTheme: () => {
      dispatch({
        type: 'LIGHT'
      });
    },
    setDarkTheme: () => {
      dispatch({
        type: 'DARK'
      });
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}