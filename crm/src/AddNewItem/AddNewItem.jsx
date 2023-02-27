import React, { useState } from "react";
import { AddItem } from "./AddItem";
import { AddCategory } from "./AddCategory";
import styles from "./AddNewItem.module.css";

export function AddNewItem(props) {
  return (
    <div className={styles.container}>
      <AddItem />
      <AddCategory />
    </div>
  );
}
