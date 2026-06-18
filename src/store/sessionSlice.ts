import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SessionState = {
  activeSessions: number;
};

const initialState: SessionState = {
  activeSessions: 1
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setActiveSessions(state, action: PayloadAction<number>) {
      state.activeSessions = action.payload;
    }
  }
});

export const { setActiveSessions } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
