import React, { useState } from "react";
import { Categore } from "../categore";
import styles from "./page.module.css";

export function Page(props) {
  const [count, setcount] = useState(0);




  return (
    <div className={styles.page}>
      <div className={styles.categoreList}>
        {props.content.map((category) => (
          <Categore
            categoryName={category.categoryName}
            items={category.items}
          // onClick={}
          />
        ))}
      </div>
    </div>
  );
}
