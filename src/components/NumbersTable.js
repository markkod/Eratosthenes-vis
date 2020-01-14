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
  const [i, setI] = useState(1);
  const [l, setL] = useState(1);
  const [sundaramFinished, setFinished] = useState(false);

  useEffect(() => {
    const itemsCopy = [];

    map(range, value => {
      itemsCopy.push(
        <NumberContainer
          key={`Initial-${value}`}
          number={value}
          isPrime={false}
          isMarked={false}
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
          const newItems = [...items];

          newItems[p - 2] = (
            <NumberContainer key={p} number={p} isPrime={true} />
          );

          // Only the numbers that are not dividable by p can be prime numbers
          const updatedPrimeRange = primeRange.filter(
            i => i === p || i % p !== 0
          );
          // New p will be the next so far undividable number (prime number)
          const newP = updatedPrimeRange[updatedPrimeRange.indexOf(p) + 1];

          setItems(newItems);
          setPrimeRange(updatedPrimeRange);
          setP(newP);
        }, 200);
      }
    } else if (props.algorithmName === ALGORITHMS.SUNDARAM) {
      const k = (props.rangeEnd - 2) / 2;
      if (i <= k && !sundaramFinished) {
        setTimeout(() => {
          const newItems = [...items];
          for (var j = i; i + j + 2 * i * j <= k; j++) {
            const updateTargetItem = newItems[i + j + 2 * i * j];
            const updateTargetItemCopy = (
              <NumberContainer
                key={updateTargetItem.key}
                number={updateTargetItem.props.number}
                isPrime={updateTargetItem.props.isPrime}
                isMarked={true}
              />
            );
            newItems[i + j + 2 * i * j] = updateTargetItemCopy;
            console.log('newItems[i + j + 2 * i * j] props ----', newItems[i + j + 2 * i * j].props)
          }

          if (i === k) {
            setFinished(true);
          }

          setI(i + 1);
          setItems(newItems);
        }, 200);
      } else if (sundaramFinished) {
        setTimeout(() => {
          const newItems = [...items];

          if (props.rangeEnd > 2) {
            const firstPrime = newItems[1];
            const firstPrimeCopy = (
              <NumberContainer
                key={firstPrime.key}
                number={firstPrime.number}
                isPrime={true}
                isMarked={firstPrime.isMarked}
              />
            );
            newItems[1] = firstPrimeCopy;
            //newItems.indexOf(2).props.isPrime = true;
          }
          if (l <= k) {
            if (newItems[l].props.isMarked === false) {
              const primeNumber = newItems[2 * l + 1];
              console.log('Found prime number: ' + primeNumber)
              const primeNumberCopy = (
                <NumberContainer
                  key={primeNumber.key}
                  number={primeNumber.number}
                  isPrime={true}
                  isMarked={primeNumber.isMarked}
                />
              );
              newItems[2 * l + 1] = primeNumberCopy;
              //newItems[2 * l + 1].props.isPrime = true;
            }
          }
          setItems(newItems);
          setL(l + 1);
        }, 200);
      }
    }
  }, [p, i, l]);

  //console.log("rerender", items);
  return <div className="NumbersTable">{items}</div>;
}

export default NumbersTable;
