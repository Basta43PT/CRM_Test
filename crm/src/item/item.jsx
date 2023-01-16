import React, { useState } from "react";
import styles from "./item.module.css";
import { Counter } from "../counter";
import { useCart } from "../useCart.js";

export function Item({ name, price, id, add, sub, cart }) {
  const item = cart?.find((item) => item.id == id);
  const count = item?.count ? item.count : 0;

  return (
    <div className={styles.item}>
      <h5>{name}</h5>
      <div>₪ {price}</div>
      <div className={styles.counter}>
        <Counter
          add={() => add(id, name, price)}
          subFromCart={() => sub(id)}
          count={count}
        />
      </div>
    </div>
  );
}
