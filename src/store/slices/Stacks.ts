import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StackData from '../../data/stacks.json';

interface SetValuePayload {
  name: keyof typeof StackData;
  value: number;
}

type StacksState = {
  [P in keyof typeof StackData]: number;
};

export const Stacks = createSlice({
  name: 'Stacks',
  initialState: Object.fromEntries(Object.keys(StackData).map((stack) => [stack, 0])) as StacksState,
  reducers: {
    setValue(state, { payload: { name, value } }: PayloadAction<SetValuePayload>) {
      state[name] = value;
    },
  },
});
