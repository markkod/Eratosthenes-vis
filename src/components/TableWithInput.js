import React, { useState } from 'react';

import NumbersTable from './NumbersTable'
import { ALGORITHMS } from '../utils/range';
import '../styles/TableWithInput.css'

function TableWithInput() {

    const [rangeEnd, setRangeEnd] = useState(50);
    const [shouldStartCalculating, setShouldStartCalculating] = useState(false);

    return (
        <div className="TableWithInput">
            <div className="InputContainer">
                Insert final number of the end: <input id="rangeEndInput" type="number" name="maxnumber" value={rangeEnd} onChange={() => {
                    setShouldStartCalculating(false)
                    setRangeEnd(document.getElementById("rangeEndInput").value)
                }}/>
                <button onClick={rangeEnd > 2 ? setShouldStartCalculating : () => {}}>Find prime numbers</button>
            </div>
            {shouldStartCalculating ? 
                <NumbersTable rangeEnd={rangeEnd} algorithmName={ALGORITHMS.ERRATOSTHENES} />
            : null}
        </div>
    )
}

export default TableWithInput;