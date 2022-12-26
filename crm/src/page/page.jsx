import React, { useState, useEffect } from "react";
import { Categore } from "../categore";
import { ShoppingCart } from "../shoppingCart";
import styles from "./page.module.css";
import { data } from "../content/content";

// function useCart() {
//   const [cart, setCart] = useState([]);
// }

export function Page(props) {
  const [cart, setCart] = useState([]);

  function addItem(idCart, nameCart, priceCart) {
    const index = cart.findIndex((item) => item.id == idCart);
    //IN case cart hasn't the specipic item in the array
    if (index == -1) {
      console.log("case 1 - new item added");
      setCart([
        ...cart,
        { id: idCart, name: nameCart, price: priceCart, count: 1 },
      ]);
      return;
    }
    //IN case cart has the specipic item in the array
    console.log("case 2 - exist item added");
    const currentItem = cart[index];
    const next = cart.map((item) => {
      if (item.id == currentItem.id) {
        return {
          ...item,
          count: (item.count += 1),
        };
      }
      return item;
    });
    setCart(next);
  }

  function substractItem(idCart, nameCart, priceCart) {
    const index = cart.findIndex((item) => item.id == idCart);
    //IN case cart hasn't the specipic item in the array
    if (index == -1) console.log("case 1 - no item to drop");
    else {
      if (cart[index].count > 1) {
        console.log("case 2 - sub 1 from item.count");
        const currentItem = cart[index];
        const next = cart.map((item) => {
          if (item.id === currentItem.id) {
            return {
              ...currentItem,
              count: (currentItem.count -= 1),
            };
          }
          return item;
        });
        setCart(next);
        return;
      } else {
        console.log("case 2 - remove item from cart");
        // const next = cart;
        // next.splice(index, 1);
        // next = [...next];
        const currentItem = cart[index];
        const next = cart.filter((item) => item.id != currentItem.id);
        setCart(next);
      }
    }
  }

  function sendShoppingCart(state) {
    return 0;
  }

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.categoreList}>
          {data.map((category) => (
            <Categore
              categoryName={category.categoryName}
              items={category.items}
              addToCart={addItem}
              subFromCart={substractItem}
            />
          ))}
        </div>

        <div className={styles.ShoppingCart}>
          {/* {console.log(cart, "page:cart")} */}
          <ShoppingCart shopCart={cart} onClick={sendShoppingCart} />
        </div>
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
