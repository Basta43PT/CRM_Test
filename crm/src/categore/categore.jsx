import React, { useState } from "react";
import styles from "./categore.module.css";
import { Item } from "../item";

export function Categore(props) {
  return (
    <div className={styles.categore}>
      <h2>{props.categoryName}</h2>
      <div className={styles.itemList}>
        {props.items.map((item) => (
          <Item
            name={item.name}
            price={item.price}
            onClick={item.onClick}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}
