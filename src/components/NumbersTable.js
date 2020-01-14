import React, { useState, useEffect, useMemo } from "react";
import { map } from "lodash";
import NumberContainer from "./NumberContainer";
import { getArrayOfRange, ALGORITHMS } from "../utils/range";
import "../styles/NumbersTable.css";
import { returnStatement } from "@babel/types";

function NumbersTable(props) {
  const range = getArrayOfRange(2, props.rangeEnd);
  const [primeRange, setPrimeRange] = useState([]);
  const [items, setItems] = useState([]);
  const [p, setP] = useState(2);

  useEffect(() => {
    console.log("---- useEffect");
    console.log("---- useEffect p", p);
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

    console.log("Initial items: ", itemsCopy);
    setItems(itemsCopy);
  }, []);

  useMemo(() => {
    console.log("---- useMemo");
    console.log("---- state p", p);
    console.log("---- state primeRange", primeRange);
    console.log("---- state items", items);

    if (!items.length) return;
    if (props.algorithmName === ALGORITHMS.ERRATOSTHENES) {
      if (p <= props.rangeEnd) {
        const newItems = [...items];

        newItems[p - 2] = <NumberContainer key={p} number={p} isPrime={true} />;
        setItems(newItems);

        const updatedPrimeRange = items.filter(i => i === p || i % p !== 0);
        const newP = updatedPrimeRange[updatedPrimeRange.indexOf(p) + 1];
        setPrimeRange(updatedPrimeRange);
        setP(newP);
      }
    }
  }, [items]);

  console.log("rerender", items);
  return <div className="NumbersTable">{items}</div>;
}

export default NumbersTable;
