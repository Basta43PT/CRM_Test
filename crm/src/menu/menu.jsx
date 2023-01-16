import styles from "./menu.module.css";
import React, { useState, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";

export function Menu({ label, to, activeOnlyWhenExact }) {
  let match = useMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <div className={styles.top}>
      <div className={styles.topnav}>
        <Link className={styles.active} to={to}>
          {label}
        </Link>
      </div>
    </div>
  );
}
{
  /* className={match ? "active" : ""}>
      {match && "> "} */
}
