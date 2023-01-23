import React, { useState, useEffect } from "react";
import styles from "./cash.module.css";
import { Cash_Calculate } from "../cash_calculate";

export function Cash({ caseData }) {
  const lastCounted = caseData[caseData.length - 1]
    ? caseData[caseData.length - 1].totalSum
    : 0;

  return (
    <div className={styles.cancelOrder}>
      <h2>Total Case: ₪{lastCounted} </h2>
      <div>
        <Cash_Calculate />
      </div>
    </div>
  );
}
