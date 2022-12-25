import React, { useState } from "react";
import styles from "./item.module.css";
import { Counter } from "../counter";

export function Item(props) {
  return (
    <div className={styles.item}>
      <h5>{props.name}</h5>
      <div>₪ {props.price}</div>
      <div className={styles.counter}>
        <Counter
          onClick={props.onClick}
          name={props.name}
          price={props.price}
          id={props.id}
        />
      </div>
    </div>
  );
}
