import { FuelType, Other as Slice } from '../store/slices/Other';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../store/Store';
import React from 'react';
import StackData from '../data/stacks.json';

import './Other.css';

export function Other() {
  const other = useSelector((state: StoreState) => state.other);
  const dispatch = useDispatch();
  return (
    <div className='Other'>
      <h2>Other</h2>
      <label htmlFor='dual'>Use Dual-Headed</label>
      <input id='dual' type='checkbox' checked={other.dual} onChange={() => dispatch(Slice.actions.toggleDual())} />
      <label htmlFor='filler'>Filler</label>
      <select
        id='filler'
        value={other.filler}
        onChange={(e) => dispatch(Slice.actions.setFiller(e.target.value as keyof typeof StackData | '--'))}
      >
        <option>--</option>
        {Object.keys(StackData).map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <label htmlFor='fuel'>Fuel</label>
      <select
        id='fuel'
        value={other.fuel}
        onChange={(e) => dispatch(Slice.actions.setFuel(e.target.value as FuelType | '--'))}
      >
        <option>--</option>
        {Object.entries(FuelType).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
