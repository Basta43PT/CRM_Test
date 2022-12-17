import React, { useState } from "react";
import { Categore } from "../categore";
import { ShoppingCart } from "../shoppingCart";
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
              return prev;
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
          return prev;
        }
        // console.log(prev);
        return prev;
      }
    });
  }
  function sendShoppingCart(state) {
    return 0;
  }
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
      <div className={styles.ShoppingCart}>
        {console.log(cart, "page:cart")}
        <ShoppingCart shopCart={cart} onClick={sendShoppingCart} />
      </div>
    </div>
  );
}

function productExist(prev, id) {
  for (let i = 0; i < prev.length; i++) {
    if (prev[i].id === id) return true;
  }
  return false;
}
