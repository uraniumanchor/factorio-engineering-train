import { Other as Slice } from '../store/slices/Other';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../store/Store';
import React from 'react';
import StackData from '../data/stacks.json';

export function Other() {
  const other = useSelector((state: StoreState) => state.other);
  const dispatch = useDispatch();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: 20 }}>
      <h2 style={{ gridColumn: 'span 2', gridRow: 'span 3' }}>Other</h2>
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
    </div>
  );
}
