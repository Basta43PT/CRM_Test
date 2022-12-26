import React, { useState } from "react";
import styles from "./shoppingCart.module.css";
import { ShoppingCardInline } from "../shoppingCardInline";
import "bootstrap/dist/css/bootstrap.min.css";

export function ShoppingCart({ shopCart, onClick }) {
  let innerCart;

  if (shopCart.length == 0) innerCart = [{ name: "", price: "", count: "" }];
  else innerCart = shopCart;
  // console.log(innerCart, "innerCart");

  return (
    <div className={styles.ShoppingCart}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Sum</th>
            </tr>
          </thead>
          {innerCart.map((cartItem) => (
            <ShoppingCardInline
              name={cartItem.name}
              price={cartItem.price}
              count={cartItem.count}
            />
          ))}
        </table>

        <div className="container">
          <button
            className={styles.button}
            onClick={() => {
              onClick(true);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
