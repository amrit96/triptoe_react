import { createSlice } from '@reduxjs/toolkit';
import COLORS from '../constants/colors';

const initialState = {
  mode: 'light', 
  colors: {...COLORS.light, ...COLORS.common},
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newMode;
      const themeColors = newMode === 'light' ? COLORS.light : COLORS.dark;
      state.colors = { ...themeColors, ...COLORS.common };
    },
    setTheme: (state, action) => {
      state.mode = action.payload.mode;
      state.colors = action.payload.colors;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
