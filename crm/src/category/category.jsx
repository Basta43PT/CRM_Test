import React, { useState } from "react";
import styles from "./category.module.css";
import { Item } from "../item";

export function Category({ categoryName, items, addToCart, subFromCart }) {
  return (
    <div className={styles.category}>
      <h1>{categoryName}</h1>
      <div className={styles.itemList}>
        {items.map((item) => (
          <Item
            id={item.id}
            name={item.name}
            price={item.price}
            count={item.count}
            // onClick={onClick}
            addToCart={addToCart}
            subFromCart={subFromCart}
          />
        ))}
      </div>
    </div>
  );
}
