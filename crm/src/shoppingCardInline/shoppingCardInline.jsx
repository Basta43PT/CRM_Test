import React, { useState } from "react";
import styles from "./shoppingCardInline.module.css";

export function ShoppingCardInline({ price, count, name }) {
  const sum = price * count;
  return (
    <tr>
      <td scope="row"> {name} </td>
      <td> {price} </td>
      <td> {count} </td>
      <td>{sum} </td>
    </tr>
  );
}
