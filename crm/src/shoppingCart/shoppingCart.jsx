import React, { useState } from "react";
import styles from "./shoppingCart.module.css";
import { ShoppingCardInline } from "../shoppingCardInline";
import "bootstrap/dist/css/bootstrap.min.css";

export function ShoppingCart(props) {
  let innerCart;

  if (props.shopCart.length == 0)
    innerCart = [{ name: "", price: "", count: "" }];
  else innerCart = props.shopCart;
  console.log(innerCart, "innerCart");

  return (
    <div className={styles.ShoppingCart}>
      <h2>Shopping Cart</h2>
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
            onClick={() => {
              props.onClick(true);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
