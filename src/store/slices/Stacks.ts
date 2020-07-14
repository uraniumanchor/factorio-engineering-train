import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StackData from '../../data/stacks.json';
import { init } from '../Init';

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
  extraReducers: (builder) =>
    builder.addCase(init, (state) => {
      Object.keys(StackData).forEach(
        (stack) => (state[stack as keyof typeof StackData] = state[stack as keyof typeof StackData] || 0)
      );
      Object.keys(state).forEach((stack) => {
        if (!StackData[stack as keyof typeof StackData]) {
          delete state[stack as keyof typeof StackData];
        }
      });
    }),
});
