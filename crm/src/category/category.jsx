import React, { useState } from "react";
import styles from "./category.module.css";
import { Item } from "../item";

export function Category({ categoryName, items }) {
  return (
    <div className={styles.category}>
      <h1>{categoryName}</h1>
      <div className={styles.itemList}>
        {items.map((item, index) => (
          <Item
            // key={index}
            id={item.id}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
