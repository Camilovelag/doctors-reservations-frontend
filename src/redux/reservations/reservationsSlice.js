import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getReservations = createAsyncThunk('reservations/getReservations', async (id) => {
  const resp = await fetch(`http://localhost:3000/api/v1/users/${id}/reservations`)
    .then((resp) => resp.json())
    .then((result) => result);
  return resp;
});

const addReservation = createAsyncThunk('reservations/addReservation', async (obj, id) => {
  const response = await fetch(`http://localhost:3000/api/v1/users/${id}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return response.json();
});

const reservationsSlice = createSlice({
  name: 'greeting',
  initialState: {
    loading: false,
    Reservations: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getReservations.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getReservations.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      Reservations: action.payload,
    }));
    builder.addCase(getReservations.rejected, (state, action) => ({
      ...state,
      loading: false,
      Reservations: [],
      error: action.error.message,
    }));
    builder.addCase(addReservation.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(addReservation.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(addReservation.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message,
    }));
  },
});

export default reservationsSlice;
export { getReservations, addReservation };
