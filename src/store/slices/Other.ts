import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StackData from '../../data/stacks.json';
import { init } from '../Init';

export enum FuelType {
  wood = 'wood',
  coal = 'coal',
  solidFuel = 'solid-fuel',
  rocketFuel = 'rocket-fuel',
  nuclearFuel = 'nuclear-fuel',
}

interface OtherState {
  dual: boolean;
  filler: keyof typeof StackData | '--';
  fuel: FuelType | '--';
}

export const Other = createSlice({
  name: 'Other',
  initialState: {
    dual: true,
    filler: 'artillery-shell',
    fuel: '--',
  } as OtherState,
  reducers: {
    toggleDual(state) {
      state.dual = !state.dual;
    },
    setFiller(state, { payload }: PayloadAction<keyof typeof StackData | '--'>) {
      state.filler = payload;
    },
    setFuel(state, { payload }: PayloadAction<FuelType | '--'>) {
      state.fuel = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(init, (state) => {
      state.dual = state.dual == null ? true : state.dual;
      state.filler = state.filler || 'artillery-shell';
      state.fuel = state.fuel || '--';
    }),
});
