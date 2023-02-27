import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Link } from "react-router-dom";
import { Category } from "../category";
import { ShoppingCart } from "../shoppingCart";
import { useCart } from "../../useCart.js";
import styles from "./page.module.css";

// change the data from the dataBase to fit the rest of the code
function manageData(data) {
  let newData = [];
  let count = 1;
  data?.map((item) => {
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
  return newData;
}

export function Page({ data, inventory, transactions }) {
  console.log(data, "page:data");
  const newData = manageData(data);
  const { add, sub, reset, cart } = useCart();
  console.log(cart, "page:cart");
  if (!data) return null;

  function sendShoppingCart(type) {
    //update db and intial shoppingCart&&add transaction to db"transactions".
    if (cart.length > 0) {
      console.log(cart, "page:cart", type, "page:type");
      cart.map((c) => {
        const id = c.id;
        if (data[id].categoryName != "Chasers") {
          inventory.map((item) => {
            item.amount =
              item.id == id && type == "order"
                ? item.amount - c.count
                : item.id == id && type == "cancel"
                ? item.amount + c.count
                : item.amount;
          });
        }
      });

      const updatedSerializedInventory = JSON.stringify(inventory);
      localStorage.setItem("inventory", updatedSerializedInventory);
    }
    //create transaction for db.json:transactions
    const sum = cart.reduce(
      (sum, item) => (sum = sum + item.price * item.count),
      0
    );
    if (sum != 0) {
      const maxId = Math.max(...transactions.map((c) => c.id));
      const transaction = {
        id: transactions.length != 0 ? maxId : 1,
        date: new Date(),
        type: type,
        totalSum: type == "order" ? sum : -1 * sum,
        detail: cart,
      };
      transactions.push(transaction);
      try {
        const updatedSerializedTransactions = JSON.stringify(transactions);
        localStorage.setItem("transactions", updatedSerializedTransactions);
      } catch (e) {
        console.error(e);
      }
    }
    reset();
  }

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.categoreList}>
          {newData.map((category) => (
            <Category
              categoryName={category.categoryName}
              items={category.items}
              add={add}
              sub={sub}
              cart={cart}
            />
          ))}
        </div>

        <div className={styles.ShoppingCart}>
          <ShoppingCart
            onClick={sendShoppingCart}
            cart={cart}
            sub={sub}
            add={add}
            reset={reset}
          />
        </div>
      </div>
    </div>
  );
}
