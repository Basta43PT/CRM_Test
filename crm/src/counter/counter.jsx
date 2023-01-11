import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./counter.module.css";
import { useEffect } from "react";

export function Counter({ add, subFromCart, count }) {
  return (
    <div>
      <button
        className={styles.button}
        onClick={() => {
          add();
        }}
      >
        +
      </button>
      {count}
      <button
        className={styles.button}
        onClick={() => {
          subFromCart();
        }}
      >
        –
      </button>
    </div>
  );
}

// onClick={(event) => {
//   console.log({ event });
//   return props.onClick(event.target.textContent);

// {
//   /* <form>
//         <input></input>
//         <button
//           type="submit"
//           onClick={(e) => {
//             e.preventDefault();
//             console.log("button click");
//           }}
//         >
//           sd
//         </button>
//       </form> */
// }
