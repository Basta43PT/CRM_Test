import React, { useState } from "react";
import styles from "./shoppingCardInline.module.css";

export function ShoppingCardInline({ price, count, name, sub, id }) {
  const sum = price * count;
  return (
    <li className={styles.row}>
      <span className={styles.count}> {count} </span>
      <span className={styles.name}> {name} </span>
      <span className={styles.sum}>₪{sum} </span>
      <span
        className={styles.subBtn}
        onClick={() => {
          sub(id);
        }}
      >
        –
      </span>
    </li>
  );
}
