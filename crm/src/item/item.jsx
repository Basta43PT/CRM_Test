import React, { useState } from "react";
import styles from "./item.module.css";
import { Counter } from "../counter";

export function Item({ addToCart, subFromCart, name, price, id }) {
  return (
    <div className={styles.item}>
      <h5>{name}</h5>
      <div>₪ {price}</div>
      <div className={styles.counter}>
        <Counter
          // onClick={onClick}
          addToCart={addToCart}
          subFromCart={subFromCart}
          name={name}
          price={price}
          id={id}
        />
      </div>
    </div>
  );
}
