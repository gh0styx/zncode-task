import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SessionState = {
  activeSessions: number;
  token: string | null;
};

const initialState: SessionState = {
  activeSessions: 1,
  token: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setActiveSessions(state, action: PayloadAction<number>) {
      state.activeSessions = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    }
  }
});

export const { setActiveSessions, setToken } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
