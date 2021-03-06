import { Stacks as Slice } from '../store/slices/Stacks';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../store/Store';
import React from 'react';
import StackData from '../data/stacks.json';

import './Stacks.css';

function bykey([ka, _a]: [string, number], [kb, _b]: [string, number]) {
  return ka.localeCompare(kb);
}

export function Stacks() {
  const stacks = useSelector((state: StoreState) => state.stacks);
  const dispatch = useDispatch();
  return (
    <div className='Stacks'>
      <h2 style={{ gridColumn: 'span 3', gridRow: 'span 3' }}>Item Stacks</h2>
      {Object.entries(stacks)
        .sort(bykey)
        .map(([k, v]) => (
          <React.Fragment key={k}>
            <label htmlFor={k}>{k}</label>

            <input
              id={k}
              type='number'
              value={v}
              min={0}
              onChange={(e) =>
                dispatch(Slice.actions.setValue({ name: k as keyof typeof stacks, value: +e.target.value }))
              }
            />
            <div>({(v * StackData[k as keyof typeof stacks]) as number})</div>
          </React.Fragment>
        ))}
    </div>
  );
}
