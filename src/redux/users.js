import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: null,
};

const URL = 'https://autumn-wood-4029.fly.dev/api/v1/users';

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (username) => {
    const resp = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_name: username }),
    })
      .then((resp) => resp.json())
      .then((result) => result);
    return resp;
  },
);

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.users = action.payload.id;
      sessionStorage.setItem('user', action.payload.id);
      sessionStorage.setItem('username', action.payload.user_name);
    },
    [fetchUser.rejected]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.users = null;
      sessionStorage.removeItem('user');
    },
  },
});

export default usersSlice.reducer;
