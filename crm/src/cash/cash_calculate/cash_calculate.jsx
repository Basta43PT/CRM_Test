import React, { useState, useEffect } from "react";
import styles from "./cash_calculate.module.css";

export function Cash_Calculate({ numLine, onChange }) {
  const name = numLine.name;
  return (
    <div className={styles.cash_calculate}>
      <table>
        <tr>
          <th>₪{name}</th>
          <td>
            <input
              className={styles.input_cash_cal}
              type="number"
              value={numLine.value}
              onChange={(event) => {
                onChange(event.target.value, numLine.name);
              }}
            />
          </td>
        </tr>
      </table>
    </div>
  );
}
