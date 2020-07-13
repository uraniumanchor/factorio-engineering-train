import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FluidData from '../../data/fluid.json';

export const Fluids = createSlice({
  name: 'Fluids',
  initialState: Object.fromEntries(FluidData.map((fluid) => [fluid, false])),
  reducers: {
    toggle(state, { payload }: PayloadAction<string>) {
      state[payload] = !state[payload];
    },
  },
});
