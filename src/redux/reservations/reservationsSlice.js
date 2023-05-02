import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getReservations = createAsyncThunk('reservations/getReservations', async (id) => {
  const resp = await fetch(`https://autumn-wood-4029.fly.dev/api/v1/users/${id}/reservations`)
    .then((resp) => resp.json())
    .then((result) => result);
  return resp;
});

const addReservation = createAsyncThunk('reservations/addReservation', async (obj, id) => {
  const response = await fetch(`https://autumn-wood-4029.fly.dev/api/v1/users/${id}/reservations`, {
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
    reservations: [],
  },
  reducers: {
    deleteReservations(state, action) {
      const newState = state.reservations.filter((reservation) => (
        reservation.doctor_id !== action.payload
      ));
      return {
        ...state,
        reservations: newState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReservations.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getReservations.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      reservations: action.payload,
    }));
    builder.addCase(getReservations.rejected, (state, action) => ({
      ...state,
      loading: false,
      reservations: [],
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
export const { deleteReservations } = reservationsSlice.actions;
