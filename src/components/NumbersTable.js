import React, { useState, useEffect, useMemo } from "react";
import { map } from "lodash";
import NumberContainer from "./NumberContainer";
import { getArrayOfRange, ALGORITHMS } from "../utils/range";
import "../styles/NumbersTable.css";

function NumbersTable(props) {
  const range = getArrayOfRange(2, props.rangeEnd);
  const [primeRange, setPrimeRange] = useState(range);
  const [items, setItems] = useState([]);
  const [p, setP] = useState(0);

  useEffect(() => {
    const itemsCopy = [];

    map(range, value => {
      itemsCopy.push(
        <NumberContainer
          key={`Initial-${value}`}
          number={value}
          isPrime={false}
        />
      );
    });

    setItems(itemsCopy);
    setP(2);
  }, []);

  useMemo(() => {
    if (!items.length) return;
    if (props.algorithmName === ALGORITHMS.ERATOSTHENES) {
      console.log("props.rangeEnd!!!", props.rangeEnd);
      if (p < props.rangeEnd) {
        setTimeout(() => {
            const newItems = [...items];
    
            newItems[p - 2] = <NumberContainer key={p} number={p} isPrime={true} />;
    
            // Only the numbers that are not dividable by p can be prime numbers
            const updatedPrimeRange = primeRange.filter(i => i === p || i % p !== 0);
            // New p will be the next so far undividable number (prime number)
            const newP = updatedPrimeRange[updatedPrimeRange.indexOf(p) + 1];

            setItems(newItems);
            setPrimeRange(updatedPrimeRange);
            setP(newP);
        }, 200)
      }
    }
  }, [p]);

  console.log("rerender", items);
  return <div className="NumbersTable">{items}</div>;
}

export default NumbersTable;
