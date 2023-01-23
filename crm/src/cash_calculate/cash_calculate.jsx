import React, { useState, useEffect } from "react";
import styles from "./cash_calculate.module.css";

export function Cash_Calculate({}) {
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
  const [inputValues, setInputValues] = useState(dict);

  const handleChange = (event) => {
    setInputValues(event.target.value);
  };

  return (
    <div className={styles.case_calculate}>
      {/* {inputValues.map((inputValue) => (
        <label id={inputValue.name}> {inputValue.name} </label>
        <input type="text" value={inputValue.value} onChange={handleChange} />
      ))} */}
    </div>
  );
}
