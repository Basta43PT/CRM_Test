import React, { useState, useEffect } from "react";
import styles from "./cash.module.css";
import { Cash_Calculate } from "../cash_calculate";
import { Item } from "../item";

export function Cash({ cashData }) {
  const dict = [
    { name: 200, value: 0 },
    { name: 100, value: 0 },
    { name: 50, value: 0 },
    { name: 20, value: 0 },
    { name: 10, value: 0 },
    { name: 5, value: 0 },
    { name: 2, value: 0 },
    { name: 1, value: 0 },
    { name: 0.5, value: 0 },
    { name: 0.1, value: 0 },
  ];
  const [inputs, setInputs] = useState(dict);
  const handleChange = (event, name) => {
    const next = inputs.map((line) => {
      console.log(event, "event");
      if (name == line.name) return { ...inputs, [line.value]: event };
      return line;
    });
    console.log(next, "next");
    setInputs(next);
  };
  const sum = dict.reduce((sum, num) => sum + Item.name * Item.value, 0);
  console.log("Case");
  //calculate the first line how much counted in the last counting
  const lastCounted = cashData[cashData.length - 1]
    ? cashData[cashData.length - 1].totalSum
    : 0;

  return (
    <div className={styles.cancelOrder}>
      <h2>Total Cash: ₪{lastCounted} counted by: </h2>
      <div>
        {inputs.map((numLine) => {
          return <Cash_Calculate numLine={numLine} onChange={handleChange} />;
        })}
        <h3>total conuting: ₪{sum ? sum : 0} </h3>
      </div>
    </div>
  );
}
