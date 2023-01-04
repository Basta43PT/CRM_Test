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
  const newData = manageData(data);
  const [cart, setCart] = useState([]);
  // const [count, setCount] = useState([]);

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

  function sendShoppingCart(state, type) {
    console.log(cart, "cart");
    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        const id = cart[i].id;
        if (data[id].categoryName != "Chasers") {
          const newAmount = data[id].amount - cart[i].count;
          let updateItem = data[id];
          updateItem.amount = newAmount;

          try {
            fetch(`http://localhost:3000/data/${id}`, {
              method: "put",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(updateItem),
            });
          } catch (e) {
            console.error(e);
          }
        }
      }
      setCart([]);
    }
  }
  return (
    <div>
      <div className={styles.page}>
        <div className={styles.categoreList}>
          {newData.map((category) => (
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

// change the data from the dataBase to fit the rest of the code
function manageData(data) {
  let newData = [];
  let count = 1;
  data.map((item) => {
    const index = newData.findIndex(
      (newItem) => newItem.categoryName == item.categoryName
    );
    //IN case newItem has the category
    if (index != -1) {
      newData[index]["items"].push({
        id: item.id,
        name: item.name,
        img: item.img,
        price: item.price,
        amount: item.amount,
      });
    }
    //in case new categore
    else {
      newData.push({
        categoryName: item.categoryName,
        items: [
          {
            id: item.id,
            name: item.name,
            img: item.img,
            price: item.price,
            amount: item.amount,
          },
        ],
      });
      count++;
    }
  });
  console.log(newData, "newData");
  return newData;
}
