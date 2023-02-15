import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import styles from "./transactions.module.css";
import { TransactionMainTable } from "../transactionMainTable";

function getCurrentDateAndTime(date) {
  //get current date
  const newdate = new Date(date);
  const month = newdate.getMonth() + 1; // January is 0
  const year = newdate.getFullYear();
  const day = newdate.getDate();
  const formattedDate = day + "/" + month + "/" + year;
  //get currentTime
  const hour = newdate.getHours();
  const minute = newdate.getMinutes();
  const currentTime = `${hour}:${minute}`;
  return { formattedDate: formattedDate, currentTime: currentTime };
}

export function Transactions({ transactions }) {
  const updatedTransactions = transactions.map((tran) => {
    const { formattedDate, currentTime } = getCurrentDateAndTime(tran.date);
    return {
      ...tran,
      formattedDate,
      currentTime,
    };
  });
  const revTransactions = updatedTransactions.reverse();

  return (
    <div className={styles.transactionPage}>
      <h1 className={styles.transactiontitle}>Transactions Table</h1>;
      <div className={styles.transactionTable}>
        <table className={styles.mainTable}>
          <thead>
            <tr>
              <th>OrderNum</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Total Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {revTransactions.map((tran) => (
              <TransactionMainTable tran={tran} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
