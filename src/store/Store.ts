import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import pako from 'pako';
import { Fluids } from './slices/Fluids';
import { Stacks } from './slices/Stacks';
import { Other } from './slices/Other';

const reducer = combineReducers({
  fluids: Fluids.reducer,
  stacks: Stacks.reducer,
  other: Other.reducer,
});

// null is a valid thing to deserialize to, so it needs to be undefined explicitly
const loadState = () => {
  const hash = window.location.hash.trim().slice(1);
  try {
    const serializedState =
      hash !== '' ? pako.inflate(atob(hash), { to: 'string' }) : localStorage.getItem('state') || '';
    if (serializedState === '') {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: StoreState) => {
  try {
    const serializedState = JSON.stringify(state);
    window.location.hash = btoa(pako.deflate(serializedState, { to: 'string' }));
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type StoreState = ReturnType<typeof store.getState>;
