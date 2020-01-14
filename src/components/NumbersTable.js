import React, { useState, useEffect, useMemo } from "react";
import { map } from "lodash";
import NumberContainer from "./NumberContainer";
import { getArrayOfRange, ALGORITHMS, randomColour } from "../utils/range";
import "../styles/NumbersTable.css";

function NumbersTable(props) {
  const range = getArrayOfRange(2, props.rangeEnd);
  const [primeRange, setPrimeRange] = useState(range);
  const [items, setItems] = useState([]);
  const [p, setP] = useState(0);
  const [primeNumbersArray, setPrimeNumbersArray] = useState([]);

  useEffect(() => {
    const itemsCopy = [];

    map(range, value => {
      itemsCopy.push(
        <NumberContainer
          key={`Initial-${value}`}
          number={value}
          isPrime={false}
          colour={null}
        />
      );
    });

    setItems(itemsCopy);
    setP(2);
  }, []);

  useMemo(() => {
    if (!items.length) return;
    if (props.algorithmName === ALGORITHMS.ERATOSTHENES) {
      if (p < props.rangeEnd) {
        setTimeout(() => {
          const colour = randomColour();
          setPrimeNumbersArray([...primeNumbersArray, p]);

          const newItems = map(items, item => {
            const { props: itemProps } = item;

            if (itemProps.number === p || itemProps.number % p === 0) {
              return (
                <NumberContainer
                  key={`Coloured-${itemProps.number}`}
                  number={itemProps.number}
                  isPrime={itemProps.number === p}
                  colour={itemProps.colour || colour}
                />
              );
            } else return item;
          });

          // Only the numbers that are not multiples of p can be prime numbers
          const updatedPrimeRange = primeRange.filter(
            i => i === p || i % p !== 0
          );
          // New p will be the next so far not multiple of p (prime number)
          const newP = updatedPrimeRange[updatedPrimeRange.indexOf(p) + 1];

          setItems(newItems);
          setPrimeRange(updatedPrimeRange);
          setP(newP);
        }, 700);
      }
    }
  }, [p]);

  return (
    <div>
      <div className="NumbersTable">{items}</div>
      <div>
        {map(primeNumbersArray, n => (
          <b className="NumbersTablePrimeNumber" >{n}</b>
        ))}
      </div>
    </div>
  );
}

export default NumbersTable;
