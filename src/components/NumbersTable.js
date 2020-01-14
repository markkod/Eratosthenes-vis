import React, { useState, useEffect, useMemo } from "react";
import { map } from "lodash";
import NumberContainer from "./NumberContainer";
import { getArrayOfRange, ALGORITHMS, randomColour } from "../utils/range";
import "../styles/NumbersTable.css";

function NumbersTable(props) {
  const k = (props.rangeEnd - 2) / 2;
  const range = getArrayOfRange(
    props.algorithmName === ALGORITHMS.SUNDARAM ? 1 : 2,
    props.algorithmName === ALGORITHMS.SUNDARAM ? k : props.rangeEnd
  );

  const [primeRange, setPrimeRange] = useState(range);
  const [items, setItems] = useState([]);
  const [p, setP] = useState(0);
  const [primeNumbersArray, setPrimeNumbersArray] = useState([]);

  const [i, setI] = useState(1);
  const [l, setL] = useState(1);

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
      if (i <= k) {
        setTimeout(() => {
          const newItems = [...items];

          for (var j = i; i + j + 2 * i * j <= k; j++) {
            // TODO: Should be maybe <= k

            const itemToUpdate = newItems[i + j + 2 * i * j - 1];
            newItems[i + j + 2 * i * j - 1] = (
              <NumberContainer
                key={`Marked-${itemToUpdate.props.number}`}
                number={itemToUpdate.props.number}
                isPrime={itemToUpdate.props.isPrime}
                colour={"#6bef9a"}
              />
            );
            setItems(newItems);
          }

          setI(i + 1);
          //   if (i === k) {
          //     setFinished(true);
          //   }
        }, 200);
      } else {
        
        setTimeout(() => {
          const newItems = [...items];
          if (props.rangeEnd > 2) {
            const firstPrime = newItems[1];
            const firstPrimeCopy = (
              <NumberContainer
                key={firstPrime.key}
                number={firstPrime.props.number}
                isPrime={true}
                colour={"MarkedNumberContainer"}
              />
            );
            newItems[1] = firstPrimeCopy;
          }
          if (l <= k) {
            if (l === 1) {
              console.log(newItems)
              console.log(items)
            }
            if (l < newItems.length && !newItems[l].key.includes("Marked")) {
              console.log("l, prime: " + (l+1));
              
              const index = 2 * l + 2;
              if (index < newItems.length) {
                const primeNumber = newItems[index];
                const primeNumberCopy = (
                  <NumberContainer
                    key={primeNumber.key}
                    number={primeNumber.props.number}
                    isPrime={true}
                  />
                );
                newItems[index] = primeNumberCopy;
              }
              
            }
          }
          setItems(newItems);
          setL(l + 1);
        }, 0);
      }
    }
  }, [p, i, l]);

  return (
    <div>
      <div className="NumbersTable">{items}</div>
      <div>
        {map(primeNumbersArray, n => (
          <b className="NumbersTablePrimeNumber">{n}</b>
        ))}
      </div>
    </div>
  );
}

export default NumbersTable;
