import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getDoctorsData = createAsyncThunk('doctors/getDoctorsData', async () => {
  const resp = await fetch('https://autumn-wood-4029.fly.dev/api/v1/doctors')
    .then((resp) => resp.json())
    .then((result) => result);
  return resp;
});

const addDoctor = createAsyncThunk('doctors/addDoctor', async (obj) => {
  const response = await fetch('https://autumn-wood-4029.fly.dev/api/v1/doctors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return response.json();
});

const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (id) => {
  const resp = await fetch(`https://autumn-wood-4029.fly.dev/api/v1/doctors/${id}`, {
    method: 'Delete',
  })
    .then((resp) => resp.json())
    .then((result) => result);
  return resp;
});

const doctorsSlice = createSlice({
  name: 'greeting',
  initialState: {
    loading: false,
    doctors: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getDoctorsData.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getDoctorsData.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      doctors: action.payload,
    }));
    builder.addCase(getDoctorsData.rejected, (state, action) => ({
      ...state,
      loading: false,
      doctors: [],
      error: action.error.message,
    }));
    builder.addCase(deleteDoctor.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(deleteDoctor.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      doctors: [
        ...state.doctors.filter((doctor) => doctor.id !== action.payload.id),
      ],
    }));
    builder.addCase(deleteDoctor.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message,
    }));
    builder.addCase(addDoctor.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(addDoctor.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(addDoctor.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message,
    }));
  },
});

export default doctorsSlice;
export { getDoctorsData, deleteDoctor, addDoctor };
