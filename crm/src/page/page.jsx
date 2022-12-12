import React, { useState } from "react";
import { Categore } from "../categore";
import styles from "./page.module.css";
import { data } from "../content/content";

export function Page(props) {
  let arr = manageCountArray();
  const [cart, setCart] = useState([]);

  function updateCount(i, action) {
    console.log("id");
    console.log(i, action);
    debugger;
    setCart((prev) => {
      return prev.map((obj) => {
        if (obj.id == i) return obj.count++;
      });
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.categoreList}>
        {data.map((category) => (
          <Categore
            categoryName={category.categoryName}
            items={category.items}
            // onClick={() => updateCount(category.items.map((item) => item.id))}
            onClick={updateCount}
          />
        ))}
      </div>
    </div>
  );
}

function manageCountArray() {
  let arr = data.map((cat) => cat.items.map((it) => [it.id, it.count]));
  let temp = [];
  for (let i = 0; arr.length > i; i++) {
    for (let j = 0; arr[i].length > j; j++) {
      temp.push({ id: arr[i][j][0], count: arr[i][j][1] });
    }
  }
  console.log("temp", temp);
  return temp;
}
