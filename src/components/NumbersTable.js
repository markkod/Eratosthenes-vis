import React from 'react'
import { map } from 'lodash'
import NumberConatiner from './NumberContainer'
import { getArrayOfRange, ALGORITHMS } from '../utils/range'
import '../styles/NumbersTable.css';

function NumbersTable(props) {
    const range = getArrayOfRange(2, props.rangeEnd)
    const items = []

    map(range, (index) => items.push( <NumberConatiner key={index} number={index+2} colored={false} />))

    if (props.algorithmName === ALGORITHMS.ERRATOSTHENES) {
        let p = 2;
        let primeRange = range;

        while (p < props.rangeEnd) {
          primeRange = primeRange.filter(i => i === p || i % p !== 0)
          map(range, (item, index) => {
                // Is prime number
                if (item === p) {
                    items[index] = <NumberConatiner number={index+2} isPrime={true} />
                } 
                // Isn't a prime number
                else if (item !== p && item % p === 0) { 
                    items[index] = <NumberConatiner number={index+2} isPrime={false} />
                }
          })
          p = primeRange[primeRange.indexOf(p) + 1]
        }
        console.log("primeRange:", primeRange)
    }

    if (props.algorithmName === ALGORITHMS.EULER) {
        // Implement euler's algorith
    }

    if (props.algorithmName === ALGORITHMS.ATKINS) {
        // Implement atkins algorith
    }

    return (
        <div className="NumbersTable">
           {items}
        </div>
    )
}

export default NumbersTable;