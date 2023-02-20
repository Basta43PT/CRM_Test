import React, { useState } from "react";
import styles from "./shoppingCart.module.css";
import { ShoppingCardInline } from "../shoppingCardInline";
import "bootstrap/dist/css/bootstrap.min.css";

export function ShoppingCart({ onClick, cart, sub, add, reset }) {
  const [checked, setChecked] = useState(false);

  const sum = cart.reduce(
    (sum, item) => (sum = sum + item.price * item.count),
    0
  );
  // checkBox
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className={styles.ShoppingCart}>
      <h1 className={styles.title}>Shopping Cart</h1>
      {cart.length != 0 && (
        <h5
          className={styles.clearAll}
          onClick={() => {
            reset();
          }}
        >
          Clear All
        </h5>
      )}
      <div className={styles.shoppingCardInline}>
        <ui className>
          {cart.map((cartItem) => (
            <ShoppingCardInline
              id={cartItem.id}
              name={cartItem.name}
              price={cartItem.price}
              count={cartItem.count}
              sub={sub}
              add={add}
            />
          ))}
        </ui>
        <div className={styles.buttonWarp}>
          <button
            className={styles.button}
            style={
              checked
                ? {
                    backgroundColor: "red",
                    color: "white",
                    border: "rgb(169, 51, 19)",
                  }
                : {}
            }
            onClick={() => {
              onClick(checked ? "cancel" : "order");
              setChecked(false);
            }}
          >
            {checked ? "Cancel" : "Order"} ₪{sum}
          </button>
        </div>

        <div className={styles.checkBox}>
          <label className={styles.label_checkBox}>
            <input
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              className={styles.input_checkBox}
            />
            Cancel Order
          </label>
        </div>
      </div>
    </div>
  );
}
