import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import styles from "./transactionMainTable.module.css";

export function TransactionMainTable({ tran }) {
  const [showDetailsForIndex, setShowDetailsForIndex] = useState(-1);
  const toggleDetails = (index) => {
    if (showDetailsForIndex === index) {
      setShowDetailsForIndex(-1);
    } else {
      setShowDetailsForIndex(index);
    }
  };

  return (
    <>
      <tr key={tran.id} className={styles.mainTableTR}>
        <td>{tran.id}</td>
        <td>{tran.formattedDate}</td>
        <td>{tran.currentTime}</td>
        <td>{tran.type}</td>
        <td>₪{tran.totalSum}</td>
        <td>
          <button onClick={() => toggleDetails(tran.id)}>
            {showDetailsForIndex === tran.id ? "Hide Details" : "Show Details"}
          </button>
        </td>
      </tr>
      {showDetailsForIndex === tran.id && (
        <div className={styles.detailsTR}>
          {tran.detail.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₪{product.price}</td>
              <td>{product.count}</td>
              <td>₪{product.price * product.count}</td>
            </tr>
          ))}
        </div>
      )}
    </>
  );
}
