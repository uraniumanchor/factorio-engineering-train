import React from 'react';
import './App.css';
import { Fluids } from './views/Fluids';
import { Stacks } from './views/Stacks';
import { Other } from './views/Other';
import { BlueprintString } from './views/BlueprintString';

function App() {
  return (
    <div className='App'>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Stacks />
        <Fluids />
        <Other />
      </div>
      <BlueprintString />
    </div>
  );
}

export default App;
