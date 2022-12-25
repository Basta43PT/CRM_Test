import React, { useState } from "react";
import styles from "./categore.module.css";
import { Item } from "../item";

export function Categore(props) {
  return (
    <div className={styles.category}>
      <h2>{props.categoryName}</h2>
      <div className={styles.itemList}>
        {props.items.map((item) => (
          <Item
            id={item.id}
            name={item.name}
            price={item.price}
            count={item.count}
            onClick={props.onClick}
          />
        ))}
      </div>
    </div>
  );
}
