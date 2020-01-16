import React, { useState, useEffect, useMemo } from "react";
import { map } from "lodash";
import NumberContainer from "./NumberContainer";
import { getArrayOfRange, ALGORITHMS, randomColour } from "../utils/range";
import "../styles/NumbersTable.css";

const MARKED_COLOUR = "#6bef9a";

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
  const [sundaramPrimes, setSundaramPrimes] = useState([]);

  const [i, setI] = useState(1);
  const [l, setL] = useState(0);

  useEffect(() => {
    const itemsCopy = [];

    map(range, value => {
      itemsCopy.push(
        <NumberContainer
          key={`Initial-${props.algorithmName}-${value}`}
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
        }, 400);
      }
    } else if (props.algorithmName === ALGORITHMS.SUNDARAM) {
      if (i <= k) {
        setTimeout(() => {
          const newItems = [...items];

          for (var j = i; i + j + 2 * i * j <= k; j++) {
            const itemToUpdate = newItems[i + j + 2 * i * j - 1];
            newItems[i + j + 2 * i * j - 1] = (
              <NumberContainer
                key={`Marked-${itemToUpdate.props.number}`}
                number={itemToUpdate.props.number}
                isPrime={itemToUpdate.props.isPrime}
                colour={MARKED_COLOUR}
              />
            );
          }

          setItems(newItems);
          setI(i + 1);
        }, 200);
      } else {
        setTimeout(() => {
          const newItems = [...items];
          if (props.rangeEnd > 2) {
            const firstPrime = newItems[1];
            if (!sundaramPrimes.includes(firstPrime.props.number)) {
                sundaramPrimes.push(firstPrime.props.number)
            }
            newItems[1] = (
              <NumberContainer
                key={`Prime-${firstPrime.props.number}`}
                number={firstPrime.props.number}
                isPrime={true}
                colour={firstPrime.props.colour}
              />
            );
            setItems(newItems);
          }
          if (l <= k) {

            if (l < newItems.length && newItems[l].props.colour !== MARKED_COLOUR) {
              const indexValue = newItems[l].props.number;
              const primeValue = 2 * indexValue + 1;
              console.log(primeValue)
              if (!sundaramPrimes.includes(primeValue)) {
                sundaramPrimes.push(primeValue)
              }
              console.log("-- PRIME VALUE --", primeValue);
              
              const updatedItems = map(newItems, (item, index) => {
                if (item.props.number === primeValue) {
                  return (
                    <NumberContainer
                      key={`Prime-${item.props.number}`}
                      number={item.props.number}
                      isPrime={true}
                      colour={item.props.colour}
                    />
                  );
                } else return item;
              });
              setSundaramPrimes([...sundaramPrimes])
              setItems(updatedItems);
            }
            setL(l + 1);
          }
        }, 200);
      }
    }
  }, [p, i, l]);

  return (
    <div>
      <div className="NumbersTable">{items}</div>
      <div className="NumbersTablePrimeNumberContainer">
        {props.algorithmName === ALGORITHMS.SUNDARAM ?
          map(sundaramPrimes, n => (
            <b className="NumbersTablePrimeNumber">{n}</b>
          ))
        : map(primeNumbersArray, n => (
          <b className="NumbersTablePrimeNumber">{n}</b>
        ))}
      </div>
    </div>
  );
}

export default NumbersTable;
