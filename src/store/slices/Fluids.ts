import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FluidData from '../../data/fluid.json';
import { init } from '../Init';

export const Fluids = createSlice({
  name: 'Fluids',
  initialState: Object.fromEntries(FluidData.map((fluid) => [fluid, false])),
  reducers: {
    toggle(state, { payload }: PayloadAction<string>) {
      state[payload] = !state[payload];
    },
  },
  extraReducers: (builder) =>
    builder.addCase(init, (state) => {
      FluidData.forEach((fluid) => (state[fluid] = state[fluid] || false));
      Object.keys(state).forEach((fluid) => {
        if (!FluidData.includes(fluid)) {
          delete state[fluid];
        }
      });
    }),
});
