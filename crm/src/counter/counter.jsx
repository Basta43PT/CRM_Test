import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./counter.module.css";

export function Counter(props) {
  const [count, setCount] = useState(0);

  const updateAmountAdd = () => {
    setCount(count + 1);
  };

  const updateAmountSub = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <button
        className={styles.button}
        onClick={() => {
          updateAmountAdd();
          props.onClick(props.id, props.name, props.price, "+");
        }}
      >
        +
      </button>
      {count}
      <button
        className={styles.button}
        onClick={() => {
          updateAmountSub();
          props.onClick(props.id, props.name, props.price, "-");
        }}
      >
        -
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
