import React, { useState } from "react";
import { Categore } from "../categore";
import styles from "./page.module.css";
import { data } from "../content/content";

export function Page(props) {
  const [cart, setCart] = useState([]);

  function updateCount(idCart, nameCart, priceCart, action) {
    setCart((prev) => {
      const dic = {};
      if (prev.length == 0) {
        console.log("case 1 - intial");

        //In case perv empty
        if (action == "+")
          prev = [{ id: idCart, name: nameCart, price: priceCart, count: 1 }];
        console.log(prev);
        return prev;
      } else {
        if (productExist(prev, idCart)) {
          console.log("case 2 - true");
          //IN case prev has the specipic item in the array
          for (let i = 0; i < prev.length; i++)
            if (prev[i].id == idCart) {
              if (action == "+") prev[i].count++;
              if (action == "-")
                if (prev[i].count == 1) prev.splice(i, 1);
                else prev[i].count--;
            }
        } else {
          //IN case prev hasn't the specipic item in the array
          console.log("case 3 - false");

          if (action == "+")
            prev.push({
              id: idCart,
              name: nameCart,
              price: priceCart,
              count: 1,
            });
        }
        console.log(prev);
        return prev;
      }
    });
  }

  //   console.log("id", idCounter, "action", action);
  //   let flag = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     if (flag == 0) {
  //       for (let j = 0; j < data[i].items.length; j++)
  //         if (idCounter === data[i].items[j].id) {
  //           if (action === "+") {
  //             data[i].items[j].count++;
  //             flag = 1;
  //             console.log(data[i].items[j], data[i]);
  //             break;
  //           }
  //           if (action === "-") {
  //             if (data[i].items[j].count > 0) data[i].items[j].count--;
  //             flag = 1;
  //             console.log(data[i].items[j], data[i]);
  //             break;
  //           }
  //         }
  //     } else break;
  //   }
  //   console.log(data);
  // }
  // setCart((prev) => {
  //   return prev.map((objs) => {
  //     console.log(objs, "objs");

  //     for (var obj in objs) {
  //       console.log(obj, "obj");
  //     }

  return (
    <div className={styles.page}>
      <div className={styles.categoreList}>
        {data.map((category) => (
          <Categore
            categoryName={category.categoryName}
            items={category.items}
            onClick={updateCount}
          />
        ))}
      </div>
    </div>
  );
}

// function manageCountArray() {
//   let arr = data.map((cat) =>
//     cat.items.map((it) => [it.id, it.name, it.price, it.count])
//   );
//   let temp = [];
//   for (let i = 0; arr.length > i; i++) {
//     for (let j = 0; arr[i].length > j; j++) {
//       temp.push({
//         id: arr[i][j][0],
//         name: arr[i][j][1],
//         price: arr[i][j][2],
//         count: arr[i][j][3],
//       });
//     }
//   }
//   return temp;
// }

function productExist(prev, id) {
  for (let i = 0; i < prev.length; i++) {
    if (prev[i].id === id) return true;
  }
  return false;
}
