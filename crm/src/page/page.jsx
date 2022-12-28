import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Link } from "react-router-dom";
import { Category } from "../category";
import { ShoppingCart } from "../shoppingCart";
import styles from "./page.module.css";
// import { data } from "../content/content";

// function useCart() {
//   const [cart, setCart] = useState([]);
// }

export function Page({ data }) {
  const [cart, setCart] = useState([]);

  const requestData = {
    method: "GET",
  };
  fetch("http://localhost:3000/data");

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
    console.log(cart, "cart");
    console.log(data, "data");
    console.log(
      data.map((e) => e.items.find((e0) => e0.id == 1)),
      "find"
    );
    const tempId = cart[0].id;
    const tempCount = cart[0].count;
    const amount = data.map((e) => e.items.find((e0) => e0.id == tempId))[0]
      .amount;
    const newAmount = amount - tempCount;
    console.log(tempId, tempCount, amount, newAmount, "details");

    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount: newAmount }),
    // };
    // fetch("http://localhost:3000/data", { requestOptions })
    //   .then((response) => response.json())
    //   .then((data) => this.setState(data[0]));

    return 0;
  }

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.categoreList}>
          {data.map((category) => (
            <Category
              categoryName={category.categoryName}
              items={category.items}
              addToCart={addItem}
              subFromCart={substractItem}
            />
          ))}
        </div>

        <div className={styles.ShoppingCart}>
          <ShoppingCart shopCart={cart} onClick={sendShoppingCart} />
        </div>
      </div>
    </div>
  );
}
