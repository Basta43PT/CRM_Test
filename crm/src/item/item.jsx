import React, { useState } from "react";
import styles from "./item.module.css";
import { Counter } from "../counter";
import classnames from "classnames";

export function Item({ name, price, id, add, sub, cart, categoryName }) {
  // const item = cart?.find((item) => item.id == id);
  // const count = item?.count ? item.count : 0;
  const className = classnames(styles.item, (categoryNameTemp) => {
    if (categoryName.includes(" ")) {
      return categoryName.replace(" ", "_");
    } else return categoryName;
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
      {/* <div className={styles.counter}>
        <Counter
          add={() => add(id, name, price)}
          subFromCart={() => sub(id)}
          count={count}
        />
      </div> */}
    </div>
  );
}
