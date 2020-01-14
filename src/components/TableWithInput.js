import React, { useState, useEffect } from "react";

import NumbersTable from "./NumbersTable";
import "../styles/TableWithInput.css";

function TableWithInput(props) {
  const [rangeEnd, setRangeEnd] = useState(50);
  const [shouldStartCalculating, setShouldStartCalculating] = useState(false);
  let element;

  useEffect(() => {
    element = document.getElementById(`rangeEndInput-${props.algorithmName}`);
  });

  return (
    <div className="TableWithInput">
      <div className="InputContainer">
        Insert final number of the end:{" "}
        <input
          id={`rangeEndInput-${props.algorithmName}`}
          type="number"
          name="maxnumber"
          value={rangeEnd}
          onChange={() => {
            setShouldStartCalculating(false);
            element && setRangeEnd(element.value);
          }}
        />
        <button onClick={rangeEnd > 2 ? setShouldStartCalculating : () => {}}>
          Find prime numbers
        </button>
      </div>
      {shouldStartCalculating ? (
        <NumbersTable rangeEnd={rangeEnd} algorithmName={props.algorithmName} />
      ) : null}
    </div>
  );
}

export default TableWithInput;
