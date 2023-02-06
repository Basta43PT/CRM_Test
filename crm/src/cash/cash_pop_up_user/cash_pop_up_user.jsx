import React, { useState, useEffect } from "react";
import styles from "./cash_pop_up_user.module.css";

export function Cash_Pop_Up_User({ onClose }) {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ background: "white", padding: 20 }}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
