import React, { useState } from "react";

export function Counter(props) {
  const [count, setCount] = useState(0);

  const updateAmountAdd = () => {
    setCount(count + 1);
    props.amount = count;
  };

  const updateAmountSub = () => {
    if (count > 0) {
      setCount(count - 1);
      props.amount = count;
    }
  };

  return (
    <div>
      <button onClick={() => props.onClick(props.id, "+")}>+</button>
      {props.amount}
      <button onClick={() => props.onClick(props.id, "-")}>-</button>
    </div>
  );
}

// onClick={(event) => {
//   console.log({ event });
//   return props.onClick(event.target.textContent);

{
  /* <form>
        <input></input>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("button click");
          }}
        >
          sd
        </button>
      </form> */
}
