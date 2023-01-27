import React, { useState } from "react";
import styles from "./shoppingCart.module.css";
import { ShoppingCardInline } from "../shoppingCardInline";
import { useCart } from "../useCart.js";
import "bootstrap/dist/css/bootstrap.min.css";

export function ShoppingCart({ onClick, cart }) {
  // const sum = cart.map((item)=>{})
  return (
    <div className={styles.ShoppingCart}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className>
        <table className={styles.tabel}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Sum</th>
            </tr>
          </thead>
          {cart.map((cartItem) => (
            <ShoppingCardInline
              name={cartItem.name}
              price={cartItem.price}
              count={cartItem.count}
            />
          ))}
        </table>

        <button
          className={styles.button}
          onClick={() => {
            onClick(true, "order");
          }}
        >
          Order
        </button>
      </div>
    </div>
  );
}
