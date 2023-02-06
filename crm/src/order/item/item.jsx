import React, { useState } from "react";
import styles from "./item.module.css";
import classnames from "classnames";

export function Item({ name, price, id, add, sub, cart, categoryName }) {
  const className = classnames(styles.item, {
    [styles.Beers]: categoryName === "Beers",
    [styles.Chasers]: categoryName === "Chasers",
    [styles.Soft_Drinks]: categoryName === "Soft Drinks",
  });

  return (
    <div
      className={className}
      onClick={() => {
        add(id, name, price);
      }}
    >
      <h5>{name}</h5>
      <div>₪ {price}</div>
    </div>
  );
}
