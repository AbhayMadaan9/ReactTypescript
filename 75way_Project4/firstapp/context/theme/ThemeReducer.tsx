// ThemeReducer.ts
export interface Theme {
  color: string;
  backgroundColor: string;
}

export interface Themeobj {
  theme: Theme;
}

export const initialState: Themeobj = {
  theme: {
    color: "#fff",
    backgroundColor: "#000"
  }
}

export const ThemeReducer = (state: Themeobj, action: { type: string }): Themeobj => {
  switch (action.type) {
    case 'LIGHT':
      return {
        ...state,
        theme: {
          ...state.theme,
          color: '#000',
          backgroundColor: '#fff'
        }
      };
    case 'DARK':
      return {
        ...state,
        theme: {
          ...state.theme,
          color: '#fff',
          backgroundColor: '#000'
        }
      };
    default:
      throw new Error(`${action.type} case not defined`);
  }
};
