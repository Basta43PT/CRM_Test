import styles from "./menu.module.css";
import React, { useState, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";

export function Menu({ label, to, activeOnlyWhenExact }) {
  let match = useMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <div className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </div>
  );
}
