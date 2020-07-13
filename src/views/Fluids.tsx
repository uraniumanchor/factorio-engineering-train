import { Fluids as Slice } from '../store/slices/Fluids';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../store/Store';
import React from 'react';

export function Fluids() {
  const fluids = useSelector((state: StoreState) => state.fluids);
  const dispatch = useDispatch();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px', gridAutoRows: 20 }}>
      <h2 style={{ gridColumn: 'span 2', gridRow: 'span 3' }}>Fluids</h2>
      {Object.entries(fluids).map(([k, v]) => (
        <React.Fragment key={k}>
          <label htmlFor={k}>{k}</label>
          <input id={k} type='checkbox' checked={v} onChange={() => dispatch(Slice.actions.toggle(k))} />
        </React.Fragment>
      ))}
    </div>
  );
}
