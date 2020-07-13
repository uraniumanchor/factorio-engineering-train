import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StackData from '../../data/stacks.json';

interface OtherState {
  dual: boolean;
  filler: keyof typeof StackData | '--';
}

export const Other = createSlice({
  name: 'Other',
  initialState: {
    dual: true,
    filler: 'artillery-shell',
  } as OtherState,
  reducers: {
    toggleDual(state) {
      state.dual = !state.dual;
    },
    setFiller(state, { payload }: PayloadAction<keyof typeof StackData | '--'>) {
      state.filler = payload;
    },
  },
});
