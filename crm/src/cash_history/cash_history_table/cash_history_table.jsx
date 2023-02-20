/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import styles from "./cash_history_table.module.css";

//get date object return time and date with custome formate
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
  const ziromin = minute < 9 ? 0 : "";
  const zirohour = hour < 9 ? 0 : "";

  const currentTime = `${zirohour}${hour}:${ziromin}${minute}`;
  return { formattedDate: formattedDate, currentTime: currentTime };
}

export function CashHistoryTable({ cashData }) {
  const revCashData = [...cashData].reverse();
  const dateFrmtCashData = revCashData.map((tran) => {
    const { formattedDate, currentTime } = getCurrentDateAndTime(tran.date);
    return {
      ...tran,
      formattedDate,
      currentTime,
    };
  });

  return (
    <>
      <table className={styles.mainTable}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Total Sum</th>
          </tr>
        </thead>
        <tbody>
          {dateFrmtCashData.map((data) => (
            <tr key={data.id}>
              <td>{data.type}</td>
              <td>{data.employee}</td>
              <td>{data.formattedDate}</td>
              <td>{data.currentTime}</td>
              <td>₪{data.totalSum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
