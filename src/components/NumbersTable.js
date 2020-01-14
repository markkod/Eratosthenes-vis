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
  const [i, setI] = useState(1);
  const [l, setL] = useState(1);
  const [sundaramFinished, setFinished] = useState(false);
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
        }, 200);
      }
    } else if (props.algorithmName === ALGORITHMS.SUNDARAM) {
      const k = (props.rangeEnd - 2) / 2;
      if (i <= k && !sundaramFinished) {
        setTimeout(() => {
          const newItems = [...items];
          for (var j = i; i + j + 2 * i * j <= k; j++) {
            const updateTargetItem = newItems[i + j + 2 * i * j];
            if (!updateTargetItem.props.isMarked) {
                const updateTargetItemCopy = (
                    <NumberContainer
                      key={updateTargetItem.key}
                      number={updateTargetItem.props.number}
                      isPrime={updateTargetItem.props.isPrime}
                      isMarked={true}
                    />
                  );
                  newItems[i + j + 2 * i * j] = updateTargetItemCopy;
            }
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
          console.log('All items after algorithm has finished: ' + newItems)
          if (props.rangeEnd > 2) {
            const firstPrime = newItems[0];
            const firstPrimeCopy = (
              <NumberContainer
                key={firstPrime.props.key}
                number={firstPrime.props.number}
                isPrime={true}
                //isMarked={firstPrime.props.isMarked}
              />
            );
            newItems[0] = firstPrimeCopy;
            //newItems.indexOf(2).props.isPrime = true;
          }
          if (l <= k) {
              console.log("Checking for prime" + newItems[l].props)
            if (newItems[l].props.isMarked === false) {
              const primeNumber = newItems[2 * l + 1];
              console.log('Found prime number: ' + primeNumber)
              const primeNumberCopy = (
                <NumberContainer
                  key={primeNumber.props.key}
                  number={primeNumber.props.number}
                  isPrime={true}
                  isMarked={primeNumber.props.isMarked}
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