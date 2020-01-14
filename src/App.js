import React, { useState } from "react";
import "./App.css";
import TableWithInput from "./components/TableWithInput.js";
import { ALGORITHMS } from "./utils/range";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Visualisation of algorithms</p>
      </header>
      <h1>Sieve of Eratosthenes</h1>
      <TableWithInput algorithmName={ALGORITHMS.ERATOSTHENES} />
      <br></br>
      <h1>Sieve of Sundaram</h1>
      <TableWithInput algorithmName={ALGORITHMS.SUNDARAM} />
    </div>
  );
}

export default App;
