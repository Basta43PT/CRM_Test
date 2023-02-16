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
  return newData;
}

export function Page({ data, transactions }) {
  const newData = manageData(data);
  const { add, sub, reset, cart } = useCart();
  console.log(cart, "page:cart");

  function sendShoppingCart(type) {
    //update db and intial shoppingCart&&add transaction to db"transactions".
    if (cart.length > 0) {
      console.log(cart, "page:cart", type, "page:type");

      for (let i = 0; i < cart.length; i++) {
        const id = cart[i].id;
        if (data[id].categoryName != "Chasers") {
          const newAmount =
            type == "order"
              ? data[id].amount - cart[i].count
              : data[id].amount + cart[i].count;
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
      //create transaction for db.json:transactions
      const sum = cart.reduce(
        (sum, item) => (sum = sum + item.price * item.count),
        0
      );
      const lastTransaction = transactions[transactions.length - 1]
        ? transactions[transactions.length - 1]
        : undefined;
      const transaction = {
        id: lastTransaction != undefined ? lastTransaction.id++ : 1,
        date: new Date(),
        type: type,
        totalSum: (type = "order" ? sum : -sum),
        detail: cart,
      };
      console.log(transaction, "page:transaction");
      try {
        fetch(`http://localhost:3000/transactions`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(transaction),
        });
      } catch (e) {
        console.error(e);
      }
      reset();
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
              add={add}
              sub={sub}
              cart={cart}
            />
          ))}
        </div>

        <div className={styles.ShoppingCart}>
          <ShoppingCart onClick={sendShoppingCart} cart={cart} sub={sub} />
        </div>
      </div>
    </div>
  );
}
