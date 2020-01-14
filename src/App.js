import React from 'react';
import './App.css';
import TableWithInput from './components/TableWithInput.js'
import { ALGORITHMS } from './utils/range';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Visualisation of algorithms
        </p>
      </header>
      <TableWithInput algorithmName={ALGORITHMS.ERATOSTHENES} />
      {/* <TableWithInput algorithmName={ALGORITHMS.EULER} />
      <TableWithInput algorithmName={ALGORITHMS.ATKINS} /> */}
    </div>
  );
}

export default App;
