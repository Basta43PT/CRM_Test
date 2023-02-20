import React, { useState, useEffect } from "react";
import styles from "./cash_history.module.css";
import { CashHistoryTable } from "../cash_history_table";

export function CashHistory({ cashData }) {
  console.log(cashData, "CaseHistory:cashData");
  return (
    <div className={styles.cash}>
      <h1 className={styles.CashHistoryTitle}>Cash History</h1>
      <div className={styles.cashTable}>
        <CashHistoryTable cashData={cashData} />
      </div>
    </div>
  );
}
