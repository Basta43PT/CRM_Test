import React, { useState } from "react";
import styles from "./shoppingCardInline.module.css";

export function ShoppingCardInline(props) {
  let sum = props.price * props.count;
  return (
    <tr>
      <td scope="row"> {props.name} </td>
      <td> {props.price} </td>
      <td> {props.count} </td>
      <td>{sum} </td>
    </tr>
  );
}
