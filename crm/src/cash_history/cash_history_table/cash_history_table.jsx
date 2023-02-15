/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import styles from "./cash_history_table.module.css";

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

function sortByDate(a, b) {
  const dateA = new Date(`${a.date.split("/").reverse().join("-")}T00:00:00`);
  const dateB = new Date(`${b.date.split("/").reverse().join("-")}T00:00:00`);

  return dateA - dateB;
}

export function CashHistoryTable(props) {
  console.log("CashHistoryTable");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cashData, setCashData] = useState(props.cashData);

  const revCashData = cashData.sort(sortByDate).reverse();

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCashData(
      sortOrder === "asc"
        ? cashData.sort(sortByDate).reverse()
        : cashData.sort(sortByDate)
    );
  };
  var filteredData;
  const filterWeek = () => {
    var today = new Date();
    var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    filteredData = cashData.filter((data) => {
      var dataDate = new Date(data.date);
      return dataDate >= oneWeekAgo && dataDate <= today;
    });
    setCashData(filteredData);
  };

  const filter2Weeks = () => {
    var today = new Date();
    var twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
    filteredData = cashData.filter((data) => {
      var dataDate = new Date(data.date);
      return dataDate >= twoWeeksAgo && dataDate <= today;
    });
    setCashData(filteredData);
  };

  const filterMonth = () => {
    var today = new Date();
    var MonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    filteredData = cashData.filter((data) => {
      var dataDate = new Date(data.date);
      return dataDate >= MonthAgo && dataDate <= today;
    });
    setCashData(filteredData);
  };

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
      {/* <button onClick={toggleSortOrder}>
        Toggle sort order ({sortOrder === "asc" ? "ascending" : "descending"})
      </button>
      <button onClick={filterWeek}>Last Week</button>
      <button onClick={filter2Weeks}>Last 2 Weeks</button>
      <button onClick={filterMonth}>Last Month</button> */}
      <table className={styles.mainTable}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Employee</th>
            <th>Date</th>
            <th>Hour</th>
            <th>Total Sum</th>
            {/* <th>Delta</th> */}
          </tr>
        </thead>
        <tbody>
          {dateFrmtCashData.map((data) => (
            <tr key={data.date + data.hour}>
              <td>{data.type}</td>
              <td>{data.employee}</td>
              <td>{data.formattedDate}</td>
              <td>{data.currentTime}</td>
              <td>₪{data.totalSum}</td>
              {/* <td>Delta</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
